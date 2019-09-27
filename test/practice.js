function debounce(fn,delay,immediate = false){
  let timer = null;
  return function(...args){
    if(immediate){
      fn.apply(this,args);
      immediate = false;
    }
    if(timer){clearTimeout(timer)};
    timer = setTimeout(()=>{
      console.log(this);
      fn.apply(this,args);
    },delay)
  }
}

function throttle(fn,delay){
  let prev = 0;
  let flag = true;
  return function(...args){
    if(!flag) return;
    flag = false;
    timer = setTimeout(()=>{
      flag = true;
      fn.apply(this,args)
    },delay)
    
  }
}

function throttle2(fn,delay){
  let prev = 0,timer = null;
  return function(...args){
    let now = Date.now();
    if(now - prev > delay) {
      fn.apply(this,args);
      prev = now;
    }else{
      if(timer) clearTimeout(timer);
      timer = setTimeout(()=>{
        prev = now;
        fn.apply(this,args);
      },delay);
    }
  }
}

// window.onscroll = throttle(function(){
//   console.log(123123);
// },400,true);

function deeplone(obj,map = new WeakMap()){
  if(typeof obj === 'object'){
    let target = Array.isArray(obj) ? [] : {};
    if(map.get(obj)){
      return obj;
    }
    map.set(obj,target);
    for(let key in obj) {
      target[key] = deeplone(obj[key]);
    }
    return target;
  }else{
    return obj;
  }
}

class EventEmitter{
  constructor(){
    this._events = this._events || new Map();
    this._maxListeners = this._maxListeners || 0;
  }
  emit(type,...args){
    let handler = this._events.get(type);
    if(handler){
      handler.map(item => {
        item.apply(this,args);
      })
    }
    return true;
  }
  addLinster(type,func){
    if(!this._events.get(type)){
      this._events.set(type,[]);
    }
    this._events.get(type).push(func);
  }
}

function instance_of(L,R) {
  var O = R.prototype;
  L = L.__proto__;
  while(true){
    if(L === null) return false;
    if(O === L) {
      return true;
    }
    L = L.__proto__;
  }
}

var a = {a:1,b:2}
console.log(instance_of(a,Object));


Function.prototype.myapply = function(context,arr){
  var context = Object(context) || window;
  context.fn = this;
  var result;
  if(!arr){
    result = context.fn();
  }else{
    var args = [];
    arr.forEach((item,key)=>{
      args.push("arr["+key+"]");
    });
    result = eval("context.fn("+args+")");
  }
  delete context.fn;
  return result;
}