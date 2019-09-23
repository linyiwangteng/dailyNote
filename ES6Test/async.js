const fs = require('fs');
const path = require('path');
function readFile(filePath) {
  return new Promise(function(resolve,reject){
    fs.readFile(filePath,function(error,data){
      if(error) return reject(error);
      resolve(data);
    })
  })
}

async function asyncReadFile(){
  const f1 = await readFile(path.resolve(__dirname,'./jiegou.js'));
  const f2 = await readFile(path.resolve(__dirname,'./post.json'));
  console.log(__dirname)
  console.log(f1.toString());
  console.log(f2.toString());
}

// 内置执行器
// 更好的语义
// 更广的适用性  co模块约定，yield命令后面只能是Thunk函数或者Promise对象，而async函数的await命令后面，可以是Promise对象和原始类型的值。
// 返回值是promise ，Generator函数的返回值是Iterator对象。

// async函数完全可以看成多个异步操作，包装成的一个Promise对象，而await命令就是内部then命令的语法糖。

// async函数返回一个Promise对象，可以使用then方法添加回调函数。
// async函数内部return语句返回的值，会成为then方法回调函数的参数。
// async函数内部抛出错误，会导致返回的Promise对象变成reject状态。抛出的错误对象会被catch方法回调函数接收到。

async function f(){
  return 'hello world'
}
f().then(res=>{
  console.log(res);
});
// await命令
// 正常情况下，await命令后面是一个Promise对象，返回该对象的结果。如果不是Promise对象，就直接返回对应的值。
// 另一种情况，await命令后面是一个thenable对象（即定义了then方法的对象），那么await会将其等同于Promise对象。

function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve,interval)
  })
}
async function one2FiveInAsync(){
  for(let i= 0; i<5; i++){
    console.log(i);
    await sleep(1000).then(()=>{console.log('sleep'+i+'次')});
  }
}

one2FiveInAsync()