function requirer(modul, args){
  // in case options are provided,
  // build an array to be used with fn.apply
  if (args !== undefined) {
    args = Object.keys(args).map(function(key){
      return args[key]
    })
  }

  return args
    ? require(modul).apply(null, args)
    : require(modul)
}

module.exports = requirer
