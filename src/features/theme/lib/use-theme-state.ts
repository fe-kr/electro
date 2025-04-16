import { usePersistData, usePersistedData } from "@/shared/lib/persist";
import { Theme } from "../config/theme";
import { useCallback, useEffect, useState } from "react";

const initialState = Theme.LIGHT;

const PERSIST_KEY = "theme";

export const useThemeState = () => {
  const initialData = usePersistedData(PERSIST_KEY, initialState);

  const [theme, setTheme] = useState(initialData);

  const onChangeTheme = useCallback((theme: Theme) => {
    setTheme(theme);

    document.documentElement.className = "";
    document.documentElement.classList.add(theme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add(initialData);
  }, [initialData]);

  usePersistData(PERSIST_KEY, theme);

  return [theme, onChangeTheme] as const;
};
