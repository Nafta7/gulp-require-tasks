module.exports = function(path, plugins){
  return function(){
    return {path: path, plugins: plugins};
  }
}
