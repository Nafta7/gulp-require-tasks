var fs = require('fs'),
    Path = require('path');

var parent = module.parent;
var parentFile = parent.filename;
var parentDir = Path.dirname(parentFile);

module.exports = {
  loadTasks: function(dir, opts){

    var obj_types = {};
    var taskName;

    dir = dir || '.';
    dir = Path.resolve(parentDir, dir);

    var types = getFolders(dir);
    types.forEach(function(type){
      obj_types[type] = [];
      tasks = getFiles(dir + '/' + type);
      tasks.forEach(function(file){
        task = file.replace('.js', '');
        obj_types[type].push(task);
        taskName = dir + "/" + type + '/' + task;
        opts.gulp.task(task, require(taskName)(opts.gulp, opts.path, opts.plugins));
      });
    });

    return obj_types;
  },

  startTasks: function(gulp, tasks){
    Object.keys(tasks).forEach(function(type){
      gulp.task(type, function(){
        tasks[type].forEach(function(task){
          gulp.start(task);
        });
      });
    });
  }
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
