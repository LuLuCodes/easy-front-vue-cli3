// 路由首位
import router from '@/router';
// import store from '@/store';

const whiteList = ['/login']; // 不重定向白名单

// 检查是否登录
router.beforeEach(async (to, from, next) => {
  // 开发时请放开注释
  // const token = await store.dispatch('postData', {
  //   url: '/user/get-auth-token',
  //   data: {}
  // });
  const token = 'this token';
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
