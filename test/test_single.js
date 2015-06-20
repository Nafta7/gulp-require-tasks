var gulp = require('gulp');
var toska = require('..');
var opts = {path: {}, plugins: {}};

exports.singleFolder = {
  setUp: function(cb){
    cb();
  },

  'build folder should be loaded': function(test){
    var tasks = toska.mirror('single', gulp, opts);
    test.deepEqual(tasks, {build: ['a']},
      'build folder not properly loaded.');
    test.done();
  },

  'should create task a': function(test){
    this.fn_a = require('./single/build/a');
    test.ok(gulp.tasks.a.fn.toString() == this.fn_a().toString(),
      'task a creation failed.');
    test.done();
  }
};
