var fs = require('fs'),
    Path = require('path');

var parent = module.parent;
var parentFile = parent.filename;
var parentDir = Path.dirname(parentFile);

module.exports = {
  mirror: function(dir, opts){
    dir = dir || '.';
    dir = Path.resolve(parentDir, dir);
    var folders = getFolders(dir);

    if (folders.length === 0)
      return mapFiles(dir, opts);
    else
      return mapFolders(dir, folders, opts);
  }
};

function mapFiles(dir, opts){
  var tasks = getFiles(dir);
  var map = [];
  var taskName;
  var task;
  tasks.forEach(function(file){
    task = file.replace('.js', '');
    map.push(task);
    taskName = dir + '/' + task;
    opts.gulp.task(task, require(taskName)(
      opts.gulp,
      opts.path,
      opts.plugins
    ));
  });
  return map;
};

function mapFolders(dir, folders, opts){
  var map = {};
  var tasks = getFiles(dir);
  var taskName;
  var task;

  if (tasks.length > 0){
    map['root'] = [];
    tasks.forEach(function(file){
      task = file.replace('.js', '');
      map['root'].push(task);
      taskName = dir + '/' + task;
      console.log(taskName);
      opts.gulp.task(task, require(taskName)(
        opts.gulp,
        opts.path,
        opts.plugins
      ));
    });
  }
  folders.forEach(function(folder){
    map[folder] = [];
    tasks = getFiles(dir + '/' + folder);
    tasks.forEach(function(file){
      task = file.replace('.js', '');
      map[folder].push(task);
      taskName = dir + '/' + folder + '/' + task;
      opts.gulp.task(task, require(taskName)(
        opts.gulp,
        opts.path,
        opts.plugins
      ));
    });
    opts.gulp.task(folder, map[folder]);
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
