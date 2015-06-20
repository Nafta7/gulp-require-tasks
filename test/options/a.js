module.exports = function(gulp, path, plugins){
  return function(){
    return {gulp: gulp, path: path, plugins: plugins};
  }
}
