import { SettingsContext } from "./settings-context";
import { useReducedState } from "@/shared/lib/react";

const initialState = {
  isRamShown: true,
  isCpuShown: true,
  isStorageShown: true,
  isDarkThemeEnabled: true,
};

export const SettingsProvider = ({ children }: React.PropsWithChildren) => {
  const [settings, setSettings] = useReducedState(initialState);

  return (
    <SettingsContext value={{ settings, setSettings }}>
      {children}
    </SettingsContext>
  );
};
