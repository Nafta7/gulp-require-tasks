var modula = require('..'),
    dir = 'mix'

exports.flat = {
  setUp: function(cb){
    this.a = require('./mix/a')
    this.b = require('./mix/b')
    this.c = require('./mix/build/c')
    this.d = require('./mix/build/d')
    this.e = require('./mix/build/e')
    cb()
  },

  'should be flat': function(test){
    var opts = {
      flat: true
    }

    var moduls = modula(dir, {opts: opts});
    test.strictEqual(moduls.build, undefined)
    test.deepEqual(moduls.a, this.a)
    test.deepEqual(moduls.b, this.b)
    test.deepEqual(moduls.c, this.c)
    test.deepEqual(moduls.d, this.d)

    test.done()
  },
  'should be flat and include only especified files': function(test) {
    var moduls = modula(dir, {
      opts: {
        flat: true,
        include: ['d', 'e']
      }
    })

    var build = {
      d: this.d,
      e: this.e
    }

    test.deepEqual(moduls.d, this.d)
    test.deepEqual(moduls.e, this.e)
    test.notDeepEqual(moduls.build, build)
    test.equal(moduls.build, undefined)
    test.notDeepEqual(moduls.a, this.a)
    test.notDeepEqual(moduls.c, this.c)
    test.done()
  }
}
exports.include = {
  setUp: function(cb){
    this.a = require('./mix/a')
    this.b = require('./mix/b')
    this.c = require('./mix/build/c')
    this.d = require('./mix/build/d')
    this.e = require('./mix/build/e')
    cb()
  },

  'should only include the especified file': function(test){
    var moduls = modula(dir, {
      opts: {
        include: 'a'
      }
    })
    test.notDeepEqual(moduls.b, this.b)
    test.deepEqual(moduls.a, this.a)
    test.done()
  },

  'should include all the specified files': function(test){
    var moduls = modula(dir, {
      opts: {
        include: ['b', 'd', 'e']
      }
    })

    test.notDeepEqual(moduls.a, this.a)
    test.notDeepEqual(moduls.c, this.c)
    test.deepEqual(moduls.b, this.b)
    test.deepEqual(moduls.d, this.d)
    test.deepEqual(moduls.e, this.e)
    test.done()
  }
}

exports.exclude = {
  setUp: function(cb){
    this.a = require('./mix/a')
    this.b = require('./mix/b')
    this.c = require('./mix/build/c')
    this.d = require('./mix/build/d')
    this.e = require('./mix/build/e')
    cb();
  },

  'should only ignore the especified file': function(test){
    var moduls = modula(dir, {
      opts: {
        exclude: 'a'
      }
    })
    test.notDeepEqual(moduls.a, this.a)
    test.deepEqual(moduls.b, this.b)
    test.deepEqual(moduls.c, this.c)
    test.deepEqual(moduls.build.c, this.c)
    test.deepEqual(moduls.build.e, this.e)

    test.done()
  },

  'should ignore all the specified files': function(test) {
    var moduls = modula(dir, {
      opts: {
        exclude: ['a', 'c']
      }
    })

    test.notDeepEqual(moduls.a, this.a)
    test.notDeepEqual(moduls.c, this.c)
    test.deepEqual(moduls.b, this.b)
    test.deepEqual(moduls.d, this.d)
    test.deepEqual(moduls.build.e, this.e)
    test.deepEqual(moduls.build.d, this.d)

    test.done()
  },

  'should ignore the especified files': function(test) {
    var moduls = modula(dir, {
      opts: {
        exclude: ['e', 'c']
      }
    })

    test.notDeepEqual(moduls.e, this.e)
    test.notDeepEqual(moduls.c, this.c)
    test.deepEqual(moduls.a, this.a)
    test.deepEqual(moduls.d, this.d)
    test.deepEqual(moduls.b, this.b)

    test.done()
  }
}
