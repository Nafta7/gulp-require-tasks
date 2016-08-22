var path = require('path')
var walk = require('walkdir')

function mapper(dirname, config){
  var args = config.args
  var opts = config.opts

  var moduls = {}
  var modul
  var base
  var relative
  var filename

  walk.sync(dirname,function(pathname,stat){
    base = path.basename(pathname);
    filename = base.replace('.js', '')
    if (stat.isDirectory()){
      relative = path.relative(dirname, path.parse(pathname).dir);

      if (relative != '..')
        moduls[filename] = {}
    }
    else {
        modul = requirer(pathname.replace('.js', ''), args);
        moduls[filename] = modul;
        relative = path.relative(dirname, path.parse(pathname).dir);
        if (relative != ''){
          defineProp(moduls[relative], filename, modul)
        }
    }
  })

  return moduls
}

// http://stackoverflow.com/a/22928207/6598709
function defineProp(obj, key, value){
  var config = {
    value: value,
    writable: true,
    enumerable: true,
    configurable: true
  }
  Object.defineProperty(obj, key, config)
}

function requirer(task, args){
  // in case options are provided,
  // build an array to be used with fn.apply
  var args
  if (args !== undefined) {
    args = Object.keys(args).map(function(key){
      return args[key]
    })
  }

  return args
    ? require(task).apply(null, args)
    : require(task)
}

module.exports = mapper
