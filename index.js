#! /usr/bin/env node
const stripJsonComments = require("strip-json-comments");
const fs = require("fs");
const path = require("path");

let sublimeJson = fs.readFileSync("./sftp-config.json", "utf8");
sublimeJson = stripJsonComments(sublimeJson).replace(
  /\,(?!\s*?[\{\[\"\'\w])/g,
  ""
);
sublimeJson = JSON.parse(sublimeJson);
console.log("Source file: ", sublimeJson);

let type = sublimeJson.type;
let secure = false;
if (["ftp", "ftps", "sftp"].indexOf(sublimeJson.type) === -1) {
  throw new Error("Invalid type");
}

if (type === 'ftps') {
    secure = true;
    type = 'ftp';
}

let codeJson = {
  name: path.basename(__dirname),
  host: sublimeJson.host,
  protocol: type,
  port: parseInt(sublimeJson.port),
  username: sublimeJson.user,
  password: sublimeJson.password,
  remotePath: sublimeJson.remote_path,
  uploadOnSave: sublimeJson.upload_on_save,
  secure,
  ignore: [".vscode", ".git", ".DS_Store"],
};

if (sublimeJson.ssh_key_file) {
  codeJson.privateKeyPath = sublimeJson.ssh_key_file;
}

if (
  sublimeJson.remote_time_offset_in_hours &&
  sublimeJson.remote_time_offset_in_hours != 0
) {
  codeJson.remoteTimeOffsetInHours = sublimeJson.remote_time_offset_in_hours;
}

if (sublimeJson.ignore_regexes) {
  const values = sublimeJson.ignore_regexes.map((item) =>
    item.replaceAll("\\", "")
  );

  codeJson.ignore = codeJson.ignore
    .concat(values)
    .filter((value, index, self) => self.indexOf(value) === index);
}

codeJson = JSON.stringify(codeJson, null, 4);
console.log("Target content: ", codeJson);

const codeDir = "./.vscode";
if (!fs.existsSync(codeDir)) {
  fs.mkdirSync(codeDir);
}

fs.writeFileSync("./.vscode/sftp.json", codeJson);
console.log("All done!");
