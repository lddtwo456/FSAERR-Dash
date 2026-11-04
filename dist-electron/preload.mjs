"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  getUpdatedValues: () => electron.ipcRenderer.invoke("telemetry:get")
});
