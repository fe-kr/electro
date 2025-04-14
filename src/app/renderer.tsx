import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppMain } from "@/widgets/app-main";
import { AppHeader } from "@/widgets/app-header";
import { ResourcesProvider } from "@/entities/resources";
import { SettingsProvider } from "@/features/settings";

import "./styles/main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SettingsProvider>
      <AppHeader />
      <ResourcesProvider>
        <AppMain />
      </ResourcesProvider>
    </SettingsProvider>
  </StrictMode>,
);
