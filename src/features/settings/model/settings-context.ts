import { createStrictContext, useStrictContext } from "@/shared/lib/react";

type Settings = {
  isRamShown: boolean;
  isCpuShown: boolean;
  isStorageShown: boolean;
  isDarkThemeEnabled: boolean;
};

interface SettingsContext {
  settings: Settings;
  setSettings: React.ActionDispatch<[Partial<Settings>]>;
}

export const SettingsContext = createStrictContext<SettingsContext>();

export const useSettingsContext = () => useStrictContext(SettingsContext);
