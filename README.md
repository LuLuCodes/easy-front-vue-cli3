# easy-front-vue-cli3

基于 vue cli3 的项目工程模板 2.0

## 2.0 改进点

- vue 全套升级至最新版本
- axios 从之前的 vuex 中独立，并挂载到 VUE 原型上
- axios 增加重试机制
- 精简 mixins，将全局方法挂载到 VUE 原型上
- 增加全局过滤器
- 修改输出目录，将 dist 目录迁移到 www/dist 下，同时增加 publish.html，配合 [www.conf](https://github.com/joneqian/centos_install_shell/blob/master/www.conf)，实现发布时自动挂载小火箭
- 增加异步组件懒加载示例
- 路由守卫构建成单独的 js，方便管理
- 优化打包过程

v1.0 的文档请看[这里]()

## 使用方法

### 安装依赖

```shell
npm install
```

### 调试模式

```shell
npm run dev
```

### 打包生产环境

```shell
npm run build
```

### 打包测试环境

```shell
npm run test
```

### 打包预发布环境

```shell
npm run pre-release
```

### 检查语法和修复文件

```shell
npm run lint
```

### 修改不同构建目标配置

```shell
.env // 本地开发环境
.env.pre-release // 预发布环境
.env.production // 生产环境
.env.test // 测试环境
```

### 以 cdn 方式引用第三方资源（以 vant 为例），修改 vue.config.js

**注意：在具体项目中，请使用正式环境的 oss，cdn.myun.info 只是临时域名，随时会变更**

```js
var externals = {
  vue: 'Vue',
  axios: 'axios',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  vant: 'vant' // 生产环境打包时排除vant
}
config.externals(externals)
const cdn = {
  css: [
    'https://cdn.myun.info/vant-1.6.11/index.css'' // 引用vant css
  ],
  js: [
    // vue
    'https://cdn.myun.info/vue-2.6.10/vue.min.js',
    // vue-router
    'https://cdn.myun.info/vue-router-3.0.2/vue-router.min.js',
    // vuex
    'https://cdn.myun.info/vuex-3.1.0/vuex.min.js',
    // axios
    'https://cdn.myun.info/axios-0.18.0/axios.min.js',
    // vant
    'https://cdn.myun.info/vant-1.6.11/vant.min.js' // 引用vant库
    ]
}
```

### 新建页面或组件

```shell
npm run new:view // 新建页面，支持单个vue文件如home.vue，或者目录如home/index.vue
npm run new:comp // 新建组件，支持单个vue文件如my-button.vue，或者目录如my-button/index.vue
```

### 动态加载路由

router/index.js 是一个路由动态加载器，可以按以下两种方式创建路由

#### 单独路由文件

```js
// 在router文件夹下创建router.js文件，内容如下

export default [
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue')
  }
];
```

#### 按模块创建路由

```js
// 在router文件夹下按模块创建路由文件夹，并在文件夹下创建index.js，内容如下

export default [
  {
    path: '/good/good-list',
    component: () =>
      import(
        /* webpackChunkName: "good-list" */ '@/views/good/good-list/index.vue'
      )
  },
  {
    path: '/good/good-detail',
    component: () =>
      import(/* webpackChunkName: "good-detail" */ '@/views/good/good-detail')
  }
];
```

#### 路由动态 keep-alive

```js
// App.vue增加include

<template>
  <div id="app">
    <keep-alive :include="include">
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      include: []
    };
  },
  computed: {},
  created() {},
  mounted() {
  },
  watch: {
    $route(to, from) {
      // 如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      // 如果 要 form(离开) 的页面是 keepAlive缓存的，
      // 再根据 deepth 来判断是前进还是后退
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
      this.$store.commit('updateKeepAliveInclude', this.include);
    }
  },
  methods: {
  }
};
</script>

<style lang="less">
</style>

```

```js
// 利用store存储分发include
  state: {
    keepAliveInclude: []
  },
  modules: {},
  mutations: {
    updateKeepAliveInclude: (state, data) => {
      state.keepAliveInclude = data;
    }
  }
```

```js
// 利用vue router的scrollBehavior缓存滚动位置信息
export default new Router({
  mode: 'history',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    // keep-alive 返回缓存页面后记录浏览位置
    if (
      savedPosition &&
      to.meta.keepAlive &&
      store.state.keepAliveInclude.includes(to.name)
    ) {
      return savedPosition;
    }
    // 异步滚动操作
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ x: 0, y: 1 });
      }, 0);
    });
  }
});
```

```js
// 路由设置
// keepAlive设置页面是否需要keep
// deepth设置页面深度，用于判断前进和后腿
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
```

## git commit

### 全局安装 commitizen

```shell
npm install -g commitizen
```

### 提交 commit

```shell
git cz
# 或者
npm run commit
```

### 操作实例

```shell
# 选择提交类型
? Select the type of change that you're committing:

# 本次提交的影响范围
? Denote the SCOPE of this change:

# 简单描述本次提交的内容
? Write a SHORT, IMPERATIVE tense description of the change:

# 详细描述本次提交的内容
? Provide a LONGER description of the change (optional). Use "|" to break new line:

# 列举本次提交产生的重大影响
? List any BREAKING CHANGES (optional):

# 列举本次提交相关的issue id
? List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:
```

## 公共方法

```js
// in main.js
// 将常用方法和过滤器直接挂在在Vue上，mixins上编写功能模块的通用方法，减少mixins的体积
import common from '@/utils/common'; // 全局方法
import filters from '@/utils/filters'; // 全局过滤器

// 注册全局过滤器
for (const key in filters) {
  Vue.filter(key, filters[key]);
}

Vue.use(common); // 注册全局方法
```

## 异步组件懒加载

```js
components: {
  // 组件推荐使用异步懒加载方式
  /** 警告：
  * 并非所有组件都推荐使用异步懒加载，异步懒加载的组件代码并不会直接和主组件的代码一起被加载，而是在需要时才请求.
  * 这意味着在增加了http的请求，在网络差的情况下可能出现渲染延迟的情况.
  */
  'home-goods-item': () => import('../../components/home-goods-item')
}
```

## axios 请求重试机制

```js
// in src/api/request.js
service.interceptors.request.use(
  config => {
    config.retry = 2; // 重试次数
    config.retryDelay = 500; // 重试延时
    config.shouldRetry = error => {
      // 只有在断网或者超时重试，其他的(4xx,5xx)不重试
      // 如果开启重试机制，timeout建议不要设置过长
      return !error.response;
    }; // 重试条件，默认只要是错误都需要重试
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
```

```js
// in src/api/request.js service.interceptors.response.use
if (
  config &&
  config.retry &&
  config.shouldRetry &&
  typeof config.shouldRetry === 'function'
) {
  // 判断是否满足重试条件
  if (config.shouldRetry(error)) {
    // 设置重置次数，默认为0
    config.__retryCount = config.__retryCount || 0;
    // 判断是否超过了重试次数
    if (config.__retryCount < config.retry) {
      // 重试次数自增
      config.__retryCount += 1;
      // 延时处理
      const backoff = new Promise(function(resolve) {
        setTimeout(function() {
          resolve();
        }, config.retryDelay || 1);
      });
      // 重新发起axios请求
      return backoff.then(function() {
        return service(config);
      });
    }
  }
}
```

## 发布小火箭

发布小火箭页面在 www 目录下，在正式项目中使用时，请根据实际需求修改
