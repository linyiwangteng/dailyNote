function Parent(name,age){
  this. name = name;
  this.age = age;
}
Parent.prototype.say = function(){
  console.log(this.name + this.age)
}

function Child(name,age){
  Parent.call(this,name,age);
  this.date = new Date();
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Parent;
Child.prototype.selfsay = function(){
  this.say();
  console.log(this.date);
}



const obj ={
  first:'angle',
  last:'baby'
};
let key_val = Object.entries(obj);
console.info(key_val);

console.info(Reflect.get(obj,'first'));
Reflect.set(obj,'allname',`${obj.first} ${obj.last}`);
Reflect.has(obj,'allname');
Reflect.deleteProperty(obj,'allname');
let child = Reflect.construct(Child,['wt','18']);
console.log(Reflect.getPrototypeOf(child));

Reflect.setPrototypeOf(obj,new Parent('www','1'));
console.log(obj.name);
// Reflect.apply();
// Reflect.defineProperty(target,propertyKey,attributes);
// Reflect.getOwnPropertyDescriptor(target,propertyKey);
// Reflect.isExtensible();
// Reflect.preventExtensions(target);

console.log(Reflect.ownKeys(child));
console.log('-------------');

// 使用Proxy实现观察者模式
const queuedObservers = new Set();

const observe = fn =>queuedObservers.add(fn);
const observable = obj => new Proxy(obj,{set});

function set(target,key,value,receiver) {
  const result = Reflect.set(target,key,value,receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}

const person = observable({
  name:'initname',
  age:20
});
observe(function(){
  console.log(`${person.name},${person.age}`);
})
person.name = 'wtwtwt';
person.age = 22;