// 描述：有一家猎人工会，其中每个猎人都具有发布任务，订阅任务的功能，他们都有一个订阅列表来记录谁订阅了自己
function Hunter(name,level) {
  this.name = name;
  this.level = level;
  this.list = []
}

Hunter.prototype.publish = function(money){
  console.log(this.level + '猎人'+this.name +'寻求帮助');
  this.list.forEach(function(item,index){item(money)})
}

Hunter.prototype.subscribe = function(target,fn) {
  console.log(this.level +'猎人'+this.name+'订阅了'+target.name);
  target.list.push(fn);
}

let hunterMing = new Hunter('xiaoming','黄金');
let hunterJin = new Hunter('xiaojin','白银');
let hunterZhang = new Hunter('xiaozhang','黄金');
let hunterPeter = new Hunter('Peter','青铜');

hunterMing.subscribe(hunterPeter,function(money){
  console.log('小明表示：'+(money > 200 ? '':'暂时很忙，不能')+'给予帮助');
});

hunterJin.subscribe(hunterPeter,function(){
  console.log('小金表示：给予帮助');
})
hunterZhang.subscribe(hunterPeter,function(){
  console.log('小张表示：给予帮助');
})

hunterPeter.publish(198);
hunterPeter.publish(300);
