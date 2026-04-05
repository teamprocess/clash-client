import type { AppChannel } from "@clash/constants";
import { app } from "electron";
import { join } from "node:path";
import { getAppRuntimeProfile } from "@clash/constants";

const channel: AppChannel = process.env["ELECTRON_RENDERER_URL"] ? "dev" : "release";

export const APP_RUNTIME_PROFILE = getAppRuntimeProfile(channel);
export const IS_DEV_CHANNEL = APP_RUNTIME_PROFILE.channel === "dev";

export const configureAppRuntime = () => {
  app.setName(APP_RUNTIME_PROFILE.appName);

  const userDataPath = join(app.getPath("appData"), APP_RUNTIME_PROFILE.userDataDirName);
  app.setPath("userData", userDataPath);
  app.setPath("sessionData", join(userDataPath, "sessionData"));
};
