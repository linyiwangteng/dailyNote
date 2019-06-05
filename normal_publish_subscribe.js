class Subscribe {
  constructor(){
    super()
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
  unsubscribe(){
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

