var fs = require('fs'),
    Path = require('path'),
    io = require('./lib/io'),
    mapper = require('./src/toska_mapper');

var parent = module.parent,
    parentFile = parent.filename,
    parentDir = Path.dirname(parentFile);

function reflectApi(dir, opts){
  dir = dir || '.';
  dir = Path.resolve(parentDir, dir);
  var folders = io.getFolders(dir);

  if (folders.length === 0)
    return mapper.mapFiles(dir, opts);
  else
    return mapper.mapFolders(dir, folders, opts);
}

module.exports = reflectApi;
