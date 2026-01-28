// dist/preload.js
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  openNewPage: (filename: any) => ipcRenderer.send('open-new-page', filename)
});

contextBridge.exposeInMainWorld('api2', {
  close: () => ipcRenderer.send('close-window')
});



