import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import 'vant/lib/index.css';
import common from '@/utils/common'; // 全局方法
import filters from '@/utils/filters'; // 全局过滤器
import '@/utils/permission'; // 路由守卫
import VueLazyload from 'vue-lazyload'; // 图片懒加载
import './components';
import FastClick from 'fastclick'; // 解决300毫秒问题，PC端不需要
FastClick.attach(document.body);

Vue.use(Vant);
Vue.use(VueLazyload, {
  loading: '//image.lancky.com/assets/images/lazy-load/ljs/list.jpg?v=2',
  error: '//image.lancky.com/assets/images/lazy-load/ljs/list.jpg?v=2',
  listenEvents: ['scroll', 'resize', 'animationend', 'transitionend'],
  attempt: 1
});

// 注册全局过滤器
for (const key in filters) {
  Vue.filter(key, filters[key]);
}

Vue.use(common); // 注册全局方法

Vue.config.productionTip = false;

// 检查是否登录
// router.beforeEach(async(to, from, next) => {
//   const token = await store.dispatch('postData', {
//     url: '/user/get-auth-token',
//     data: {}
//   });
//   if (to.path !== '/login' && !token) {
//     return next('/login');
//   } else if (to.path === '/login' && token) {
//     return next('/home');
//   } else {
//     next();
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
