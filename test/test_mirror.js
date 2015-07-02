var gulp = require('gulp');
var toska = require('..');
var opts = {path: {}, plugins: {}};

exports.single = {
  setUp: function(cb){
    cb();
  },

  'should mirror single folder': function(test){
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

exports.multiple = {
  setUp: function(cb){
    this.tasks = toska.mirror('multiple', gulp, opts);
    this.fn_a = require('./multiple/build/a');
    this.fn_b = require('./multiple/build/b');
    this.fn_c = require('./multiple/build/c');
    this.fn_d = require('./multiple/deploy/d');
    this.fn_e = require('./multiple/deploy/e');
    cb();
  },

  'should mirror all folders': function (test) {
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
  }
};

exports.root = {
  'should mirror tasks in root': function(test){
    var tasks = toska.mirror('root', gulp, opts);
    var map = ['a', 'b'];
    test.deepEqual(tasks, map,
      'tasks creation failed');
    test.done();
  }
};

exports.mix = {
  'should mirror tasks for all files and folders': function(test){
    var tasks = toska.mirror('mix', gulp, opts);

    test.deepEqual(tasks, {
      root: ['a', 'b'], build: ['c', 'd', 'e']
    }, 'folders/files failed to load.');

    test.equal(gulp.tasks['a'].fn.toString(), require('./mix/a')().toString(),
      'failed to create task a');
    test.equal(gulp.tasks['b'].fn.toString(), require('./mix/b')().toString(),
      'failed to create task b');
    test.equal(gulp.tasks['e'].fn.toString(), require('./mix/build/e')().toString(),
      'failed to create task e');

    test.done();
  }
};

exports.options = {
  'should only need dir and gulp': function(test){
    var tasks = toska.mirror('options', gulp);
    test.equal(gulp.tasks["a"].fn().gulp, gulp);
    test.strictEqual(gulp.tasks['a'].fn().path, undefined);
    test.done();
  },

  'should allow options to be passed expanded into the modules': function(test){
    var path = {
      styles: {
        src: 'styles/'
      },
      scripts: {
        src: 'scripts/'
      }
    };
    var plugins = {browser: 'browser'};
    var options = {path: path, plugins: plugins};

    toska.mirror('options', gulp, options);

    test.equal(gulp.tasks['a'].fn().path, path,
    'failed to pass dynamic path option')

    test.equal(gulp.tasks['a'].fn().plugins, plugins,
    'failed to pass dynamic plugins option');

    test.equal(gulp.tasks['a'].fn().gulp, gulp,
    'failed to pass gulp to modules');
    test.done();
  },
};
