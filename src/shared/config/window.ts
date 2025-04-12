import { BrowserWindowConstructorOptions } from "electron";
import { Path } from "./path";

export const windowConfig = {
  webPreferences: {
    preload: Path.preload,
  },
  frame: false,
} satisfies BrowserWindowConstructorOptions;
