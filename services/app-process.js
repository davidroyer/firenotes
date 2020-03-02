/* eslint-disable no-console */
import { BrowserWindow } from "electron";
let mainWindow;

function createAppWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
      // webSecurity: false

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  });

  console.log(
    "app.process: createAppWindow -> process.env.APP_URL",
    process.env.APP_URL
  );
  mainWindow.loadURL(process.env.APP_URL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

export default createAppWindow;
