import { createRoot } from "react-dom/client";
import App from "./app/App";
import { registerSessionResetHandlers } from "@/app/session/registerSessionResetHandlers";

registerSessionResetHandlers();

createRoot(document.getElementById("root")!).render(<App />);
