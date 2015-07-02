var fs = require('fs'),
    path = require('path');

function getFolders(dir) {
  console.log(dir);
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
};

function getFiles(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isFile();
    });
};

var io = {
  getFiles: getFiles,
  getFolders: getFolders
};

module.exports = io;
