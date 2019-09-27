function deepclone(target){
  if(typeof target === 'object'){
    const cloneTarget = {};
    for(let key in target) {
      cloneTarget[key] = deepclone(target[key])
    }
    return cloneTarget
  }else{
    return target;
  }
}

function deepclone_arr(target){
  
  if(typeof target === 'object') {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for(let i in target){
      cloneTarget[i] = deepclone_arr(target[i]);
    }
    return cloneTarget;
  }else{
    return target;
  }
}

function deepclone_arr_self(target,map = new WeakMap()) {
  if(typeof target === 'object') {
    const cloneTarget = Array.isArray(target) ? [] : {};
    //start 
    if(map.get(target)){
      return target
    }
    map.set(target,cloneTarget);
    // end
    for(let i in target){
      cloneTarget[i] = deepclone_arr_self(target[i],map);
    }
    return cloneTarget;
  }else{
    return target;
  }
}

// forEach

function  forEach(arr,fn){
  let index = -1;
  while(++index < arr.length){
    fn(arr[index],index);
  }
}
// 优化for in
function deepclone_arr_self(target,map = new WeakMap()) {
  if(typeof target === 'object') {
    let isArray = Array.isArray(target);
    const cloneTarget = isArray ? [] : {};
    if(map.get(target)){
      return target
    }
    map.set(target,cloneTarget);
    const keys = isArray ? undefined : Object.keys(target);
    // keys是对象的键值数组，|| target是数组
    forEach(keys|| target,(value,key)=>{
      if(keys){
        key = value;
      }
      cloneTarget[key] = deepclone_arr_self(target[key],map);
    })    
    return cloneTarget;
  }else{
    return target;
  }
}

let obj = {
  a:1,
  b:2,
  c:{
    a:1,
    b:2,
    c:3,
    e:[{name:'wt'},{age:18}],
    d:{
      e:10,
      f:12
    }
  }
}
obj.obj = obj;
const newobj = deepclone_arr_self(obj);
console.log(newobj);



// 最一般的写法
function checkedType(target){
  return Object.prototype.toString.call(target).slice(8,-1);
}
function clone(target){
  let result, targetType = checkedType(target);
  if(targetType === 'object'){
    result = {}
  }else if(targetType === 'Array') {
    result = [];
  }else{
    return targetType;
  }
  for(let i in target) {
    let value = target[i];
    if(checkedType(value) === 'object' || checkedType(value) === 'Array') {
      result[i] = clone(value);
    }else{
      result[i] = value;
    }
  }
  return result;
}