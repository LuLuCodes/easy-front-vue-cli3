# How to use

本文档描述了在实际项目开发中，各个关键点的使用方法

## 样式

### 公共样式

公共样式统一放在 src/assets/css 目录下，其中 theme.less 为皮肤文件、style.less 为全局样式

### 页面样式和组件样式

页面样式和组件样式全部集中放置在相对应的 vue 文件的 style 标签内

## 路由加载

### 路由配置

路由配置统一放在 src/router/views/index.js 中，目前未按模块区分，复杂度较高的项目，请自行按模块划分

### 路由加载状态管理

路由加载状态分别分为加载中和加载失败，对应的组件分别是 src/components 目录下的 router-loading 和 router-error。
路由加载状态的管理逻辑在 src/utils/index.js 的 lazyLoadView 方法，可对加载延迟时间和超时时间进行配置。

## 公共组件

- src/components/agreement 用户协议组件
- src/components/empty-list 空列表组件
- src/components/global/bottom-tabbar 底部菜单组件
- src/components/send-captcha 验证码发送组件

## 全局 mixins

src/mixins/global-mixins.js 是全局混入，目前包含以下方法：

- load 加载状态
- unload 取消加载状态
- errorMsg 错误提示

正确的使用方法：

```js
// load()放在if里，可以防止重复加载
// errorMsg() 在给出错误提示前，会自动把之前的加载状态取消
try {
  if (this.load()) {
    return;
  }
  await this.$store.dispatch('getSelectedPoint');
  this.unload();
} catch (error) {
  console.log(error);
  this.errorMsg({ message: error.message });
}
```

## 全局过滤器

src/utils/filter.js 为全局过滤器，目前包含：

- DateTime 时间格式化

- PhoneEncrypt 手机号脱敏

## API 请求方式

之前的版本中，我们所有请求都通过 vuex 的 postData，这种方式不够灵活，目前将 api 的请求方法挂载到 vue 的实例上，大部分的业务请求可以直接使用$api.post和$api.get 完成：

```js
await this.$api.post({
  url: '/common/SendCaptcha',
  data: {
    Body: {
      CellPhoneNo: this.phone,
      CaptchaType: this.captchaType,
      ExpireSecond: this.expireSec
    }
  }
});
```

## 云端 Condition

云端查询之前只支持 Extra，很多情况的下查询接口无法复用，新版里云端将 Condition 字段开放，前端可以针对查询条件做更多的定制化

### 云端原始的 Condition 查询

```json
{
  "CompanyCode":29018,  //必传
  "UserSysNo":1, //必传 项目号，用户
  "KeySysNo":1, //获取详情接口必传， 获取详情用，主键编码
  "Conditions":[ //非必传，不传查全表 ConditionType: 0and  1or
    {"ConditionType":0,"Operator":0,"PropertyName":"SysNo","Value":1},  //Num类型 Operator:0等于 1不等于 2大于 3小于 4大于等于 5小于等于
    {"ConditionType":1,"Operator":0,"PropertyName":"CreateTime","Value":"2020-01-01"},  //Datetime类型 Operator:0小于 1大于
    {"ConditionType":0,"Operator":0,"PropertyName":"PersonName","Value":"GuEn","IgoreCase":true},//string类型 Operator:0包含 1等于 IgoreCase true忽略大小写 false不忽略大小写
    {"ConditionType":0,"Operator":0,"PropertyName":"SysNo","Values":[1,2,3],"IsNot":true},NumIn类型 IsNot   true NotIn      false In
    {"ConditionType":1,"Conditions":[
      {"ConditionType":0,"Operator":0,"PropertyName":"SysNo","Value":1},
      {"ConditionType":1,"Operator":0,"PropertyName":"Sex","Value":0},
    ]}
  ],
  "PageSize":100,  //非必传 分页大小 默认100
  "PageIndex":1,   //非必传 页码，从1开始 默认1
  "Sorts":[{"SortName":"CreateTime","SortType":"Desc"},{"SortName":"SysNo","SortType":"Asc"}], //非必传 排序 不传按内存排序
  "Extra":{} //非必传 其他约定对象
}
```

如果直接在前端拼接 Condition，整个过程过于复杂，因此前端提供了 condition 组合器--OP，通过类似 ORM 的语法自动生成 Condition。
注意：需配合最新版的 [easy-front-express-api](https://github.com/LuLuCodes/easy-front-express-api)使用

### 神奇的 OP

OP 目前支持：

- \>、<、>=、<= 值比较
- in、notin 是否包含
- like、iLike 字符串比较
- and、or 关系查询

具体请参考：
src/utils/condition-operator.js

```js
/**
 * Operator to be used when querying data
 */
export default {
  eq: 'eq', // =
  ne: 'ne', // !=
  gt: 'gt', // >
  gte: 'gte', // >=
  lt: 'lt', // <
  lte: 'lte', // <=
  or: 'or', // OR
  and: 'and', // AND
  in: 'in', // in
  notin: 'notin', // not in
  like: 'like', // like
  iLike: 'iLike' // iLike  不区分大小写
};
```

### OP 使用示例

```js
// 简单查询：
// 默认情况下，数字和字符串类型均是等于查询，时间类型是大于查询，数组是in查询
// 各个属性之间是and的关系
{
  num: 1,
  date: '2020-10-21 12:23:21',
  str: '我的大是大非',
  ary: [1, 2, 3],
}
// 最终将形成如下查询：
// num = 1 and date > '2020-10-21 12:23:21' and str = '我的大是大非' and ary in [1,2,3]
```

```js
// 多样查询
// 数字支持 >、<、>=、<=、=查询
// 字符串支持 =、like、iLike 查询，其中like区分大小写，iLike不区分大小写
// 时间类型只支持 >、< 查询，不支持 = 查询
// 数组支持in、notin插叙
{
  num: {
    [Op.gt]: 2,
  },
  date: {
    [Op.lt]: '2020-10-21 12:23:21',
  },
  str: {
    [Op.like]: '我的大是大非',
  },
  ary: {
    [Op.notin]: [1, 2, 3],
  },
  [Op.or]: {
    attr: {
      [Op.lt]: 123,
    },
  },
}
// 最终将形成如下查询：
// num > 2 and date < '2020-10-21 12:23:21' and str like '我的大是大非' and ary not in [1,2,3] or attr < 123
```

```js
// 复杂关系查询
// 默认情况下属性之间是and关系，可以通过[Op.or]进行or查询
// 请注意关系查询时，值是对象和数组的差别：
// 如果是对象，表示该属性与上一个属性之间的关系;如果是数组，则是对数组内的属性做括号处理，再与上一个属性做关系处理
{
  num: {
    [Op.gt]: 2,
  },
  [Op.or]: {
    attr: {
      [Op.lt]: 123,
    },
  },
  [Op.or]: [
    {
      attr_child: {
        [Op.gt]: 222,
      },
    },
    {
      attr_child1: '123123',
    },
    {
      [Op.or]: {
        attr_child3: {
          [Op.lte]: 123,
        },
      },
    },
  ],
}
// 最终将形成如下查询：
// num > 2 or attr < 123 or (attr_child > 222 and attr_child1 = '123123' or attr_child3 < 123)
```

目前 OP 已经注册到 Vue 实例中，可以直接通过 this.\$Op 来使用

## Vuex

新版 Vuex 数据已经做简化，默认情况下，只保存了用户数据，以及登录、退出、获取 token 的 actions 操作

## localStorage

src/utils/storage.js 已经对 localStorage 做了简单封装，请将 localStorage 的使用的 KEY 也统一封装在该文件内，方便管理
