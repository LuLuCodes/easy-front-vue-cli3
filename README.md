# easy-front-vue-cli3

基于 vue cli3 的项目工程模板

## 使用方法

### clone 项目到本地

```
https://github.com/LuLuCodes/easy-front-vue-cli3.git

```

### 删除.git 和修改项目名称

```
rm -rf .git
```

### 安装依赖

```
yarn install
```

### 调试模式

```
yarn run serve
```

### 打包生产环境

```
yarn run build
```

### 打包测试环境

```
yarn run test
```

### 打包预发布环境

```
yarn run pre-release
```

### 检查语法和修复文件

```
yarn run lint
```

### 修改不同构建目标配置

```
.env // 本地开发环境
.env.pre-release // 预发布环境
.env.production // 生产环境
.env.test // 测试环境
```

### 以cdn方式引用第三方资源（以vant为例），修改 vue.config.js
```
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
    'https://static.myun.info/vant-1.6.11/index.css'' // 引用vant css
  ],
  js: [
    // vue
    'https://static.myun.info/vue-2.6.10/vue.min.js',
    // vue-router
    'https://static.myun.info/vue-router-3.0.2/vue-router.min.js',
    // vuex
    'https://static.myun.info/vuex-3.1.0/vuex.min.js',
    // axios
    'https://static.myun.info/axios-0.18.0/axios.min.js',
    // vant
    'https://static.myun.info/vant-1.6.11/vant.min.js' // 引用vant库
    ]
}
```

### 新建页面或组件
```
yarn run new:view // 新建页面
yarn run new:comp // 新建组件
```

### 动态加载路由
router/index.js是一个路由动态加载器，可以按以下两种方式创建路由

#### 单独路由文件
```
// 在router文件夹下创建router.js文件，内容如下

export default [
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue')
  }
]
```

#### 按模块创建路由
```
// 在router文件夹下按模块创建路由文件夹，并在文件夹下创建index.js，内容如下

export default [
  {
    path: '/good/good-list',
    component: () => import(/* webpackChunkName: "good-list" */ '@/views/good/good-list/index.vue')
  },
  {
    path: '/good/good-detail',
    component: () => import(/* webpackChunkName: "good-detail" */ '@/views/good/good-detail')
  }
]
```

