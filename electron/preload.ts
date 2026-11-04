import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('api', {
  getUpdatedValues: (): Promise<Record<string, number>> => 
    ipcRenderer.invoke('telemetry:get')
})
