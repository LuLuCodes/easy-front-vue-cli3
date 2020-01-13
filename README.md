# easy-front-vue-cli3

基于 vue cli3 的项目工程模板

## 使用方法

### clone 项目到本地

```
https://github.com/LuLuCodes/easy-front-vue-cli3.git

```

### 删除.git 和修改项目名称

```shell
rm -rf .git
```

### 安装依赖

```shell
yarn install
```

### 调试模式

```shell
yarn run dev
```

### 打包生产环境

```shell
yarn run build
```

### 打包测试环境

```shell
yarn run test
```

### 打包预发布环境

```shell
yarn run pre-release
```

### 检查语法和修复文件

```shell
yarn run lint
```

### 修改不同构建目标配置

```shell
.env // 本地开发环境
.env.pre-release // 预发布环境
.env.production // 生产环境
.env.test // 测试环境
```

### 以 cdn 方式引用第三方资源（以 vant 为例），修改 vue.config.js

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
yarn run new:view // 新建页面，支持单个vue文件如home.vue，或者目录如home/index.vue
yarn run new:comp // 新建组件，支持单个vue文件如my-button.vue，或者目录如my-button/index.vue
```

### 动态加载路由

router/index.js 是一个路由动态加载器，可以按以下两种方式创建路由

#### 单独路由文件

```js
// 在router文件夹下创建router.js文件，内容如下

export default [
  {
    path: "/home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/home.vue")
  }
];
```

#### 按模块创建路由

```js
// 在router文件夹下按模块创建路由文件夹，并在文件夹下创建index.js，内容如下

export default [
  {
    path: "/good/good-list",
    component: () =>
      import(
        /* webpackChunkName: "good-list" */ "@/views/good/good-list/index.vue"
      )
  },
  {
    path: "/good/good-detail",
    component: () =>
      import(/* webpackChunkName: "good-detail" */ "@/views/good/good-detail")
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
  mode: "history",
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
    path: "/home",
    name: "home",
    component: () => import("@/views/home"),
    meta: {
      deepth: 1,
      keepAlive: true // 需要被缓存
    }
  }
];
```

### 数据通讯签名机制

前端请求数据时，对 post 请求中数据进行 MD5 签名并对签名进行 RSA 加密

#### 是否启用数据签名

在.env\*环境配置文件中，增加`VUE_APP_ENABLE_SIGN = "1"`

#### 设置公钥

1、公钥如何产生，请查看[easy-front-express-api](https://github.com/LuLuCodes/easy-front-express-api)

2、请在 src/store/index.js 中设置公钥

```
// 设置公钥
const pem = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoVF1Z6CSMKdNPtdkuNQWCIYiZ
ZTvjEuEOAEPo0z2rz6A/m6byE8B84V69f+xtNg9s1QtZ0jLW3Lvumps1GmLSXwCX
rJOcKm+3jmB3+KecXTguJMJHEkxvLYUKk270ennfSq7uQZ9P9iIEDgHHaQMJd/I5
M6E1RulpjXQt5cpzUQIDAQAB
-----END PUBLIC KEY-----`;
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

## PWA

### 配置service-work.js
请在 src/service-work.js 中进行以下配置：

1、设置缓存前缀和后缀
```js
// 设置缓存前缀和后缀，请根据实际项目名修改
workbox.core.setCacheNameDetails({
  prefix: 'easy-front-vue-cli3',
  suffix: 'v1.0.0'
});
```

2、设置api url
```js
// api缓存，优选从网络获取，网络异常时再使用缓存，请根据实际api url配置RegExp
workbox.routing.registerRoute(
  new RegExp('https://m.hellomrbigbigshot.xyz/api'),
  workbox.strategies.networkFirst({
    cacheName: 'api'
  })
);
```

3、在manifest.json中配置应用名称和图标，用于浏览器将应用添加至桌面

### 禁用PWA
本项目默认开启PWA，如不使用PWA， 请进行以下操作：

1、删除src下的文件registerServiceWorker.js和service-worker.js

2、在src/main.js中删除以下代码：
```js
import './registerServiceWorker';
```

3、在vue.config.js中删除以下部分：
```js
pwa: {
    name: 'easy-front-vue-cli3',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // configure the workbox plugin (GenerateSW or InjectManifest)
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js',
      importWorkboxFrom: 'disabled',
      importScripts: 'https://cdn.myun.info/workbox-v4.3.1/workbox-sw.js'
      // ...other Workbox options...
    }
  }
```

4、删除public/manifest.json文件

5、删除package.json中的`devDependencies`里的`@vue/cli-plugin-pwa`依赖，并重新`npm install`


### 在已经上线的项目中，关闭Service Work
有些项目上线后，又不想使用Service Work， 请进行以下操作：

1、在src/main.js中删除以下代码：
```js
import './registerServiceWorker';
```
2、在src/main.js中加入以下代码：
```js
import './unregisterServiceWorker';
```