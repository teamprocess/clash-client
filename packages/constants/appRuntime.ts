export type AppChannel = "dev" | "release";

export interface AppRuntimeProfile {
  channel: AppChannel;
  appName: string;
  userDataDirName: string;
  appUserModelId: string;
  protocolScheme: string;
  authRedirectUri: string;
  githubRedirectUri: string;
  clientChannel: AppChannel;
}

const createProfile = (
  channel: AppChannel,
  appName: string,
  userDataDirName: string,
  appUserModelId: string,
  protocolScheme: string
): AppRuntimeProfile => ({
  channel,
  appName,
  userDataDirName,
  appUserModelId,
  protocolScheme,
  authRedirectUri: `${protocolScheme}://auth`,
  githubRedirectUri: `${protocolScheme}://`,
  clientChannel: channel,
});

export const APP_RUNTIME_PROFILES: Record<AppChannel, AppRuntimeProfile> = {
  dev: createProfile("dev", "Clash Dev", "Clash Dev", "com.clash.app.dev", "clashapp-dev"),
  release: createProfile("release", "Clash", "Clash", "com.clash.app", "clashapp"),
};

export const getAppRuntimeProfile = (channel: AppChannel): AppRuntimeProfile => ({
  ...APP_RUNTIME_PROFILES[channel],
});
