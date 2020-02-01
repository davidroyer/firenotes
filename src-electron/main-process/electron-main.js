/* eslint-disable no-console */
import { app, nativeTheme } from "electron";
import createAuthWindow from "../../services/auth-process";
import createAppWindow from "../../services/app-process";
import authService from "../../services/auth-service";
// console.log("TCL: createAppWindow -> process.env.APP_URL", process.env.APP_URL);

try {
  if (
    process.platform === "win32" &&
    nativeTheme.shouldUseDarkColors === true
  ) {
    require("fs").unlinkSync(
      require("path").join(app.getPath("userData"), "DevTools Extensions")
    );
  }
} catch (_) {}

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require("path")
    .join(__dirname, "statics")
    .replace(/\\/g, "\\\\");
}

let mainWindow;

async function createWindow() {
  try {
    await authService.refreshTokens();
    mainWindow = createAppWindow();
  } catch (err) {
    createAuthWindow();
  }
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
