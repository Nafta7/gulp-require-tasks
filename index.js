var fs = require('fs'),
    Path = require('path'),
    io = require('./lib/io'),
    reflect = require('./src/reflect');

var parent = module.parent,
    parentFile = parent.filename,
    parentDir = Path.dirname(parentFile);

function reflectApi(dir, opts){
  dir = dir || '.';
  dir = Path.resolve(parentDir, dir);
  var folders = io.getFolders(dir);

  if (folders.length === 0)
    return reflect.mapFiles(dir, opts);
  else
    return reflect.mapFolders(dir, folders, opts);
}

module.exports = {
  reflect: reflectApi
};
