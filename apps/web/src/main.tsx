import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { GlobalStyle } from "./app/styles/GlobalStyle";
import App from "./app/App";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <GlobalStyle />
    <App />
  </ThemeProvider>
);
