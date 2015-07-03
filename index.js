var fs = require('fs'),
    Path = require('path'),
    io = require('./lib/io'),
    mirror = require('./src/mirror'),
    reflect = require('./src/reflect');

var parent = module.parent,
    parentFile = parent.filename,
    parentDir = Path.dirname(parentFile);

function mirrorApi(dir, gulp, opts){
  dir = dir || '.';
  dir = Path.resolve(parentDir, dir);
  var folders = io.getFolders(dir);

  if (folders.length === 0)
    return mirror.mapFiles(dir, gulp, opts);
  else
    return mirror.mapFolders(dir, folders, gulp, opts);
}

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
  mirror: mirrorApi,
  reflect: reflectApi
};
