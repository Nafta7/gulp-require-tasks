var gulp = require('gulp');
var toska = require('..');
var opts = {gulp: gulp, path: {}, plugins: {}};

exports.options = {
  'should only need tasks_dir and gulp': function(test){
    var tasks = toska.mirror('options', gulp);
    test.equal(gulp.tasks["a"].fn().gulp, gulp);
    test.strictEqual(gulp.tasks['a'].fn().path, undefined);
    test.done();
  },

  'should allow dynamic options to be passed expanded into the modules': function(test){
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
