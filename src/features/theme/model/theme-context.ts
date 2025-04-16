import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { Theme } from "../config/theme";

type ThemeContext = [Theme, (theme: Theme) => void];

export const ThemeContext = createStrictContext<ThemeContext>();

export const useTheme = () => useStrictContext(ThemeContext)[0];

export const useSetTheme = () => useStrictContext(ThemeContext)[1];
