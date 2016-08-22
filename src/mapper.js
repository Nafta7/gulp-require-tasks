var path = require('path'),
    walk = require('walkdir'),
    requirer = require('../lib/requirer'),
    defineProp = require('../lib/define-prop')

function mapper(dirname, config){
  var args = config.args
  var opts = config.opts || {}
  opts.flat = opts.flat

  var moduls = {}
  var modul
  var base
  var relative
  var filename

  walk.sync(dirname, function(pathname, stat){
    base = path.basename(pathname);
    filename = base.replace('.js', '')

    if (stat.isDirectory()){
      if (isInside(dirname, path.parse(pathname).dir))
        defineProp(moduls, filename, {})
    }

    if(stat.isFile()) {
      modul = requirer(pathname.replace('.js', ''), args);
      defineProp(moduls, filename, modul)
      relative = path.relative(dirname, path.parse(pathname).dir);
      if (isRelative(dirname, path.parse(pathname).dir)){
        defineProp(moduls[relative], filename , modul)
      }
    }
  })

  return moduls
}

function isInside(from, to) {
  return path.relative(from, to) != '..'
}

function isRelative(from, to){
  return path.relative(from, to) != '';
}

module.exports = mapper
