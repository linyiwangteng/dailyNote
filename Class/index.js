class Point {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  toString(){
    return '('+this.x+','+this.y+')'
  }
}

console.log(typeof Point);



console.log(Point.prototype)
console.log(Point === Point.prototype.constructor); //true

const p = new Point(1,2);
console.log(p.constructor === Point); //true
console.log(p.constructor === Point.prototype.constructor); //true
console.log(p.constructor.prototype.constructor == Point)


/**
 * 构造函数的prototype属性，在ES6的类上面继续存在。事实上，类的所有方法都是定义在类的prototype属性上面的。
 * p.constructor === Point.prototype.constructor
 * p是B的实例，p的constructor方法就是Point类原型的constructor方法。
 * 类的内部所有定义的方法都是不可枚举的。
 * Object.keys(Point.prototype) // []
 * Object.getOwnPropertyName(Point.prototype) // [constructor,toString]
 * */ 

 console.log(Object.getOwnPropertyNames(Point.prototype))

 console.log(p.__proto__.hasOwnProperty('toString'))

 console.log(p.__proto__);
 console.log(Object.getPrototypeOf(p));
/**
 * 可以通过实例的__proto__属性为"类"添加方法。
 * __proto__并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，
 * 虽然目前很多现代浏览器的js引擎都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。
 * 生产环境中，我们可以使用Object.getPrototypeOf()方法来获取实例对象的原型，然后再来为原型添加方法/属性。
 * 
 * */  

 class Obj {
   constructor() {
     this.getThis = () => this;
   }
 }
 const myObj = new Obj();
 console.log(myObj.getThis() == myObj)
/**
 * 箭头函数内部的this总是指向定义时所在的对象。
 * */ 

 class Logger{
   constructor(){
     
   }
 }
 function selfish(target){
   const cache = new WeakMap();
   const handler = {
     get(target,key) {
       const value = Reflect.get(target,key);
       if(typeof value !== 'function') {
         return value;
       }
       if(!cache.has(value)) {
         cache.set(value,value.bind(target));
       }
       return cache.get(value);
     }
   };
   const proxy = new Proxy(target,handler);
   return proxy;
 }

 const logger = selfish(new Logger());





 
 function mix(...mixins) {
   class Mix {
     constructor() {
       for(let mixin of mixins) {
         copyProperties(this,new mixin()) //拷贝实例属性
       }
     }
   }
   for(let mixin of mixins) {
     copyProperties(Mix,mixin); //拷贝静态方法
     copyProperties(Mix,mixin.prototype); //拷贝原型属性
   }
   return Mix;
 }

function copyProperties(target,source) {
  for(let key of Reflect.ownKeys(source)) {
    if(key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      let desc = Obj.getOwnPropertyDescriptor(source,key);
      Obj.defineProperty(target,key,desc);
    }
  }
}