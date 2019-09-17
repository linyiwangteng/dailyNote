var books = {};

Object.defineProperties(books,{
  _year:{
    configurable:true,
    enumerable:true,
    writable:true,
    value:10
  },
  name:{
    value:'this is a book'
  },
  year:{
    get:function(){
      return this._year
    },
    set:function(_newval){
      if(_newval>5){
        this._year = _newval
      }
    }
  }
})


console.log(books);
books.year = 20;
console.log(Object.keys(books));
const descriptor = Object.getOwnPropertyDescriptor(books,'year');
console.log(descriptor);




// 简单回顾一下构造函数、原型和实例的关系：
// 每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型
//对象的内部指针。

function SuperType(){
  this.superProperty = true;
}
SuperType.prototype.getSuperValue = function() {
  return this.superProperty;
}
// 构造函数的原型对象
console.log(SuperType.prototype);


function SubType() {
  SuperType.call(this);
  this.subProperty = false;
}
// SubType.prototype = new SuperType();
 SubType.prototype = Object.create(SuperType.prototype);
 SubType.prototype.constructor = SubType;

SubType.prototype.getSubValue = function (){
  return this.subproperty;
};
// 实例化
var instance = new SubType();
console.log(instance.getSuperValue());


