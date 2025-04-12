import { app, BrowserWindow } from "electron";
import { Path } from "src/shared/config/path";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: Path.preload,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile("dist/index.html");
  }
});
