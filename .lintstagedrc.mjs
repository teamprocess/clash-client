const quote = value => JSON.stringify(value);

const toAppRelative = (files, appDir) =>
  files
    .filter(file => file.startsWith(`${appDir}/`))
    .map(file => file.slice(appDir.length + 1));

export default {
  "*.{js,jsx,ts,tsx}": files => {
    const macFiles = toAppRelative(files, "apps/mac");
    const webFiles = toAppRelative(files, "apps/web");
    const otherFiles = files.filter(
      file => !file.startsWith("apps/mac/") && !file.startsWith("apps/web/")
    );

    const commands = [];

    if (macFiles.length > 0) {
      commands.push(
        `pnpm --dir apps/mac exec eslint --fix --cache ${macFiles.map(quote).join(" ")}`
      );
    }

    if (webFiles.length > 0) {
      commands.push(
        `pnpm --dir apps/web exec eslint --fix --cache ${webFiles.map(quote).join(" ")}`
      );
    }

    if (otherFiles.length > 0) {
      commands.push(`pnpm exec prettier --write ${otherFiles.map(quote).join(" ")}`);
    }

    commands.push(`pnpm exec prettier --write ${files.map(quote).join(" ")}`);

    return commands;
  },
  "*.{json,md,yml,yaml}": files => `pnpm exec prettier --write ${files.map(quote).join(" ")}`,
};
