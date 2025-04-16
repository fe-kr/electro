import { ResourcesProvider } from "@/features/resources";
import { SettingsProvider } from "@/features/settings";
import { AppFooter } from "@/widgets/app-footer";
import { AppHeader } from "@/widgets/app-header";
import { AppMain } from "@/widgets/app-main";

export const MainPage = () => {
  return (
    <SettingsProvider>
      <AppHeader />

      <ResourcesProvider>
        <AppMain />

        <AppFooter />
      </ResourcesProvider>
    </SettingsProvider>
  );
};
