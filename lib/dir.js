var fs = require('fs'),
    path = require('path');

function folders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
};

function files(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isFile();
    });
};

var dir = {
  files: files,
  folders: folders
};

module.exports = dir;
