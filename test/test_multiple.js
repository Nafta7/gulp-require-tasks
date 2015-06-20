var gulp = require('gulp');
var toska = require('..');
var opts = {path: {}, plugins: {}};

exports.multipleFolders = {
  setUp: function(cb){
    this.tasks = toska.mirror('multiple', gulp, opts);
    this.fn_a = require('./multiple/build/a');
    this.fn_b = require('./multiple/build/b');
    this.fn_c = require('./multiple/build/c');
    this.fn_d = require('./multiple/deploy/d');
    this.fn_e = require('./multiple/deploy/e');
    cb();
  },

  'should map all folders and files': function (test) {
    test.deepEqual(this.tasks, {
      build: ['a', 'b', 'c'],
      deploy: ['d', 'e']
    }, 'folders failed to load.');
    test.done();
  },

  'should create all tasks': function(test){
    test.equal(gulp.tasks.a.fn.toString(), this.fn_a().toString(),
      'failed to create task a.');
    test.equal(gulp.tasks.b.fn.toString(), this.fn_b().toString(),
      'failed to create task b.');
    test.equal(gulp.tasks.c.fn.toString(), this.fn_c().toString(),
      'failed to create task c.');
    test.equal(gulp.tasks.d.fn.toString(), this.fn_d().toString(),
      'failed to create task d.');
    test.equal(gulp.tasks.e.fn.toString(), this.fn_e().toString(),
      'failed to create task e.');
    test.done()
  },

  'should create all task with dependencies': function(test){
    test.deepEqual(gulp.tasks['build'].dep, ['a', 'b', 'c'],
      'failed to create build task dependencies.');
    test.deepEqual(gulp.tasks['deploy'].dep, ['d', 'e'],
      'failed to create deploy task dependencies.')
    test.done();
  },

  'should mirror all task and create dependencies': function(test){
    test.deepEqual(gulp.tasks['build'].dep, ['a', 'b', 'c'],
      'gulp failed to load build task dependencies.');
    test.deepEqual(gulp.tasks['deploy'].dep, ['d', 'e'],
      'gulp failed to load deploy task dependencies.')
    test.done();
  }
};
