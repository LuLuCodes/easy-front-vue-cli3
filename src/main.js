import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './components';
import './registerServiceWorker';

Vue.config.productionTip = false;

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
