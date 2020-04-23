// 路由首位
import router from '@/router';
import store from '@/store';

const whiteList = ['/login']; // 不重定向白名单

// 检查是否登录
router.beforeEach(async (to, from, next) => {
  const token = await store.dispatch('postData', {
    url: '/user/get-auth-token',
    data: {}
  });
  if (to.path !== '/login' && !token) {
    if (whiteList.includes(to.path)) {
      return next();
    } else {
      return next('/login');
    }
  } else if (to.path === '/login' && token) {
    return next('/home');
  } else {
    next();
  }
});

// router.afterEach(() => {});
