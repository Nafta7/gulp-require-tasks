var fs = require('fs'),
    Path = require('path'),
    io = require('./lib/io'),
    mirror = require('./src/mirror'),
    reflect = require('./src/reflect');

var parent = module.parent;
var parentFile = parent.filename;
var parentDir = Path.dirname(parentFile);

module.exports = {
  mirror: function(dir, gulp, opts){
    dir = dir || '.';
    dir = Path.resolve(parentDir, dir);
    var folders = io.getFolders(dir);

    if (folders.length === 0)
      return mirror.mapFiles(dir, gulp, opts);
    else
      return mirror.mapFolders(dir, folders, gulp, opts);
  },

  reflect: function(dir, opts){
    dir = dir || '.';
    dir = Path.resolve(parentDir, dir);
    var folders = io.getFolders(dir);

    if (folders.length === 0) {
      return reflect.mapFiles(dir, opts);
    }
    else {
      return reflect.mapFolders(dir, folders, opts);
    }
  }
};
