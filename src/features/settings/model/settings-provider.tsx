import { ResourcesVisibilityProvider } from "@/features/resources/@x/settings";
import { ThemeProvider } from "@/features/theme/@x/settings";

export const SettingsProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider>
      <ResourcesVisibilityProvider>{children}</ResourcesVisibilityProvider>
    </ThemeProvider>
  );
};
