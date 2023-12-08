let { app, BrowserWindow } = require("electron")
let { ipcMain } = require("electron")
var mysql = require('mysql');


var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "MuhogiDatabase123$",
  database: "MUSIC"
});

con.connect(function(err) {
  if (err) throw err;
 console.log("Connected!");
});






function createWindow() {
  let win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  win.loadFile("index.html")
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  app.quit()
})



ipcMain.handle("console", async (event, line) => {
  console.log(`Running: ${line}`);

  return new Promise((resolve, reject) => {
    con.query(line, function (err, result, fields) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(result);
        resolve(result);
      }
    });
  });
});