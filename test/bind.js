if(!Function.prototype.bind){
  Function.prototype.bind = function(oThis) {
    if(typeof this !== 'function') {
      throw new TypeError('Function.prototype.bind -  what is trying to be bound is not callable');
    }
    var aArgs = Array.prototype.slice.call(arguments,1),
        fToBind = this,
        fNOP = function(){};
        fBound = function(){
          return fToBind.apply(this instanceof fBound ? this : oThis , aArgs.concat(Array.prototype.slice.call(arguments)) );
        }
    if(this.prototype){
      fNOP.prototype = this.prototype
    }
    fBound.prototype = new fNOP();
    return fBound;
  }
}

Function.prototype.binds = function(oThis,...args1){
  if(typeof this !== 'function'){
    throw new TypeError('');
  }
  const fToBind = this,
        fNOP = function(){},
        fBound = function(...args2){
          return fToBind.apply(this instanceof fBound ? this : oThis, [...args1,...args2])
        }
  if(this.prototype){
    fNOP.prototype = this.prototype;
  }
  fBound.prototype = new fNOP();
  return fBound;
}

function aa(){
  console.log(arguments);
  console.log(this.a,this.b);
}
const obj = {
  a:11,
  b:22
};
const aaa = aa.binds(obj);
aaa(4,5,6);


Function.prototype.bind = function(oThis,...args1){
  if(typeof this !== 'function'){
    throw new TypeError('类型错误');
  }
  let fBound = this;
  let fn = function(){}
  let fToBind = function(...args2){
   return fBound.apply(this instanceof fBound ? this : oThis,[...args1,...args2])
  }
  if(this.prototype){
    fToBind.prototype = this.prototype
  }
  fToBind.prototype = new fn();
  return fToBind;
}