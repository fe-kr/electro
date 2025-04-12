import { app, BrowserWindow } from "electron";

app.on("ready", () => {
  const mainWindow = new BrowserWindow();

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile("dist/index.html");
  }
});
