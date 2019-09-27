function _new(){
    var obj = new Object();
    let [constructor,...args] = [...arguments];
    obj.__proto__ = constructor.prototype;
    let result = constructor.apply(obj,args);
    if(result && typeof(result) === 'object' || typeof(result) === 'function') {
        return result
    }
    return obj;
}

function _new(){
  let target = {};
  let [constructor,...args] = [...arguments];
  target.__proto__ = constructor.prototype;
  let result = constructor.apply(target,args);
  if(result && ((typeof result === 'object')||(typeof result === 'Function'))) {
    return result
  }
  return target;
}