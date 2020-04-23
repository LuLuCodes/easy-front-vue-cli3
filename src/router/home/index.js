export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home'),
    meta: {
      deepth: 1,
      keepAlive: true // 需要被缓存
    }
  }
];
