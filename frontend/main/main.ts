import path from "path";
import url from "url";
import { app, BrowserWindow, ipcMain, Menu } from "electron";
import { dirname } from "path";
import { fileURLToPath } from "url";

let win;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const preloadPath = "C:/Users/Admine/Desktop/discord/frontend/dist/main/preload.js";

const iconPath = "C:/Users/Admine/Desktop/discord/assets/default-pfp-for-discord-txq6kevqhvi68op512.png"

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: iconPath,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  win.maximize();

  win.loadURL(
    url.format({
      pathname: path.join(
        __dirname,
        "../../main/src/authentication/registration/registration.html"
      ),
      protocol: "file:",
      slashes: true,
    })
  );

  win.on("closed", () => {
    win = null;
  });
}


ipcMain.on("open-new-page", (event, filename) => {
  if (!filename) {
    console.log("Cannot find file.");
    return;
  }


  let newPage = new BrowserWindow({
    width: 800,
    height: 600,
    icon: iconPath,
    webPreferences: {
      preload: preloadPath, 
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  newPage.maximize();
  newPage.loadFile(filename);

});


ipcMain.on("close-window", (event) => {
  const windowToClose = BrowserWindow.fromWebContents(event.sender);
  if (windowToClose) windowToClose.close();
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  app.quit();
});