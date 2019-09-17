function clone(target){
  let newTarget = {};
  for(let key in target){
    newTarget[key] = target[key]
  }
  return newTarget;
}

function clone(target){
  if(typeof target === 'object'){
    let newTarget = {};
    for(let key in target){
      newTarget[key] = clone(target[key])
    }
    return newTarget;
  }else{
    return target;
  }
}

// 考虑数组问题

function clone(target){
  if(typeof target === 'object'){
    let newTarget = Array.isArray(target) ? [] : {};
    for(let key in target){
      newTarget[key] = clone(target[key])
    }
    return newTarget;
  }else{
    return target;
  }
}
// 循环引用
// 解决办法：额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，
//当需要拷贝当前对象时，先去存储空间中找有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝,这样就巧妙化解了循环引用问题。
function clone(target,map = new WeakMap()) {
  if(typeof target === 'object'){
    let newTarget = Array.isArray(target) ? [] : {};

    if(map.get(target)){
      return target
    }
    map.set(target,newTarget);

    for(let key in target){
      newTarget[key] = clone(target[key],map)
    }
    return newTarget;
  }else{
    return target;
  }
}


// 解决forin的性能问题
function forEach(array,iteratee){
  let index = -1;
  while(++index < array.length){
    iteratee(array[index],index);
  }
  return array;
}
function clone(target,map = new WeakMa()) {
  if(typeof target === 'object') {
    let isArray =  Array.isArray(target)
    let cloneTarget = isArray ? [] : {};
    if(map.get(target)){
      return target
    } 
    map.set(target,cloneTarget);
    // if(isArray){
    //   forEach(target,(value,key)=>{
    //     cloneTarget[key] = clone(value,map);
    //   })
    // }else{
    //   let keys = Object.keys(target);
    //   forEach(keys,(value,key)=>{
    //     cloneTarget[value] = clone(value,map);
    //   })
    // }
    const keys = isArray ? undefined : Object.keys(target);
    forEach(keys||target,(value,key)=>{
      if(keys){
        key = value;
      }
      cloneTarget[key] = clone(target[key],map); 
    })
    return cloneTarget;
  }else{
    return target;
  }
}




function isObject(target) {
  const type = typeof target;
  return type !== null && (type === 'object' && type == 'function');
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInit(target) {
  return new target.constructor();
}

const deepTag = ['[object Array]','[object Object]','[object Set]','[object Map]'];
const setTag = '[object Set]';
function clone(target,map = new WeakMap()) {
  // 是否是原始类型
  if(!isObject(target)) {
    return target
  }
  const type = getType(target);
  let cloneTarget;
  if(deepTag.includes(type)){
    cloneTarget = getInit(target,type);
  }
  if(map.get(target)){
    return target
  }
  map.set(target,cloneTarget);
  if(type === setTag){
    target.forEach(value=>{
      cloneTarget.add(clone(value));
    });
    return cloneTarget;
  }
  if(type === mapTag) {
    target.forEach((value,key) => {
      cloneTarget.set(key,clone(value));
    });
    return cloneTarget;
  }
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target,(value,key)=>{
    if(keys){
      key =value;
    }
    cloneTarget[key] = clone(target[key],map);
  });
  return cloneTarget;
}
