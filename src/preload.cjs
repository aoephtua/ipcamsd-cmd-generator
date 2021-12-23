/*
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
*/

const { contextBridge, ipcRenderer } = require('electron');

const getApi = () => {
    const api = {
        minimize: () => ipcRenderer.send('minimize'),
        maximize: () => ipcRenderer.send('maximize'),
        unmaximize: () => ipcRenderer.send('unmaximize'),
        close: () => ipcRenderer.send('close'),
        showMenu: () => ipcRenderer.send('show-context-menu')
    };

    api.on = (key, callback) => {
        ipcRenderer.on(key, (_, arg) => callback(arg));
        return api;
    };

    return api;
};

contextBridge.exposeInMainWorld('electron', getApi());
