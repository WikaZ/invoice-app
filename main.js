const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
// const os = require('os');
const inDevelopmentMode = (process.env.MODE === 'dev');
// dla print
const fs = require('fs');
const os=require('os');
const ipc=ipcMain;

// © 2019 GitHub, Inc.
// Main window reference
let mainWindow = null;

/**
 * Create Window
 * @note Creates the applications 'main' window and loads the root file
 */
function createWindow() {
	// Configure our main window
	mainWindow = new BrowserWindow({
		width:900,
		height:600
	});
	// Display developer tools
	if (inDevelopmentMode) {
		mainWindow.webContents.openDevTools();
		BrowserWindow.addDevToolsExtension(
			path.join(os.homedir(), '.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.2.0_0')
		)
	}
	// Load primary UI
	mainWindow.loadURL(inDevelopmentMode ? `http://localhost:9000` : `file://${__dirname}/build/index.html`);
	// Handle 'closed' window event
	mainWindow.on('closed', () => {
		if (process.platform !== 'darwin') app.quit();
	});

	workerWindow = new BrowserWindow();
	workerWindow.loadURL(inDevelopmentMode ? `http://localhost:9000/worker.html` : `file://${__dirname}/build/worker.html`);
	// workerWindow.hide();
	workerWindow.webContents.openDevTools();
	workerWindow.on("closed", () => {
		workerWindow = undefined;
	});

	// retransmit it to workerWindow
	ipcMain.on("printPDF", (event, content) => {
		workerWindow.webContents.send("printPDF", content);
	});
// when worker window is ready
	ipcMain.on("readyToPrintPDF", (event) => {
		const pdfPath = path.join(os.tmpdir(), 'print.pdf');
		// Use default printing options
		workerWindow.webContents.printToPDF({}, function (error, data) {
			if (error) throw error
			fs.writeFile(pdfPath, data, function (error) {
				if (error) {
					throw error
				}
				shell.openItem(pdfPath)
				event.sender.send('wrote-pdf', pdfPath)
			})
		})
	});
}

/**
 * Application Ready
 * @note Called when the application has finished initializing and is ready to display the initial window.
 */
app.on('ready', createWindow);

/**
 * Application Closed
 * @note MacOS will commonly keep the application active until the user completely quits with Command+Q or Menu>Quit.
 */
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
});

/**
 * Application Active
 * @note MacOS will activate and application when it's returns from the background.
 * @note For example, when the user selects the icon in the dock or title bar.
 */
app.on('activate', () => {
	if (mainWindow === null) createWindow()
});

/**
 * Open Link
 * @note Opens the specified link externally in the users default browser.
 */
ipcMain.on('link:open', (event, link) => {
	if ('string' === typeof link && link.length > 0)
		shell.openExternal(link);
});

ipc.on('print-to-pdf', function (event) {
	console.warn(event);
	const pdfPath= path.join(os.tmpdir(), "print.pdf");
	const win=BrowserWindow.fromWebContents(event.sender)
	win.webContents.printToPDF({}, function (error, data) {
		if(error) return console.log(error.message);
		fs.writeFile(pdfPath, data, function (err) {
			console.warn(data);
			if(error)return console.log(err.message);
			shell.openExternal("file//" + pdfPath)
			event.sender.send('wrote-pdf', pdfPath)
			
		})
		
	})
})