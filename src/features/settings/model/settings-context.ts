import { createContext } from "react";

type Settings = Record<Resources.Variant, boolean>;

interface SettingsContext {
  settings: Settings;
  setSettings: React.ActionDispatch<[Partial<Settings>]>;
}

export const SettingsContext = createContext<SettingsContext>(null!);
