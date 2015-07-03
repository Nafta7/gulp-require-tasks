var gulp = require('gulp');
var toska = require('..');
exports.single = {
  setUp: function(cb){
    cb();
  },

  'should reflect single folder in an object literal': function(test){
    var tasks = toska.reflect('single');
    var a = require('./single/build/a');
    var build = {'a': a };
    test.deepEqual(tasks.build, build);
    test.done();
  }
};

exports.multiple = {
  'should reflect multiple folders in an object literal': function(test){
    var tasksExpected = {
      build: {
        'a': require('./multiple/build/a'),
        'b': require('./multiple/build/b'),
        'c': require('./multiple/build/c')
      },
      deploy: {
        'd': require('./multiple/deploy/d'),
        'e': require('./multiple/deploy/e')
      }
    };
    var tasks = toska.reflect('multiple');
    test.deepEqual(tasks.build, tasksExpected.build);
    test.deepEqual(tasks.deploy, tasksExpected.deploy);
    test.done();
  }
};

exports.root = {
  'should reflect root as flat object literal': function(test){
    var tasksExpected = {
      'a': require('./root/a'),
      'b': require('./root/b')
    };
    var tasks = toska.reflect('root');
    test.deepEqual(tasks, tasksExpected);
    test.done();
  }
};

exports.mix = {
  'should reflect a mix of root and folder as object literal': function(test){
    var tasksExpected = {
      build: {
        'c': require('./mix/build/c'),
        'd': require('./mix/build/d'),
        'e': require('./mix/build/e')
      },
      root: {
        'a': require('./mix/a'),
        'b': require('./mix/b')
      }
    };

    var tasks = toska.reflect('mix');
    test.deepEqual(tasks.build, tasksExpected.build);
    test.deepEqual(tasks.root, tasksExpected.root);
    test.done();
  }
};

exports.options = {
  'should accept parameters as options': function(test){
    var path = {
      styles: {src: 'styles'},
      scripts: {src: 'scripts'}
    };
    var plugins = {
      pin: 'pin'
    };
    var opts = {gulp: null, path: path, plugins: plugins};
    var tasks = toska.reflect('options', opts);
    test.equal(tasks.a().path, path);
    test.done();
  }
};

exports.exposeModules= {
  setUp: function(callback){
    this.dir = './mix/';
    this.modulA = require(this.dir + 'a');
    this.modulB = require(this.dir + 'b');
    this.modulC = require(this.dir + 'build/c');
    this.modulD = require(this.dir + 'build/d');
    this.modulE = require(this.dir + 'build/e');

    callback();
  },

  'should expose all modules to the map': function(test){
    var moduls = toska.reflect('mix');
    test.equal(moduls['a'].toString(),          this.modulA.toString());
    test.equal(moduls['b'].toString(),          this.modulB.toString());
    test.equal(moduls['b'].toString(),          this.modulB.toString());
    test.equal(moduls['c'].toString(),          this.modulC.toString());
    test.equal(moduls.build['c'].toString(),    this.modulC.toString());
    test.equal(moduls.build['d'].toString(),    this.modulD.toString());
    test.equal(moduls.build['e'].toString(),    this.modulE.toString());
    test.equal(moduls.a.toString(),             this.modulA.toString());
    test.done();
  }
};
