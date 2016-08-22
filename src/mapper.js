var path            = require('path'),
    walk            = require('walkdir'),
    requirer        = require('../lib/requirer'),
    defineProp      = require('../lib/define-prop'),
    filterByOptions = require('./filter-by-options')

function mapper(dirname, config){
  var args = config.args,
      opts = config.opts || {},
      moduls = {},
      modul,
      relative,
      filename,
      filedir

  /*
    pathname: full pathname of the file
    filedir: file dir without the filename
    filename: filename without extension
  */

  walk.sync(dirname, function(pathname, stat){
    filedir = path.parse(pathname).dir
    filename = path.basename(pathname).replace('.js', '')

    if (stat.isDirectory()){
      if (!opts.flat) {
        if (isInside(dirname, filedir))
          defineProp(moduls, filename, {})
      }
    }

    if(stat.isFile()) {
      if (filterByOptions(filename, opts)) {
        modul = requirer(pathname.replace('.js', ''), args);
        defineProp(moduls, filename, modul)
        relative = path.relative(dirname, filedir);
        if (!opts.flat) {
          if (isRelative(dirname, filedir))
            defineProp(moduls[relative], filename , modul)
        }
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
