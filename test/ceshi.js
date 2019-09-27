// const curry = fn=>x=>y=>z=>fn(x,y,z);
// function add(...args) {
//   const sum = args.reduce((prev,next)=>{
//     return prev + next;
//   },0);
//   return sum;
// }

// console.log(curry(add)(1)(2)(3));

// function curry2(fn){
//   const arr = [];
//   const f = function(){
//     arr.push(...arguments);
//     return f;
//   }
//   f.toString = function() {
//    return fn(...arr);
//   }
//   return f;
// }
// console.log(curry2(add)(1)(2)(3));

// function add (){
//   var arr = Array.prototype.slice.call(arguments)
//   var f = function (){
//     arr.push(...arguments)
//     return f
//   }
//   f.toString = function(){
//     return arr.reduce((a, b) => a + b)
//   }
//   return f
// }


// setTimeout(() => {
//   console.log(1);
//   new Promise((resolve,reject)=>{
//     console.log(2);
//     resolve();
//   }).then(()=>{
//     console.log(3)
//   })
// });

// setTimeout(() => {
//   console.log(4);
//   new Promise((resolve,reject)=>{
//     console.log(5);
//     resolve();
//   }).then(()=>{
//     console.log(6)
//   })
// });


// ---------------------
function sleep(time) {
  let startTime = new Date();
  while (new Date() - startTime < time) {}
  console.log('<--Next Loop-->');
}

setTimeout(() => {
  console.log('timeout1');

  setTimeout(() => {
      console.log('timeout3');
      sleep(1000);
  });
  new Promise((resolve) => {
      console.log('timeout1_promise');
      resolve();
  }).then(() => {
      console.log('timeout1_then');
  });
  
  sleep(1000);
});
   
setTimeout(() => {
  console.log('timeout2');
  setTimeout(() => {
      console.log('timeout4');
      sleep(1000);
  });
  new Promise((resolve) => {
      console.log('timeout2_promise');
      resolve();
  }).then(() => {
      console.log('timeout2_then');
  });
  sleep(1000);
});