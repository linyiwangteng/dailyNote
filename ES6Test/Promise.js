//三种状态：pending(进行中)、fulfilled(已成功)、rejected(已失败)

const getJSON = function(url) {
  const promise = new Promise(function(resolve,reject){
    const handler = function() {
      if(this.readyState !== 4) {
        return;
      }
      if(this.status === 200) {
        resolve(this.response);
      }else{
        reject(new Error(this.statusText));
      }
    }
    const client = new XMLHttpRequest();
    client.open("GET",url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept','application/json');
    client.send();
  })
  return promise;
}

getJSON('./post.json').then(res=>{
  // console.log(res);
  if(res.code == 200){
    return res.data
  }
}).then(res=>{
  console.log(res)
})

