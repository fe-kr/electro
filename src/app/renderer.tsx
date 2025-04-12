import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppMain } from "@/widgets/app-main";
import { AppHeader } from "@/widgets/app-header";

import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppHeader />
    <AppMain />
  </StrictMode>,
);
