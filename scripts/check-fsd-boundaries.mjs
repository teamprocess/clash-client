import { existsSync, readdirSync, statSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const REPOSITORY_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requireFromMac = createRequire(path.join(REPOSITORY_ROOT, "apps/mac/package.json"));
const ts = requireFromMac("typescript");
const REPORT_ONLY = process.argv.includes("--report");

const PROJECTS = [
  {
    name: "mac",
    sourceRoot: path.join(REPOSITORY_ROOT, "apps/mac/src/renderer/src"),
  },
  {
    name: "web",
    sourceRoot: path.join(REPOSITORY_ROOT, "apps/web/src"),
  },
];

const LAYER_RANK = new Map([
  ["app", 0],
  ["pages", 1],
  ["widgets", 2],
  ["features", 3],
  ["entities", 4],
  ["shared", 5],
]);
const SLICED_LAYERS = new Set(["pages", "widgets", "features", "entities"]);
const CODE_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".mts", ".cts"];
const IGNORED_DIRECTORIES = new Set(["node_modules", "out", "dist", ".turbo"]);

// Exceptions must be exact and short-lived. The checker fails when an entry
// becomes stale, and circular dependencies can never be excepted.
const TEMPORARY_EXCEPTIONS = new Map([
  // ["mac|layer-direction|shared/lib/example.ts|@/entities/example", "#000"],
]);

const diagnostics = [];
const usedExceptions = new Set();
const projectStats = new Map();

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function isCodeFile(filePath) {
  if (/\.d\.(?:ts|mts|cts)$/.test(filePath)) {
    return false;
  }

  return CODE_EXTENSIONS.includes(path.extname(filePath));
}

function collectCodeFiles(root) {
  const files = [];

  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory() && IGNORED_DIRECTORIES.has(entry.name)) {
        continue;
      }

      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        visit(absolutePath);
      } else if (entry.isFile() && isCodeFile(absolutePath)) {
        files.push(absolutePath);
      }
    }
  }

  visit(root);
  return files.sort();
}

function getScriptKind(filePath) {
  switch (path.extname(filePath)) {
    case ".js":
    case ".mjs":
    case ".cjs":
      return ts.ScriptKind.JS;
    case ".jsx":
      return ts.ScriptKind.JSX;
    case ".tsx":
      return ts.ScriptKind.TSX;
    default:
      return ts.ScriptKind.TS;
  }
}

function readStaticSpecifier(node) {
  if (ts.isStringLiteral(node) || node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral) {
    return node.text;
  }

  return null;
}

function extractImports(filePath, source) {
  const imports = [];
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    getScriptKind(filePath)
  );

  function addImport(node, specifierNode) {
    const specifier = readStaticSpecifier(specifierNode);
    if (specifier === null) {
      return;
    }

    imports.push({
      specifier,
      line: sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1,
      index: node.getStart(sourceFile),
    });
  }

  function visit(node) {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      if (node.moduleSpecifier) {
        addImport(node, node.moduleSpecifier);
      }
    } else if (
      ts.isImportEqualsDeclaration(node) &&
      ts.isExternalModuleReference(node.moduleReference) &&
      node.moduleReference.expression
    ) {
      addImport(node, node.moduleReference.expression);
    } else if (ts.isCallExpression(node)) {
      const isDynamicImport = node.expression.kind === ts.SyntaxKind.ImportKeyword;
      const isRequireCall = ts.isIdentifier(node.expression) && node.expression.text === "require";

      if ((isDynamicImport || isRequireCall) && node.arguments[0]) {
        addImport(node, node.arguments[0]);
      }
    } else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
      addImport(node, node.argument.literal);
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return imports;
}

function resolveExistingPath(basePath) {
  const candidates = [basePath];

  for (const extension of CODE_EXTENSIONS) {
    candidates.push(`${basePath}${extension}`);
  }

  for (const extension of CODE_EXTENSIONS) {
    candidates.push(path.join(basePath, `index${extension}`));
  }

  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) {
      return path.resolve(candidate);
    }
  }

  return null;
}

