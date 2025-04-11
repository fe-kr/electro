import { app, BrowserWindow } from "electron";
import path from "node:path";

app.on("ready", () => {
  const mainWindow = new BrowserWindow();
  mainWindow.loadFile(path.join(app.getAppPath(), "/dist/index.html"));
});
