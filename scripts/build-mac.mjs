#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const envFilePath = path.join(rootDir, ".env");
const shouldPublishS3 = process.argv.includes("--publish-s3");
const shouldBumpVersion = process.argv.includes("--bump-version");
const isTestBuild = process.argv.includes("--test-build");
const distDir = path.join(rootDir, "dist");

process.chdir(rootDir);

if (existsSync(envFilePath)) {
  process.loadEnvFile(envFilePath);
}

if (!isTestBuild) {
  validateNotarizationEnv();
}
if (shouldBumpVersion) {
  run("npm", ["version", "patch", "--no-git-tag-version"]);
}
detachMountedClashVolumes();
run("electron-vite", ["build"]);
if (isTestBuild) {
  process.env.CSC_IDENTITY_AUTO_DISCOVERY = "false";
  run("electron-builder", ["--mac", "--dir", "--publish", "never", "--config.mac.notarize=false"]);
} else {
  run("electron-builder", ["--mac"]);
}
if (shouldPublishS3) {
  uploadMacUpdateToS3();
}

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    env: process.env,
    stdio: "inherit"
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function validateNotarizationEnv() {
  const hasAppleIdAuth =
    Boolean(process.env.APPLE_ID) &&
    Boolean(process.env.APPLE_APP_SPECIFIC_PASSWORD) &&
    Boolean(process.env.APPLE_TEAM_ID);

  const hasApiKeyAuth =
    Boolean(process.env.APPLE_API_KEY) &&
    Boolean(process.env.APPLE_API_KEY_ID) &&
    Boolean(process.env.APPLE_API_ISSUER);

  if (!hasAppleIdAuth && !hasApiKeyAuth) {
    console.error("Notarization credentials are missing.");
    console.error("Set APPLE_ID + APPLE_APP_SPECIFIC_PASSWORD + APPLE_TEAM_ID");
    console.error("or APPLE_API_KEY + APPLE_API_KEY_ID + APPLE_API_ISSUER in .env.");
    process.exit(1);
  }
}

function detachMountedClashVolumes() {
  const volumesPath = "/Volumes";
  if (!existsSync(volumesPath)) {
    return;
  }

  const clashVolumes = readdirSync(volumesPath).filter((name) => name.startsWith("Clash"));
  for (const volumeName of clashVolumes) {
    const mountPoint = path.join(volumesPath, volumeName);
    const detached = spawnSync("hdiutil", ["detach", mountPoint], { stdio: "ignore" });
    if (detached.status !== 0) {
      spawnSync("hdiutil", ["detach", "-force", mountPoint], { stdio: "ignore" });
    }
  }
}

function uploadMacUpdateToS3() {
  const bucket = process.env.S3_BUCKET;
  const updatesPrefix = normalizePrefix(process.env.S3_UPDATES_PREFIX ?? "updates/mac");
  const downloadsPrefix = normalizePrefix(process.env.S3_DOWNLOADS_PREFIX ?? "downloads/mac");
  const distributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID;

  if (!bucket) {
    console.error("S3_BUCKET is required when using --publish-s3.");
    process.exit(1);
  }

  const version = readVersion();
  const updateFiles = resolveUpdateArtifacts(version);
  const dmgFile = resolveDmgArtifact(version);
  const updatesBase = `s3://${bucket}/${updatesPrefix}`;
  const downloadsBase = `s3://${bucket}/${downloadsPrefix}`;

  run("aws", [
    "s3",
    "cp",
    path.join(distDir, "latest-mac.yml"),
    `${updatesBase}/latest-mac.yml`,
    "--cache-control",
    "public,max-age=60,must-revalidate"
  ]);

  for (const file of updateFiles) {
    run("aws", [
      "s3",
      "cp",
      path.join(distDir, file),
      `${updatesBase}/${file}`,
      "--cache-control",
      "public,max-age=31536000,immutable"
    ]);
  }

  run("aws", [
    "s3",
    "cp",
    path.join(distDir, dmgFile),
    `${downloadsBase}/latest`,
    "--content-type",
    "application/x-apple-diskimage",
    "--content-disposition",
    "attachment; filename=Clash.dmg",
    "--cache-control",
    "public,max-age=60,must-revalidate"
  ]);

  if (distributionId) {
    run("aws", [
      "cloudfront",
      "create-invalidation",
      "--distribution-id",
      distributionId,
      "--paths",
      `/${updatesPrefix}/latest-mac.yml`,
      `/${downloadsPrefix}/latest`
    ]);
  }

  console.log(`Uploaded updates to ${updatesBase}`);
  console.log(`Uploaded installer to ${downloadsBase}/latest`);
}

function readVersion() {
  const packageJsonPath = path.join(rootDir, "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  return packageJson.version;
}

function resolveUpdateArtifacts(version) {
  if (!existsSync(path.join(distDir, "latest-mac.yml"))) {
    console.error("dist/latest-mac.yml not found.");
    process.exit(1);
  }

  const files = readdirSync(distDir).filter(
    (file) =>
      file.includes(`-${version}-`) && (file.endsWith("-mac.zip") || file.endsWith("-mac.zip.blockmap"))
  );

  if (files.length < 2) {
    console.error(`Could not find mac zip/blockmap for version ${version} in dist/.`);
    process.exit(1);
  }

  return files.sort();
}

function resolveDmgArtifact(version) {
  const files = readdirSync(distDir).filter((file) => file.includes(`-${version}`) && file.endsWith(".dmg"));
  if (files.length === 0) {
    console.error(`Could not find dmg for version ${version} in dist/.`);
    process.exit(1);
  }

  return files.sort()[0];
}

function normalizePrefix(prefix) {
  return prefix.replace(/^\/+|\/+$/g, "");
}
