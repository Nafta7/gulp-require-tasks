var fs = require('fs'),
    Path = require('path');

var parent = module.parent;
var parentFile = parent.filename;
var parentDir = Path.dirname(parentFile);

module.exports = {
  mirror: function(dir, gulp, opts){

    dir = dir || '.';
    dir = Path.resolve(parentDir, dir);
    var folders = getFolders(dir);

    if (folders.length === 0)
      return mapFiles(dir, gulp, opts);
    else
      return mapFolders(dir, folders, gulp, opts);
  }
};

function mapFiles(dir, gulp, opts){
  var tasks = getFiles(dir);
  var map = [];
  var taskName;
  var task;


  var args = [];
  args.push(gulp);
  if (opts !== undefined) {
    Object.keys(opts).forEach(function(key){
      args.push(opts[key]);
    });
  }

  tasks.forEach(function(file){
    task = file.replace('.js', '');
    map.push(task);
    taskName = dir + '/' + task;
    gulp.task(task, require(taskName).apply(null, args));
  });
  return map;
};

function mapFolders(dir, folders, gulp, opts){
  var map = {};
  var tasks = getFiles(dir);
  var taskName;
  var task;

  var args = [];
  args.push(gulp);
  if (opts !== undefined) {
    Object.keys(opts).forEach(function(key){
      args.push(opts[key]);
    });
  }

  if (tasks.length > 0){
    map['root'] = [];
    tasks.forEach(function(file){
      task = file.replace('.js', '');
      map['root'].push(task);
      taskName = dir + '/' + task;
      gulp.task(task, require(taskName).apply(null, args));
    });
  }
  folders.forEach(function(folder){
    map[folder] = [];
    tasks = getFiles(dir + '/' + folder);
    tasks.forEach(function(file){
      task = file.replace('.js', '');
      map[folder].push(task);
      taskName = dir + '/' + folder + '/' + task;
      gulp.task(task, require(taskName).apply(null, args));
    });
  });
  return map;
};

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(Path.join(dir, file)).isDirectory();
    });
};

function getFiles(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(Path.join(dir, file)).isFile();
    });
};
