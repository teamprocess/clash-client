const FALLBACK_SOCKET_ENDPOINT = "wss://api.clash.kr/socket.io";

type SocketConfig = {
  endpoint: string;
  origin: string;
  path: string;
};

const parseSocketConfig = (endpoint: string): SocketConfig => {
  const url = new URL(endpoint);
  const path = url.pathname.replace(/\/+$/, "") || "/socket.io";

  return {
    endpoint,
    origin: url.origin,
    path: path.startsWith("/") ? path : `/${path}`,
  };
};

export const socketConfig = parseSocketConfig(
  import.meta.env.VITE_SOCKET_IO_URL || FALLBACK_SOCKET_ENDPOINT
);
