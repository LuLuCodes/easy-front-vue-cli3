/**
 *  全局方法，但是使用率不高，哪里使用哪里import
 */

export function ArrayToObject(ary, key) {
  const obj = {};
  for (const item of ary) {
    obj[item[key]] = {
      ...item
    };
  }
  return obj;
}

export function transGlobalObject(ary) {
  const obj = {};
  for (const item of ary) {
    obj[item.ParamKey] = item.ParamValue;
  }
  return obj;
}

export function parseTime(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (typeof date === 'string') {
    return date;
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}

export function lazyLoadView(AsyncView, delay = 200, timeout = 10000) {
  const AsyncHandler = () => ({
    // 需要加载的组件 (应该是一个 `Promise` 对象)
    component: AsyncView,
    // 异步组件加载时使用的组件
    loading: require('@/components/router-loading'),
    // 加载失败时使用的组件
    error: require('@/components/router-error'),
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay,
    // 如果提供了超时时间，且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout
  });
  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      return h(AsyncHandler, data, children);
    }
  });
}
