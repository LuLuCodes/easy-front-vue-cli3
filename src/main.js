import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
import '@/plugins/vant'; // 全局引入按需引入UI库 vant
import common from '@/utils/common'; // 全局方法
import filters from '@/utils/filters'; // 全局过滤器
import '@/utils/permission'; // 路由守卫
import vueTitle from 'vue-wechat-title';
import Op from './utils/condition-operator';

// import VueLazyload from 'vue-lazyload'; // 图片懒加载
import './components';

Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.prototype.$Op = Op;

// vant自带了图片懒加载，其他UI库可以放开
// Vue.use(VueLazyload, {
//   loading: '//image.lancky.com/assets/images/lazy-load/ljs/list.jpg?v=2',
//   error: '//image.lancky.com/assets/images/lazy-load/ljs/list.jpg?v=2',
//   listenEvents: ['scroll', 'resize', 'animationend', 'transitionend'],
//   attempt: 1
// });

// 注册全局过滤器
for (const key in filters) {
  Vue.filter(key, filters[key]);
}
Vue.use(vueTitle);
Vue.use(common); // 注册全局方法

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
