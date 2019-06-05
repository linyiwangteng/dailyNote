function connectWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
  } else {
      document.addEventListener(
          'WebViewJavascriptBridgeReady'
          , function() {
              callback(WebViewJavascriptBridge)
          },
          false
      );
  }
}
connectWebViewJavascriptBridge(function(bridge) {
  bridge.init(function(message, responseCallback) {
      // console.log('JS got a message', message);
      document.getElementById("init").innerHTML = ("data from Java: = " + message);
      var data = {
          'Javascript Responds': '测试中文!'
      };
      if (responseCallback) {
          console.log('JS responding with', data);
          responseCallback(data);
      }
  });

  bridge.registerHandler("functionInJs", function(data, responseCallback) {
      document.getElementById("show").innerHTML = ("data from Java: = " + data);
      if (responseCallback) {
          var responseData = {a:1,b:2,c:3};
          responseCallback(responseData);
      }
  });
  bridge.registerHandler('funName',function(data,responseCallback){
    // 客户端传递过来数据
    // 通过回调方法回调给客户端
  })
});
