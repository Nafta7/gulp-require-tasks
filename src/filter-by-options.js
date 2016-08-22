function filterByOptions(filename, opts){
  if (opts.include) {
    return (opts.include instanceof Array)
      ? opts.include.indexOf(filename) >= 0
      : filename == opts.include
  }

  if (opts.exclude){
    return (opts.exclude instanceof Array)
      ? !(opts.exclude.indexOf(filename) >= 0)
      : filename != opts.exclude
  }
  return true
}

module.exports = filterByOptions
