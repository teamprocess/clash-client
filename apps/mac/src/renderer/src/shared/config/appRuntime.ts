import type { AppChannel } from "@clash/constants";
import { getAppRuntimeProfile } from "@clash/constants";

const channel: AppChannel = import.meta.env.DEV ? "dev" : "release";

export const appRuntimeProfile = getAppRuntimeProfile(channel);
