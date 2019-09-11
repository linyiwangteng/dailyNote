/**
 * 分时函数
 * @ary {Arry} 数据
 * @callback {Function} 回掉函数，一个参数，当前数据项
 * @count {Number} 数量
 * 
 * */



function timeChunk(ary,callback,count){
  var objTs=Object.prototype.toString,//检测类型
  t;//定时器
  if(objTs.call(ary)!=="[object Array]"){
      return console.warn(ary+"---》应该是Arry类型");
  }
  if(objTs.call(callback)!=="[object Function]"){
      return console.warn(callback+"---》应该是回掉函数");
  }
  if(objTs.call(count)!=="[object Number]"){
      return console.warn(count+"---》应该是Number类型");
  }
  //开始执行函数    
  function start(){
      //Math.min()决定取count数量的arr进行callback处理 
      for(var i=0;i<Math.min(count||1,ary.length);i++){
          callback(ary.shift());
      }
  }
  return function(){
      t=setInterval(function(){
          if(ary.length===0){
              return clearInterval(t);
          }
          start();
      },200);
  }
}
//后端返回数据

var ayy=[];
for (var a=0;a<50000;a++) {
  ayy.push(a);
}
//开始使用 分时函数
var init=timeChunk(ayy,function(i){
  var span=document.createElement("span");
  span.innerHTML = i;
  app.appendChild(span);
},500);
//开始渲染大数据
init();