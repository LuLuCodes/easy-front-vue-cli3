import axios from 'axios';
import router from '../router';
const service = axios.create({
  // 设置超时时间
  timeout: 6000,
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true
});
service.defaults.headers.post['Content-Type'] = 'application/json';
service.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
service.interceptors.request.use(config => {
  // 可以在请求先展示加载框

  // 请求头带token
  // const authToken = window.localStorage.getItem('authToken');
  // if (authToken) {
  //   config.headers['Authorization'] = `Bearer ${authToken}`;
  // }
  return config;
}, (error) => {
  return Promise.reject(error);
});
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use(response => {
  // 请求响应后关闭加载框

  const responseCode = response.status;
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (responseCode === 200) {
    // if (response.data.Data && response.data.Data.authToken) {
    //   window.localStorage.setItem('authToken', response.data.Data.authToken);
    // }
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
}, error => {
  // 请求响应后关闭加载框

  // 断网 或者 请求超时 状态
  if (!error.response) {
    // 请求超时状态
    if (error.message.includes('timeout')) {
      // console.log('亲，网络不给力啊悲剧(＞﹏＜)');
      return Promise.reject(new Error('亲，网络不给力啊悲剧(＞﹏＜)'));
      // 消息提示框
    } else {
      // 可以展示断网组件
      return Promise.reject(new Error('亲，网络似乎出了点问题ㄟ( ▔, ▔ )ㄏ'));
      // console.log('亲，网络似乎出了点问题ㄟ( ▔, ▔ )ㄏ');
      // 消息提示框
    }
  }
  // 服务器返回不是 2 开头的情况，会进入这个回调
  // 可以根据后端返回的状态码进行不同的操作
  const responseCode = error.response.status;

  switch (responseCode) {
    case 401: // 401：未登录
    case 403: // 403: token过期
      // 弹出错误信息
      // window.localStorage.removeItem('authToken');
      // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
      setTimeout(() => {
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        });
      }, 1000);
      break;
      // 404请求不存在
    case 404:
      break;
      // 其他错误，直接抛出错误提示
    default:
  }
  return Promise.reject(error);
});

export default service;

export const uploadFile = formData => {
  const res = service.request({
    method: 'post',
    url: '/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res;
};
