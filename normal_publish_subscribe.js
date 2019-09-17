class Subscribe {
  constructor(){
    this.topics = {};
    this.subUid = -1;
  }
  publish(topic, args){
    if(!this.topics[topic]){
      return false
    }
    var subscribers = this.topics[topic],
        len = subscribers ? subscribers.length : 0;
    while (len--) {
        subscribers[len].func( args );
    }
  }
  subscribe( topic, func){
    if(!this.topics[topic]){
      this.topics[topic] = [];
    }
    var token = ( ++this.subUid ).toString();
    topics[topic].push({
        token: token,
        func: func
    });
  }
  unsubscribe(topken){
    for ( var m in this.topics ) {
      if ( this.topics[m] ) {
          for ( var i = 0, j = this.topics[m].length; i < j; i++ ) {
              if ( this.topics[m][i].token === token ) {
                  this.topics[m].splice( i, 1 );
                  // return token;
              }
          }
      }
    }
  }
}

class Subscribe1 {
  constructor(){
    this.topics = {};
    this.subUid = -1;
  }
  // 订阅者
  subscribe(topic,func) {
    if(!this.topics[topic]){
      this.topics[topic] = [];
    }
    let token = (++this.subUid).toString();
    this.topics[topic].push({
      token,
      func
    });
  }
  publisher(topic,...args){
    if(!this.topics[topic]){
      return false;
    }
    this.topics[topic].map(item=>{
      item.func.apply(this,args)
    })
  }
  unsubscribe(topic) {
    if(!this.topics[topic]){
      return false;
    }
    delete this.topics[topic]
  }
  unAllSubscribe(){
    this.topics = {};
  }
}

var  a = new Subscribe1();

a.subscribe('add',function(...args){
  let sum = args.reduce((baseItem,currentItem)=>{
    return baseItem+currentItem
  },1000);
  console.log(sum);
})
a.subscribe('add',function(...args){
  console.log('add other a thing');
  console.log(args);
});
a.subscribe('sub',function(){
  console.log('123123');
});
a.subscribe('cheng',function(){
  console.log('this is a chengfa method')
});
a.subscribe('chu',function(){
  console.log('this is a chu method')
})
a.publisher('add',1,2,3,4,5,6);
a.publisher('chu');
a.unsubscribe('chu');
a.publisher('chu');
a.publisher('cheng');