import {
  createStrictContext,
  ReturnUseState,
  useStrictContext,
} from "@/shared/lib/react";
import { Theme } from "../config/theme";

type ThemeContext = ReturnUseState<Theme>;

export const ThemeContext = createStrictContext<ThemeContext>();

export const useTheme = () => useStrictContext(ThemeContext)[0];

export const useSetTheme = () => useStrictContext(ThemeContext)[1];
