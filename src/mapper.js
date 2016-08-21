var dir = require('../lib/dir');

function mapFolders(dirName, folders, args){
  var map = {}; // mapping modules
  var obj = {}; // hold a single mapping
  var task;     // combines dirName + path in order to require modules
  var modul;    // holds a module

  // maps the root
  var files = dir.files(dirName);
  if (files.length > 0){
    files.forEach(function(file){
      file = file.replace('.js', '');
      task = dirName + '/' + file;
      modul = requirer(task, args);
      obj[file] = modul;
      map[file] = modul;
      map['root'] = obj;
    });
  }

  // maps subdir
  folders.forEach(function(folder){
    obj = {};
    files = dir.files(dirName + '/' + folder);
    files.forEach(function(file){
      file = file.replace('.js', '');
      task = dirName + '/' + folder + '/' + file;
      modul = requirer(task, args);
      obj[file] = modul;
      map[file] = modul;
    });
    map[folder] = obj;
  });

  return map;
}

function mapFiles(dirName, args){
  var map = {}; // modules mapping
  var task;     // combines dirName + path to be required later on
  var modul;    // holds a module

  var files = dir.files(dirName);
  files.forEach(function(file){
    file = file.replace('.js', '');
    task = dirName + '/' + file;
     modul = requirer(task, args);
     map[file] = modul;

  });
  return map;
}

function requirer(task, args){
  // in case options are provided,
  // build an array to be used with fn.apply
  var args;
  if (args !== undefined) {
    args = Object.keys(args).map(function(key){
      return args[key];
    });
  }

  return args
    ? require(task).apply(null, args)
    : require(task);
}

var mapper = {
  mapFiles: mapFiles,
  mapFolders: mapFolders
};

module.exports = mapper;
