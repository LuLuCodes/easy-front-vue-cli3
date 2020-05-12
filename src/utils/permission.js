// 路由首位
import router from '@/router';
import store from '@/store';

const whiteList = ['']; // 不重定向白名单

// 检查是否登录
router.beforeEach(async (to, from, next) => {
  // 如果要更新用户信息，也可以在这里做
  const token = await store.dispatch('checkAuthToken', {});
  if (token && store.state.user.UserSysNo === 0) {
    await store.dispatch('updateUserInfo', {});
  }
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
