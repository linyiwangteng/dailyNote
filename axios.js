// 接口模块封装
// axios二次封装

import axios from 'axios';
import router from '../router';
import {MessageBox,Message} from 'element-ui';

let loginUrl = '/login';

// 根据环境切换借口地址
axios.defaults.baseUrl = process.env_VUE_APP_API
axios.defaults.headers = {'X-Request-Width': 'XMLHttpRequest'}
axios.defaults.timeout = 60000

// 请求拦截器
axios.interceptors.request.use(
    config => {
        if(router.history.current.path != loginUrl) {
            let token = window.sessionStorage.getItem('token')
            if(token == null) {
                router.replace({path:loginUrl,query:{redirect:router.currentRoute.fullPath}})
                return false
            } else {
                config.headers['Authorization'] = 'JWT'+token
            }
        }
        return config
    }, error => {
        return Promise.reject(error)
    }
)

// 响应拦截器（即异常处理）
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if(error.response !== undefined) {
            switch(error.response.status) {
                case 400:
                    MessageBox.alert(error.response.data)
                    break;
                case 401:
                    if(window.sessionStorage.getItem('out') === null) {
                        window.sessionStorage.setItem('out',1)
                        MessageBox.confirm('会话已失效！请重新登录','提升',{
                            confirmButtonText:'重新登陆',
                            cancelButtonText:'取消',
                            type:'warning'
                        }).then( ()=>{
                            router.replace({path:loginUrl,query:{redirect:router.current.fullPath}})
                        } ).catch(action=>{
                            window.sessionStorage.clear()
                            window.localStorage.clear()
                        })
                    }
                    break;
                case 402:
                    MessageBox.confirm('登陆超时！','提示',{
                        confirmButtonText:'重新登陆',
                        cancelButtonText:'取消',
                        type:'warning'
                    }).then( ()=>{
                        router.replace({path:loginUrl,query:{redirect:router.current.fullPath}})
                    })
                    break;
                case 403:
                    MessageBox.alert('没有权限！')
                    break;
                default:
                    MessageBox.alert(`连接错误${error.response.status}`)
            }
            return Promise.resolve(error.response)
        }
        return Promise.resolve(error)
    }
)

// 导出基础请求类型封装

export default  {
    get(url,param) {
        if(param !== undefined) {
            Object.assign(param,{_t:(new Date().getTime())})
        }else {
            param  = { _t: (new Date().getTime())}
        }
        return new Promise( (resolve,reject) => {
            axios({method:'get',url,params:param}).then(res=> {
                resolve(res)
            })
        })
    },
    getData(url,param) {
        return new Promise( (resolve,reject) => {
            axios({method: 'get',url,params:param}).then( res => {
                if(res.code == 4000){
                    resolve(res.data)
                }else{
                    Message.warning(res.msg)
                }
            })
        })
    },
    post(url,param,config) {
        return new Promise( (resolve,reject) => {
            axios.post({url,params:param,config}).then(res=>{
                resolve(res)
            })
        })
    },
    put:axios.put,
    _delete:axios.delete
}