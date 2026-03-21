const FALLBACK_SOCKET_ENDPOINT = "wss://api.clash.kr/socket.io";
const LOCAL_SOCKET_PORT = "9092";
const LOCAL_SOCKET_HOSTS = new Set(["localhost", "local.clash.kr"]);

type SocketConfig = {
  endpoint: string;
  origin: string;
  path: string;
};

const resolveSocketEndpoint = () => {
  const configuredEndpoint = import.meta.env.VITE_SOCKET_IO_URL?.trim();
  if (configuredEndpoint) {
    return configuredEndpoint;
  }

  const apiUrl = import.meta.env.VITE_API_URL?.trim();
  if (!apiUrl) {
    return FALLBACK_SOCKET_ENDPOINT;
  }

  try {
    const url = new URL(apiUrl);
    const protocol = url.protocol === "https:" ? "wss:" : "ws:";
    const port = LOCAL_SOCKET_HOSTS.has(url.hostname)
      ? `:${LOCAL_SOCKET_PORT}`
      : url.port
        ? `:${url.port}`
        : "";
    return `${protocol}//${url.hostname}${port}/socket.io`;
  } catch {
    return FALLBACK_SOCKET_ENDPOINT;
  }
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

export const socketConfig = parseSocketConfig(resolveSocketEndpoint());
