var modula = require('..');
exports.single = {
  setUp: function(cb){
    cb();
  },

  'should map a single folder': function(test){
    var tasks = modula('single');
    var a = require('./single/build/a');
    var build = {'a': a };
    test.deepEqual(tasks.build, build);
    test.done();
  }
};

exports.multiple = {
  'should map multiple folders': function(test){
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
    var tasks = modula('multiple');
    test.deepEqual(tasks.build, tasksExpected.build);
    test.deepEqual(tasks.deploy, tasksExpected.deploy);
    test.done();
  }
};

exports.root = {
  'should map root files': function(test){
    var tasksExpected = {
      'a': require('./root/a'),
      'b': require('./root/b')
    };
    var tasks = modula('root');
    test.deepEqual(tasks, tasksExpected);
    test.done();
  }
};

exports.mix = {
  'should map a mix of folder and files': function(test){
    var tasksExpected = {
      build: {
        'c': require('./mix/build/c'),
        'd': require('./mix/build/d'),
        'e': require('./mix/build/e')
      },
      'a': require('./mix/a'),
      'b': require('./mix/b')
    };

    var tasks = modula('mix');
    test.deepEqual(tasks.build, tasksExpected.build);
    test.deepEqual(tasks['a'], tasksExpected['a']);
    test.deepEqual(tasks['b'], tasksExpected.b);
    test.done();
  }
};

exports.arguments = {
  'should accept arguments': function(test){
    var path = {
      styles: {src: 'styles'},
      scripts: {src: 'scripts'}
    };
    var plugins = {
      pin: 'pin'
    };
    var args = {path: path, plugins: plugins};
    var tasks = modula('arguments', {args: args});
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
    var moduls = modula('mix');
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
