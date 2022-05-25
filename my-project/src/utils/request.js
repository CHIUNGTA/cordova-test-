import axios from 'axios'
import store from '@/store'
const service = axios.create({
  // baseURL: import.meta.env.VITE_API_URL ,
  baseURL: process.env.VUE_APP_BASE_API||'http://140.134.122.123:3002/api/',
  timeout: 30000,
})
service.interceptors.request.use(config => {
  config['Content-Type'] = 'application/json'
  config['Access-Control-Allow-Origin']= '140.134.122.123'
  return config
})
service.interceptors.response.use(response => {
  const res = response.data
  if (res.statusCode === 200) {
    return res
  } else if (res.statusCode === 401) {
  } 
  if(res!== undefined){ // mockoon 臨時使用
    return res
  }
  console.log(res.message || '發生錯誤')
  console.log(response)
  return Promise.reject(new Error(res.message || '發生錯誤'))
}, err => {
  console.error(err)
  if (err.indexOf('timeout') >= 0) {
    console.log('網路不穩請再試一次。')
  } else {
    console.log(err)
  }
  return Promise.reject(new Error('發生未知的錯誤'))
})

export default service
