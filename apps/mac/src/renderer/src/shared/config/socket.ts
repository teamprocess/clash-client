import { appRuntimeProfile } from "@/shared/config/appRuntime";

type SocketConfig = {
  origin: string;
  path: string;
  clientChannel: string;
};

const socketUrl = new URL(import.meta.env.VITE_SOCKET_IO_URL);

export const socketConfig: SocketConfig = {
  origin: socketUrl.origin,
  path: socketUrl.pathname,
  clientChannel: appRuntimeProfile.clientChannel,
};
