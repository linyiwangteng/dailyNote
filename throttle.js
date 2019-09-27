/**
 * 防抖函数 debounce 指的是某个函数在某段时间内，无论触发了多少次回调，都只执行最后一次。
 * 
 * 
 * 实现原理就是利用定时器，函数第一次执行时设定一个定时器，之后调用时发现已经设定过定时器就清空之前的定时器，
 * 并重新设定一个新的定时器，如果存在没有被清空的定时器，当定时器计时结束后触发函数执行。
 * */ 

// 实现 1
// fn 是需要防抖处理的函数
// wait 是时间间隔
function debounce(fn, wait = 50) {
    // 通过闭包缓存一个定时器 id
    let timer = null
    // 将 debounce 处理结果当作函数返回
    // 触发事件回调时执行这个返回函数
    return function(...args) {
      	// 如果已经设定过定时器就清空上一次的定时器
        if (timer) clearTimeout(timer)
      
      	// 开始设定一个新的定时器，定时器结束后执行传入的函数 fn
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}
function debounce1(fn,wait = 50) {
    let timer = null;
    return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            fn.apply(this,args);
        },wait)
    }
}
// DEMO
// 执行 debounce 函数返回新函数
const betterFn = debounce(() => console.log('fn 防抖执行了'), 1000)
// 停止滑动 1 秒后执行函数 () => console.log('fn 防抖执行了')
document.addEventListener('scroll', betterFn)

// 上述实现方案已经可以解决大部分使用场景了，不过想要实现第一次触发回调事件就执行 fn 有点力不从心了，这时候我们来改写下 debounce 函数，加上第一次触发立即执行的功能。


// 实现 2
// immediate 表示第一次是否立即执行
function debounce(fn, wait = 50, immediate) {
    let timer = null
    return function(...args) {
        if (timer) clearTimeout(timer)
      
      	// ------ 新增部分 start ------ 
      	// immediate 为 true 表示第一次触发后执行
      	// timer 为空表示首次触发
        if (immediate && !timer) {
            fn.apply(this, args)
        }
      	// ------ 新增部分 end ------ 
      	
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}
// DEMO
// 执行 debounce 函数返回新函数
const betterFn = debounce(() => console.log('fn 防抖执行了'), 1000, true)
// 第一次触发 scroll 执行一次 fn，后续只有在停止滑动 1 秒后才执行函数 fn
document.addEventListener('scroll', betterFn)


/**
 * 现在考虑一种情况，如果用户的操作非常频繁，不等设置的延迟时间结束就进行下次操作，会频繁的清除计时器并重新生成，
 * 所以函数 fn 一直都没办法执行，导致用户操作迟迟得不到响应。
 * 有一种思想是将「节流」和「防抖」合二为一，变成加强版的节流函数，关键点在于「 wait 时间内，可以重新生成定时器，
 * 但只要 wait的时间到了，必须给用户一个响应」。这种合体思路恰好可以解决上面提出的问题。
 * */



// ****增强版的throttle****

function throttle(func,wait = 50){
    // previous 是上一次执行 fn 的时间
    // timer 是定时器
    var previous = 0, timer = null;
    // 将 throttle 处理结果当作函数返回
    return function(...args){
        console.log(args);
        let now = Date.now();
        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔
        if(now - previous < wait) {
            if(timer)  clearTimeout(timer);
            timer = setTimeout(() => {
                // 如果小于，则为本次触发操作设立一个新的定时器
                // 定时器时间结束后执行函数 fn 
                // ** 只有定时器执行以后previous才会附上新值，所以才能保证存在now - previous > wait的情况
                previous = now;
                func.apply(this,args);
            }, wait);
        }else{
            // 第一次执行
            // 或者时间间隔超出了设定的时间间隔，执行函数 fn
            previous = now;
            func.apply(this,args)
        }
    }
}


/**
 * 小结：
 * 
 * 函数节流和防抖都是「闭包」、「高阶函数」的应用
 * 
 * 函数节流 throttle 指的是某个函数在一定时间间隔内（例如 3 秒）执行一次，在这 3 秒内 无视后来产生的函数调用请求
 * 
 * 节流可以理解为养金鱼时拧紧水龙头放水，3 秒一滴
 *
 *「管道中的水」就是我们频繁操作事件而不断涌入的回调任务，它需要接受「水龙头」安排
 *「水龙头」就是节流阀，控制水的流速，过滤无效的回调任务
 *「滴水」就是每隔一段时间执行一次函数
 * 「3 秒」就是间隔时间，它是「水龙头」决定「滴水」的依据
 * 
 * 应用：监听滚动事件添加节流函数后，每隔固定的一段时间执行一次
 * 实现方案 1：用时间戳来判断是否已到执行时间，记录上次执行的时间戳，然后每次触发后执行回调，
 判断当前时间距离上次执行时间的间隔是否已经达到时间差（Xms） ，如果是则执行，并更新上次执行的时间戳，如此循环
 实现方案 2：使用定时器，比如当 scroll 事件刚触发时，打印一个 hello world，然后设置个 1000ms 的定时器，此后每次触发 scroll 事件触发回调，如果已经存在定时器，则回调不执行方法，直到定时器触发，handler 被清除，然后重新设置定时器

*函数防抖 debounce 指的是某个函数在某段时间内，无论触发了多少次回调，都只执行最后一次
*
*防抖可以理解为司机等待最后一个人进入后再关门，每次新进一个人，司机就会把计时器清零并重新开始计时

上车的乘客」就是我们频繁操作事件而不断涌入的回调任务
「1 分钟」就是计时器，它是司机决定「关门」的依据，如果有新的「乘客」上车，将清零并重新计时
「关门」就是最后需要执行的函数

应用：input 输入回调事件添加防抖函数后，只会在停止输入后触发一次
实现方案：使用定时器，函数第一次执行时设定一个定时器，之后调用时发现已经设定过定时器就清空之前的定时器，并重新设定一个新的定时器，如果存在没有被清空的定时器，当定时器计时结束后触发函数执行

作者：木易杨说
链接：https://juejin.im/post/5cfe66fa6fb9a07ee1691ddb
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 *  */ 