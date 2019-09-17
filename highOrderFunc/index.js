function debounce(fn,wait){
  let timer = null;
  return function(...args){
    if(timer) clearTimeout(timer);
    timer = setTimeout(()=>{
      fn.apply(this,args)
    },wait)
  }
}


window.addEventListener('scroll',debounce((args)=>{
  console.log(args.target);
},100));


function debounce1(fn,wait,immediate){
  let timer = null;
  return function(...args){
    if(timer) clearTimeout(timer);
    if(immediate&& !timer){
      fn.apply(this, args);
    }
    timer = setTimeout(()=>{
      fn.apply(this,args)
    },wait)
  }
}

function throttle(fn,wait){
  let timer = null;
  let prev = 0;
  return function(...args){
    let now = Dote.now();
    if( now - prev > wait) {
      fn.apply(this,args);
      prev = now;
    }else {
      // 增强部分
      if(timer) clearTimeout(timer);
      timer = setTimeout(()=>{   
        prev = now;
        fn.apply(this,args);
      },wait)
    }
  }
}