var YouzanJsBridge = {
    doCall: function(functionName, data, callback) {
        var _this = this;
        // 解决连续调用问题
        if (this.lastCallTime && (Date.now() - this.lastCallTime) < 100) {
            setTimeout(function() {
                _this.doCall(functionName, data, callback);
            }, 100);
            return;
        }
        this.lastCallTime = Date.now();
    
        data = data || {};
        if (callback) {
            $.extend(data, { callback: callback });
        }
    
        if (UA.isIOS()) {
            $.each(data, function(key, value) {
                if ($.isPlainObject(value) || $.isArray(value)) {
                    data[key] = JSON.stringify(value);
                }
            });
            var url = Args.addParameter('youzanjs://' + functionName, data);
            var iframe = document.createElement('iframe');
            iframe.style.width = '1px';
            iframe.style.height = '1px';
            iframe.style.display = 'none';
            iframe.src = url;
            document.body.appendChild(iframe);
            setTimeout(function() {
                iframe.remove();
            }, 100);
        } else if (UA.isAndroid()) {
            window.androidJS && window.androidJS[functionName] && window.androidJS[functionName](JSON.stringify(data));
        } else {
            console.error('未获取platform信息，调取api失败');
        }
    },

    doCallMe: function(functionName, data, callback) {
        var _this = this;
        if(this.lastCallTime && (Date.now() - this.lastCallTime) < 100) {
            setTimeout(function() {
                _this.doCall(functionName,data,callback)
            },100);
            return;
        }
        this.lastCallTime = Date.now();
        data = data || {};
        if(callback) {
            $.extend(data,{callback:callback});
        }
        if(UA.isIOS) {
            $.each(data,function(key,value) {
                if($.isPlainObject(value) || $.isArray(value)) {
                    data[key] = JSON.stringify(value);
                }
            });
            var url = Args.addParameter('youzanjs://' + functionName, data);
            var iframe = document.createElement('iframe');
            iframe.style.width = '1px';
            iframe.style.height = '1px';
            iframe.style.display = 'none';
            iframe.src = url;
            document.body.appendChild(iframe);
            setTimeout(function() {
                iframe.remove();
            }, 100);
        }else if(UA.isAndroid()){
            window.androidJS && window.androidJS[functionName] && window.androidJS[functionName](JSON.stringify(data));
        }else{
            console.error('未获取platform信息，调取api失败')
        }
    },
    consoleThis:function(){
        console.log(this)
    }
}


