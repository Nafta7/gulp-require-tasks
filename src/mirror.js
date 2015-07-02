var io = require('../lib/io');

function mapFiles(dir, gulp, opts){
  var tasks = io.getFiles(dir);
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
  var tasks = io.getFiles(dir);
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
    tasks = io.getFiles(dir + '/' + folder);
    tasks.forEach(function(file){
      task = file.replace('.js', '');
      map[folder].push(task);
      taskName = dir + '/' + folder + '/' + task;
      gulp.task(task, require(taskName).apply(null, args));
    });
  });
  return map;
};

var mirror = {
  mapFiles: mapFiles,
  mapFolders: mapFolders
};

module.exports = mirror;
