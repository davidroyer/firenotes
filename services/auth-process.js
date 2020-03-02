/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import { BrowserWindow, protocol } from "electron";
import authService from "./auth-service";
import createAppWindow from "./app-process";

let win = null;

function createAuthWindow() {
  destroyAuthWin();

  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(authService.getAuthenticationURL(), {
    userAgent: "Chrome"
  });

  const {
    // eslint-disable-next-line no-unused-vars
    session: { webRequest }
  } = win.webContents;

  protocol.interceptBufferProtocol("file", async ({ url }) => {
    console.log("interceptBufferProtocol -> url", url);

    if (url.includes("file:///callback?code")) {
      console.log("INSIDE CALLBACK CHECK");

      await authService.loadTokens(url);
      createAppWindow();
      return destroyAuthWin();
    }
  });
  // const filter = {
  //   urls: ["file:///callback*"]
  // };

  // webRequest.onBeforeRequest(filter, async ({ url }) => {
  //   await authService.loadTokens(url);
  //   createAppWindow();
  //   return destroyAuthWin();
  // });

  win.on("authenticated", () => {
    destroyAuthWin();
  });

  win.on("closed", () => {
    win = null;
  });
}

function destroyAuthWin() {
  if (!win) return;
  win.close();
  win = null;
}

export default createAuthWindow;
