// import axios from 'axios';
const axios = require('axios');
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('http://yapi.demo.qunar.com/mock/7686/info/userInfo').then(res=>{
  console.log(res.data);
})

axios.get('http://yapi.demo.qunar.com/mock/7686/info/userInfo', {
  cancelToken: source.token
}).then(res=>{
  console.log(res.data);
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});



// axios.post('/user/12345', {
//   name: 'new name'
// }, {
//   cancelToken: source.token
// })

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');