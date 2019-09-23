// (function test() {
//     setTimeout(function() { console.log(1) }, 0); 
//     new Promise(function(resolve) {
//         console.log(2);
//         for (var i = 0; i < 10000; i++) {
//             i == 9999 && resolve();
//         }
//         console.log(3);
//     }).then(function() { 
//         console.log(4);
//         new Promise(function(resolve) {
//             setTimeout(function() { 
//                 resolve();
//                 console.log(5);
//             }, 0);
//             console.log(6);
//         }).then(function() {
//             console.log(7); 
//         });
//     });
//     console.log(8);
//     return 9;
// })()

// 2 3 8 4 6 1 5 7

// 2 3 8 4 6 1 5 7

// let URL = 'http://www.bd.com?a=1&b=2&c=10';
// function query(url){
//   let params = url.split("?")[1].toString().split("&");
//   let obj = {};
//   for(let i = 0; i < params.length;i++) {
//     let key_val = params[i].split("=");
//     obj[key_val[0]] = key_val[1]
//   }
//   return obj;
// }
// let querys = query(location.href);
// console.log(querys);

function _new(){
  let target = {};
  let [constructor, ...args] = [...arguments];
  // target.__proto__ = constructor.prototype;
  Object.setPrototypeOf(target,constructor.prototype);
  let result = constructor.apply(target,args);
  if(result && (typeof result === 'object' || typeof result === 'function')){
    return result
  }
  return target;
}

function Person(a,b,c){
  this.a = a;
  this.b = b;
  this.c = c;
}
Person.prototype.saya = function(){
  console.log(this.a);
}
Person.prototype.sayb = function(){
  console.log(this.a,this.b);
}
console.log(Person);
let person = _new(Person,1,2,3);
person.saya();
person.sayb();
console.log('------');

function Parent(a,b){
  this.a = a;
  this.b = b;
}
Parent.prototype.setC = function(c){
  this.c = c;
}

function Child(a,b){
  Parent.call(this,a,b);
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Parent;

Child.prototype.sayd = function(d){
  this.d = d;
}

// let child = new Child(1,2);
// child.setC(3);
// child.sayd(4);
// console.log(child.a,child.b,child.c,child.d);
 