function resolveImport(specifier, sourceFile, sourceRoot) {
  const cleanSpecifier = specifier.split(/[?#]/, 1)[0];
  let unresolvedPath;

  if (cleanSpecifier.startsWith("@/")) {
    unresolvedPath = path.join(sourceRoot, cleanSpecifier.slice(2));
  } else if (
    cleanSpecifier === "." ||
    cleanSpecifier === ".." ||
    cleanSpecifier.startsWith("./") ||
    cleanSpecifier.startsWith("../")
  ) {
    unresolvedPath = path.resolve(path.dirname(sourceFile), cleanSpecifier);
  } else {
    return { kind: "external" };
  }

  const relativeAttempt = path.relative(sourceRoot, unresolvedPath);
  if (relativeAttempt.startsWith("..") || path.isAbsolute(relativeAttempt)) {
    return { kind: "escaped" };
  }

  const resolvedPath = resolveExistingPath(unresolvedPath);
  if (!resolvedPath) {
    return { kind: "unresolved" };
  }

  return { kind: "local", path: resolvedPath };
}

function moduleMetadata(filePath, sourceRoot) {
  const relativePath = toPosix(path.relative(sourceRoot, filePath));
  const segments = relativePath.split("/");
  const declaredLayer = LAYER_RANK.has(segments[0]) ? segments[0] : null;
  const layer = declaredLayer ?? (segments.length === 1 ? "app" : null);
  const slice = layer && SLICED_LAYERS.has(layer) ? segments[1] : null;

  return { relativePath, layer, slice };
}

function exceptionKey(diagnostic) {
  return [diagnostic.project, diagnostic.rule, diagnostic.source, diagnostic.specifier].join("|");
}

function addDiagnostic(diagnostic) {
  const key = exceptionKey(diagnostic);

  if (diagnostic.rule !== "circular-dependency" && TEMPORARY_EXCEPTIONS.has(key)) {
    usedExceptions.add(key);
    return;
  }

  diagnostics.push(diagnostic);
}

function isIndexFile(filePath) {
  return /^index\.(?:ts|tsx|js|jsx|mjs|cjs|mts|cts)$/.test(path.basename(filePath));
}

function hasSameSlice(source, target) {
  return source.layer === target.layer && source.slice && source.slice === target.slice;
}

function checkBoundary({ project, sourceFile, source, imported, targetFile, target }) {
  if (
    sourceFile !== targetFile &&
    isIndexFile(targetFile) &&
    sourceFile.startsWith(`${path.dirname(targetFile)}${path.sep}`)
  ) {
    addDiagnostic({
      project: project.name,
      rule: "self-barrel-import",
      source: source.relativePath,
      line: imported.line,
      specifier: imported.specifier,
      message: "A module inside a directory cannot import that directory's index file.",
    });
    return;
  }

  if (source.layer && target.layer) {
    const sourceRank = LAYER_RANK.get(source.layer);
    const targetRank = LAYER_RANK.get(target.layer);

    if (targetRank < sourceRank) {
      addDiagnostic({
        project: project.name,
        rule: "layer-direction",
        source: source.relativePath,
        line: imported.line,
        specifier: imported.specifier,
        message: `${source.layer} cannot import the higher ${target.layer} layer.`,
      });
      return;
    }

    if (
      source.layer === target.layer &&
      SLICED_LAYERS.has(source.layer) &&
      source.slice &&
      target.slice &&
      source.slice !== target.slice
    ) {
      addDiagnostic({
        project: project.name,
        rule: "cross-slice-import",
        source: source.relativePath,
        line: imported.line,
        specifier: imported.specifier,
        message: `${source.layer}/${source.slice} cannot import the sibling ${target.layer}/${target.slice} slice.`,
      });
      return;
    }
  }

  if (
    target.layer &&
    target.slice &&
    SLICED_LAYERS.has(target.layer) &&
    !hasSameSlice(source, target)
  ) {
    const canonicalSpecifier = `@/${target.layer}/${target.slice}`;
    const publicIndex = resolveExistingPath(
      path.join(project.sourceRoot, target.layer, target.slice, "index")
    );

    if (imported.specifier !== canonicalSpecifier || !publicIndex || targetFile !== publicIndex) {
      addDiagnostic({
        project: project.name,
        rule: "public-api-import",
        source: source.relativePath,
        line: imported.line,
        specifier: imported.specifier,
        message: `Import ${target.layer}/${target.slice} through its public API: "${canonicalSpecifier}".`,
      });
    }
  }
}

function stronglyConnectedComponents(nodes, adjacency) {
  const components = [];
  const indexByNode = new Map();
  const lowLinkByNode = new Map();
  const stack = [];
  const onStack = new Set();
  let nextIndex = 0;

  function visit(node) {
    indexByNode.set(node, nextIndex);
    lowLinkByNode.set(node, nextIndex);
    nextIndex += 1;
    stack.push(node);
    onStack.add(node);

    for (const target of [...(adjacency.get(node) ?? [])].sort()) {
      if (!indexByNode.has(target)) {
        visit(target);
        lowLinkByNode.set(node, Math.min(lowLinkByNode.get(node), lowLinkByNode.get(target)));
      } else if (onStack.has(target)) {
        lowLinkByNode.set(node, Math.min(lowLinkByNode.get(node), indexByNode.get(target)));
      }
    }

    if (lowLinkByNode.get(node) !== indexByNode.get(node)) {
      return;
    }

    const component = [];
    let member;
    do {
      member = stack.pop();
      onStack.delete(member);
      component.push(member);
    } while (member !== node);

    components.push(component.sort());
  }

  for (const node of nodes) {
    if (!indexByNode.has(node)) {
      visit(node);
    }
  }

  return components;
}

function findCyclePath(component, adjacency) {
  const allowed = new Set(component);
  const visited = new Set();
  const positions = new Map();
  const pathStack = [];

  function visit(node) {
    positions.set(node, pathStack.length);
    pathStack.push(node);

    for (const target of [...(adjacency.get(node) ?? [])].sort()) {
      if (!allowed.has(target)) {
        continue;
      }

      if (positions.has(target)) {
        return pathStack.slice(positions.get(target)).concat(target);
      }

      if (!visited.has(target)) {
        const cycle = visit(target);
        if (cycle) {
          return cycle;
        }
      }
    }

    pathStack.pop();
    positions.delete(node);
    visited.add(node);
    return null;
  }

  for (const node of component) {
    if (!visited.has(node)) {
      const cycle = visit(node);
      if (cycle) {
        return cycle;
      }
    }
  }

  return null;
}

function inspectProject(project) {
  if (!existsSync(project.sourceRoot)) {
    throw new Error(`Missing project source root: ${project.sourceRoot}`);
  }

  const files = collectCodeFiles(project.sourceRoot);
  const fileSet = new Set(files);
  const adjacency = new Map(files.map(file => [file, new Set()]));
  const edgeMetadata = new Map();
  projectStats.set(project.name, { files: files.length });

  for (const sourceFile of files) {
    const source = moduleMetadata(sourceFile, project.sourceRoot);
    const imports = extractImports(sourceFile, readFileSync(sourceFile, "utf8"));

    for (const imported of imports) {
      const resolution = resolveImport(imported.specifier, sourceFile, project.sourceRoot);

      if (resolution.kind === "external") {
        continue;
      }

      if (resolution.kind !== "local") {
        addDiagnostic({
          project: project.name,
          rule: resolution.kind === "escaped" ? "source-root-escape" : "unresolved-local-import",
          source: source.relativePath,
          line: imported.line,
          specifier: imported.specifier,
          message:
            resolution.kind === "escaped"
              ? "A local import cannot escape the project's source root."
              : "The local import could not be resolved.",
        });
        continue;
      }

      const targetFile = resolution.path;
      const target = moduleMetadata(targetFile, project.sourceRoot);
      checkBoundary({
        project,
        sourceFile,
        source,
        imported,
        targetFile,
        target,
      });

      if (fileSet.has(targetFile)) {
        adjacency.get(sourceFile).add(targetFile);
        const edgeKey = `${sourceFile}\0${targetFile}`;
        if (!edgeMetadata.has(edgeKey)) {
          edgeMetadata.set(edgeKey, imported);
        }
      }
    }
  }

  const components = stronglyConnectedComponents(files, adjacency);
  for (const component of components) {
    const isSelfCycle = component.length === 1 && adjacency.get(component[0]).has(component[0]);
    if (component.length === 1 && !isSelfCycle) {
      continue;
    }

    const cycle = findCyclePath(component, adjacency);
    if (!cycle) {
      continue;
    }

    const sourceFile = cycle[0];
    const targetFile = cycle[1];
    const imported = edgeMetadata.get(`${sourceFile}\0${targetFile}`);
    const cycleDescription = cycle
      .map(file => moduleMetadata(file, project.sourceRoot).relativePath)
      .join(" -> ");

    addDiagnostic({
      project: project.name,
      rule: "circular-dependency",
      source: moduleMetadata(sourceFile, project.sourceRoot).relativePath,
      line: imported?.line ?? 1,
      specifier: imported?.specifier ?? cycleDescription,
      message: `Circular dependency: ${cycleDescription}`,
    });
  }
}

for (const project of PROJECTS) {
  inspectProject(project);
}

for (const [key, issue] of TEMPORARY_EXCEPTIONS) {
  if (usedExceptions.has(key)) {
    continue;
  }

  const [project, , source, specifier] = key.split("|");
  diagnostics.push({
    project,
    rule: "stale-exception",
    source,
    line: 1,
    specifier,
    message: `Remove the unused temporary exception (${issue}).`,
  });
}

diagnostics.sort((left, right) => {
  const textComparison = [left.project, left.rule, left.source]
    .join("|")
    .localeCompare([right.project, right.rule, right.source].join("|"));

  if (textComparison !== 0) {
    return textComparison;
  }

  return left.line - right.line || left.specifier.localeCompare(right.specifier);
});

for (const project of PROJECTS) {
  const projectDiagnostics = diagnostics.filter(diagnostic => diagnostic.project === project.name);
  const fileCount = projectStats.get(project.name)?.files ?? 0;

  if (projectDiagnostics.length === 0) {
    console.log(`[FSD] ${project.name}: OK (${fileCount} modules)`);
    continue;
  }

  console.log(
    `[FSD] ${project.name}: ${projectDiagnostics.length} violation(s) across ${fileCount} modules`
  );

  const ruleCounts = new Map();
  for (const diagnostic of projectDiagnostics) {
    ruleCounts.set(diagnostic.rule, (ruleCounts.get(diagnostic.rule) ?? 0) + 1);
  }
  for (const [rule, count] of [...ruleCounts].sort()) {
    console.log(`  ${rule}: ${count}`);
  }

  for (const diagnostic of projectDiagnostics) {
    console.log(
      `\n[${diagnostic.project}][${diagnostic.rule}] ${diagnostic.source}:${diagnostic.line}`
    );
    console.log(`  ${diagnostic.message}`);
    console.log(`  import: "${diagnostic.specifier}"`);
  }
}

console.log(`\n[FSD] total: ${diagnostics.length} violation(s)`);

if (diagnostics.length > 0 && REPORT_ONLY) {
  console.log("[FSD] report mode: violations do not fail the command.");
} else if (diagnostics.length > 0) {
  process.exitCode = 1;
}
