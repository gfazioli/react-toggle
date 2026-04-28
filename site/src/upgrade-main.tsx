import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UpgradePage } from "./pages/UpgradePage";
import "./styles/global.css";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <UpgradePage />
  </StrictMode>,
);
