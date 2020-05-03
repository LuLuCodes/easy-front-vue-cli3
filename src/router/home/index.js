import { lazyLoadView } from '@/utils';
export default [
  {
    path: '/home',
    name: 'home',
    component: () => lazyLoadView(import('@/views/home')),
    meta: {
      deepth: 1,
      keepAlive: true // 需要被缓存
    }
  }
];
