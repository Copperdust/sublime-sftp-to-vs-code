#! /usr/bin/env node
var stripJsonComments = require('strip-json-comments');
var fs = require('fs');

var sublimeJson = fs.readFileSync('./sftp-config.json', 'utf8');
var sublimeJson = stripJsonComments(sublimeJson).replace(/\,(?!\s*?[\{\[\"\'\w])/g, '');
var sublimeJson = JSON.parse(sublimeJson);
console.log("Source file: ", sublimeJson);

var codeJson = {
    "host": sublimeJson.host,
    "protocol": sublimeJson.type,
    "port": parseInt(sublimeJson.port),
    "username": sublimeJson.user,
    "password": sublimeJson.password,
    "remotePath": sublimeJson.remote_path,
    "uploadOnSave": sublimeJson.upload_on_save
}
codeJson = JSON.stringify(codeJson, null, 4);
console.log("Target content: ", codeJson);

var codeDir = './.vscode';
if (!fs.existsSync(codeDir)) {
    fs.mkdirSync(codeDir);
}

fs.writeFileSync('./.vscode/sftp.json', codeJson);
console.log("All done!");
