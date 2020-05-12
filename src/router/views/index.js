import { lazyLoadView } from '@/utils';
export default [
  {
    path: '/login',
    name: 'login',
    component: () => lazyLoadView(import('@/views/login')),
    meta: {
      title: '登录',
      deepth: 0,
      keepAlive: false
    }
  }
];
