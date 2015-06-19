var gulp = require('gulp');
var toska = require('..');
var opts = {path: {}, plugins: {}};

exports.mixFolderFiles = {
  'should map tasks for all files and folders': function(test){
    var tasks = toska.mirror('mix', gulp, opts);

    test.deepEqual(tasks, {
      root: ['a', 'b'], build: ['c', 'd', 'e']
    }, 'folders/files failed to load.');

    test.deepEqual(gulp.tasks['build'].dep, ['c', 'd', 'e'],
      'failed to create build task dependencies.');

    test.equal(gulp.tasks['a'].fn.toString(), require('./mix/a')().toString(),
      'failed to create task a');
    test.equal(gulp.tasks['b'].fn.toString(), require('./mix/b')().toString(),
      'failed to create task b');
    test.equal(gulp.tasks['e'].fn.toString(), require('./mix/build/e')().toString(),
      'failed to create task e');

    test.done();
  }
};
