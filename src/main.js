const { app, BrowserWindow } = require('electron')

let win
let splashScreen

app.on('ready', _ => {
    createSplashScreen()
    createMainWindow()
})

app.on('window-all-closed', _ => {
    app.quit()
})

function createSplashScreen(){
    splashScreen = new BrowserWindow({
        width: 512,
        height: 512,
        titleBarStyle: 'hidden',
        alwaysOnTop: true,
        closable: false,
        skipTaskbar: true,
        show: true,
        minimizable: false,
        maximizable: false,
        resizable: false,
        center: true,
        frame: false
    })
    splashScreen.loadURL(`file://${__dirname}/images/hasselhoff.png`)
}

function createMainWindow(){
    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        show: false
    })

    win.loadFile('src/index.html')
    win.on('closed', _ => {
        win = null
    })

    win.once('ready-to-show', _ => {
        if(splashScreen && splashScreen.isVisible()){
            splashScreen.destroy()
            splashScreen = null
        }

        if(!win.isVisible()){
            win.show()
        }
    })

    //win.webContents.openDevTools()
}