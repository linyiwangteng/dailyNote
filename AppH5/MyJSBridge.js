var UA = {
  isAndroid(){
    var UA = window.navigator.userAgent;
    return UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1;
  
  },
  isIOS(){
    var UA = window.navigator.userAgent;
    return !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  }
}
var JsBridge = {
  doCall:function(functionName,data,callback){
    var _this = this;
    if(this.lastCallTime && (Date.now() - this.lastCallTime) < 100) {
      setTimeout(function(){
        _this.doCall(functionName,data,callback);
      },100);
      return;
    }
    this.lastCallTime = Date.now();
    data = data || {};
    if(callback) {
      if(Object.assign){
        data = Object.assign({},data,{callback:callback});
      }else{
        data = JSON.parse(JSON.stringify(data));
        data.callback = callback; 
      }
    }
    if(UA.isAndroid()) {
      window.mobile && window.mobile[functionName] && window.mobile[functionName](JSON.stringify(data));
    }else if(UA.isIOS()) {
      console.warn('waiting development');
    }
  }
}






