import { ThemeContext } from "@/features/theme/model/theme-context";
import { useThemeState } from "../lib/use-theme-state";

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = useThemeState();

  return <ThemeContext value={[theme, setTheme]}>{children}</ThemeContext>;
};
