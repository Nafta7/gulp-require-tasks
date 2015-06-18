var gulp = require('gulp');
var toska = require('..');
var opts = {gulp: gulp, path: {}, plugins: {}};

exports.single = {
  setUp: function(cb){
    this.fn_a = require('./single/build/a');
    this.tasks = toska.loadTasks('single', opts);
    cb();
  },

  testLoadBuildFolder: function(test){
    test.deepEqual(this.tasks, {build: ['a']}, "build folder not properly loaded.");
    test.done();
  },

  testCreateTaskA: function(test){
    test.ok(gulp.tasks.a.fn.toString() == this.fn_a().toString(), "task a creation failed.");
    test.done();
  }
};

exports.multiple = {
  setUp: function(cb){
    this.fn_a = require('./multiple/build/a');
    this.fn_b = require('./multiple/build/b');
    this.fn_c = require('./multiple/build/c');
    this.fn_d = require('./multiple/deploy/d');
    this.fn_e = require('./multiple/deploy/e');
    this.tasks = toska.loadTasks('multiple', opts);
    cb();
  },

  testLoadFolders: function (test) {
    test.deepEqual(this.tasks, {
      build: ['a', 'b', 'c'],
      deploy: ['d', 'e']
    }, "folders failed to load.");
    test.done();
  },

  testLoadTasks: function(test){
    test.ok(gulp.tasks.a.fn.toString() == this.fn_a().toString(), "gulp failed to create task a.");
    test.ok(gulp.tasks.b.fn.toString() == this.fn_b().toString(), "gulp failed to create task b.");
    test.ok(gulp.tasks.c.fn.toString() == this.fn_c().toString(), "gulp failed to create task c.");
    test.ok(gulp.tasks.d.fn.toString() == this.fn_d().toString(), "gulp failed to create task d.");
    test.ok(gulp.tasks.e.fn.toString() == this.fn_e().toString(), "gulp failed to create task e.");
    test.done()
  },

  testStartTasks: function(test){
    toska.startTasks(gulp, this.tasks);
    test.deepEqual(gulp.tasks['build'].dep, ['a', 'b', 'c'], "gulp failed to load build task dependencies.");
    test.deepEqual(gulp.tasks['deploy'].dep, ['d', 'e'], 'gulp failed to load deploy task dependencies.')
    test.done();
  }
};
