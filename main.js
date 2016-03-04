const fs = require("fs");
const md2html = require("node-markdown").Markdown;

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const template = fs.readFileSync(__dirname + "/template.html", "utf8");

app.on("ready", function() {
  const win = new BrowserWindow({ x: 0, y: 0, width: 1280, height: 1024, frame: false });
  const mdFilename = process.cwd() + "/" + process.argv[2];

  fs.watch(mdFilename, reload);
  reload();

  function reload() {
    const md = fs.readFileSync(mdFilename, "utf8");
    const htmlContent = md2html(md);
    const htmlFull = template.replace("###PLACEHOLDER###", htmlContent);
    const htmlFilename = "/tmp/md-preview.html";
    fs.writeFileSync(htmlFilename, htmlFull);
    win.loadURL("file://" + htmlFilename);
  }
});

