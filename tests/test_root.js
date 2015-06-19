var gulp = require('gulp');
var toska = require('..');
var opts = {path: {}, plugins: {}};

exports.root = {
  'should create all tasks': function(test){
    var tasks = toska.mirror('root', gulp, opts);
    var map = ['a', 'b'];
    test.deepEqual(tasks, map,
      'tasks creation failed');
    test.done();
  }
};
