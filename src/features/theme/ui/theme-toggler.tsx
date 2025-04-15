import { Label } from "@/shared/ui/label";
import { useSetTheme, useTheme } from "../model/theme-context";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { Sun, Moon } from "lucide-react";
import { Theme } from "../config/theme";

interface ThemeTogglerProps {
  label?: string;
  className?: string;
}

export const ThemeToggler = ({ label, className }: ThemeTogglerProps) => {
  const theme = useTheme();
  const setTheme = useSetTheme();

  const onValueChange = (value: Theme) => setTheme(value);

  return (
    <div className={className}>
      <Label>{label}</Label>

      <ToggleGroup
        type="single"
        className="gap-1"
        onValueChange={onValueChange}
        value={theme}
      >
        <ToggleGroupItem value="light" title="Light">
          <Sun />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" title="Dark">
          <Moon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
