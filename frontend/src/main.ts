import path from "path";
import url from "url";
import {app, BrowserWindow } from "electron";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

let win;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


function createWindow(){
    win = new BrowserWindow({
        width:500,
        height:700
    });
    win.loadURL(url.format({
        pathname:path.join(__dirname,"main.html"),
        protocol:"file:",
        slashes:true
    }));
    win.webContents.openDevTools();

    win.on("closed",()=>{
        win = null;
    });
};



app.on("ready",createWindow);

app.on("window-all-closed",()=>{
  app.quit();
});