'use strict'
const electron = require('electron')
const log = require('electron-log')
const autoUpdater = require('electron-updater').autoUpdater
const app = electron.app

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
log.info('App starting ...')

// Adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')()

// Prevent window being garbage collected
let mainWindow

function onClosed () {
  // Dereference the window
  // For multiple windows store them in an array
  mainWindow = null
}

function createMainWindow () {
  const win = new electron.BrowserWindow({
    width: 600,
    height: 400
  })

  win.loadURL(`file://${__dirname}/index.html`)
  win.on('closed', onClosed)

  return win
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', () => {
  mainWindow = createMainWindow()
  autoUpdater.checkForUpdatesAndNotify()
})
