import { SettingsContext } from "./settings-context";
import { useReducedState } from "@/shared/lib/react";

const initialState = {
  ram: true,
  cpu: true,
  storage: true,
  theme: "dark",
};

export const SettingsProvider = ({ children }: React.PropsWithChildren) => {
  const [settings, setSettings] = useReducedState(initialState);

  return (
    <SettingsContext value={{ settings, setSettings }}>
      {children}
    </SettingsContext>
  );
};
