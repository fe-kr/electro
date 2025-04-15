import { useState } from "react";
import { Theme } from "../config/theme";

export const useThemeState = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT!);

  return [theme, setTheme] as const;
};
