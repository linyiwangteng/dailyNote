var a = [];
for(let i = 0; i< 10;i++){
  // a[i] = function(){
  //   console.log(i);
  // }
  setTimeout(function(){
    console.log(i);
  },1)
}
// a[2]();
/**
 * 变量i是let声明的，当前的i只在本轮循环有效，所有每次循环的i其实都是一个新的变量
 * 
 * 如果每一轮循环的变量i都是重新声明的，那他怎么知道上一轮循环的值，从而计算出本轮循环的值？
 * 因为js引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。
 * for循环还有一个特别的地方，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
 * */ 

/**
 * 不存在变量提升
 * 暂时性死区
 * 不允许重复声明
 * */ 

 // 将对象彻底冻结
let constantize = (obj) =>{
  Object.freeze(obj);
  Object.keys(obj).forEach( (key,i)=>{
    if(typeof obj[key] === 'object') {
      constantize(obj[keys])
    }
  })
};

// ES6声明变量的六种方法
// var function let const Class import

