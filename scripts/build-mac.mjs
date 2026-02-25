#!/usr/bin/env node
import { existsSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const envFilePath = path.join(rootDir, ".env");

process.chdir(rootDir);

if (existsSync(envFilePath)) {
  process.loadEnvFile(envFilePath);
}

validateNotarizationEnv();
run("npm", ["version", "patch", "--no-git-tag-version"]);
detachMountedClashVolumes();
run("electron-vite", ["build"]);
run("electron-builder", ["--mac"]);

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
