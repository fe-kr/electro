import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppMain } from "src/widgets/app-main";
import { AppHeader } from "src/widgets/app-header";

import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppHeader />
    <AppMain />
  </StrictMode>,
);
