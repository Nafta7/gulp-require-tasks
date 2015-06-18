var gulp = require('gulp');
var toska = require('..');
var opts = {gulp: gulp, path: {}, plugins: {}};

exports.testTree = {
  'should display a nice tree in the console': function(test){
    var taskTree = require('../node_modules/gulp/lib/taskTree');
    var archy = require('archy');
    var tasks = toska.mirror('mix', opts);
    var tree = taskTree(gulp.tasks);
    archy(tree)
      .split('\n')
      .forEach(function(v) {
        if (v.trim().length === 0) {
         return;
        }
        console.log(v);
      });
     test.done();
  }
};
