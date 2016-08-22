var path = require('path'),
    mapper = require('./src/mapper')

module.exports = function(dirname, config){
  var config = config || {}
  dirname = dirname || '.'
  dirname = path.resolve(path.dirname(module.parent.filename), dirname)
  return mapper(dirname, config)
}
