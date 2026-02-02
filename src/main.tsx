import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./app/providers/ThemeProvider.tsx";
import { GlobalStyle } from "./app/styles/GlobalStyle.ts";
import App from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <GlobalStyle />
    <App />
  </ThemeProvider>
);
