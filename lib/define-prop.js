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

module.exports = defineProp
