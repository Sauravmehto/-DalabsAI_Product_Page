import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { captureCampaignParams, track } from "./lib/analytics";
import { ThemeProvider } from "./hooks/useTheme";

captureCampaignParams();
track("page_view");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
