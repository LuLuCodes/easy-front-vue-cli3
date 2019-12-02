import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
Vue.use(Router);

let routes = [
  {
    path: '/',
    redirect: '/login'
  }
];

const routerContext = require.context('./', true, /index\.js$/);
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return;
  }
  const routerModule = routerContext(route);
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = [...routes, ...(routerModule.default || routerModule)];
});

export default new Router({
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    // keep-alive 返回缓存页面后记录浏览位置
    if (savedPosition && to.meta.keepAlive && store.state.keepAliveInclude.includes(to.name)) {
      return savedPosition;
    }
    // 异步滚动操作
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({x: 0, y: 1});
      }, 0);
    });
  }
});
