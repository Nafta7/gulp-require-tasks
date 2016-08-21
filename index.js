var fs = require('fs'),
    path = require('path'),
    dir = require('./lib/dir'),
    mapper = require('./src/mapper');

module.exports = function(dirName, opts){
  dirName = dirName || '.';
  dirName = path.resolve(path.dirname(module.parent.filename), dirName);
  var folders = dir.folders(dirName);

  if (folders.length === 0)
    return mapper.mapFiles(dirName, opts);
  else
    return mapper.mapFolders(dirName, folders, opts);
}
