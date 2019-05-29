// 定义一家猎人工会
// 主要功能包括任务发布大厅（topic），以及订阅任务（subscribe），发布任务（publish）


let HunterUnion = {
  type:"hunt",
  topics:Object.create(null),
  subscribe:function(topic,fn) {
    if(!this.topics[topic]){
      this.topics[topic] = []; 
    }
    this.topics[topic].push(fn);
  },
  publish:function(topic,money) {
    if(!this.topics[topic]){
      return
    }
    for(let fn of this.topics[topic]){
      fn(money)
    }
  }
}

function Hunter(name,level) {
  this.name = name;
  this.level = level;
}
const NAME = '猎人', DOTHING = '订阅了狩猎', GETHING = '发布了狩猎';
Hunter.prototype.subscribe = function(topic,fn){
  console.log(this.level+NAME+this.name+DOTHING+topic+'的任务');
  HunterUnion.subscribe(topic,fn)
}
Hunter.prototype.publish = function(topic,money){
  console.log(this.level+NAME+this.name+GETHING+topic+'的任务');
  HunterUnion.publish(topic,money)
}


let hunterMing = new Hunter('xiaoming','黄金');
let hunterJin = new Hunter('xiaojin','白银');
let hunterZhang = new Hunter('xiaozhang','黄金');
let hunterPeter = new Hunter('Peter','青铜');

hunterMing.subscribe('tiger',function(money){
  console.log('小明表示：'+(money > 200 ? '':'不')+'接收任务');
});
hunterJin.subscribe('tiger',function(money){
  console.log('小金表示：接收任务');
});

hunterZhang.subscribe('sheep',function(money){
  console.log('小张以'+money+'接收了sheep任务');
})

hunterPeter.publish('tiger',190);
hunterPeter.publish('sheep',20);


// 猎人们发布（发布者）或订阅（观察者/订阅者）任务都是通过猎人工会（调度中心）关联起来的，他们没有直接的交流。