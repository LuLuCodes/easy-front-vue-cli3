/**
 *  全局方法，但是使用率不高，哪里使用哪里import
 */

// 数组转对象
export function ArrayToObject(ary, key) {
  const obj = {};
  for (const item of ary) {
    obj[item[key]] = {
      ...item
    };
  }
  return obj;
}

// 格式化云端全局对象
export function transGlobalObject(ary) {
  const obj = {};
  for (const item of ary) {
    obj[item.ParamKey] = item.ParamValue;
  }
  return obj;
}

// 日期时间格式化
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

// 根据日期时间字符串，获取时间戳
export function getDateTimeStamp(dateStr) {
  return Date.parse(dateStr.replace(/-/gi, '/'));
}

// 计算时间差
export function getDateDiff(dateStr) {
  if (dateStr === '') {
    return dateStr;
  }
  const publishTime = getDateTimeStamp(dateStr) / 1000;
  const timeNow = parseInt(new Date().getTime() / 1000);
  const date = new Date(publishTime * 1000);
  // const Y = date.getFullYear();
  let M = date.getMonth() + 1;
  let D = date.getDate();
  let H = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  // 小于10的在前面补0
  if (M < 10) {
    M = '0' + M;
  }
  if (D < 10) {
    D = '0' + D;
  }
  if (H < 10) {
    H = '0' + H;
  }
  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }
  const d = publishTime - timeNow;
  const days = parseInt(d / 86400);
  const hours = parseInt(d / 3600);
  const minutes = parseInt((d % 3600) / 60);
  const seconds = parseInt(d % 60);
  if (days > 0) {
    return days + '天';
  } else if (days <= 0) {
    return hours + '小时' + minutes + '分钟' + seconds + '秒';
  }
}

// 获取短格式日期时间：09月21日 23:21
export function getShortDate(dateStr) {
  if (!dateStr) {
    return dateStr;
  }
  const publishTime = getDateTimeStamp(dateStr) / 1000;
  const date = new Date(publishTime * 1000);
  // const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();
  let H = date.getHours();
  let m = date.getMinutes();
  if (H < 10) {
    H = '0' + H;
  }
  if (m < 10) {
    m = '0' + m;
  }
  return M + '月' + D + '日' + '  ' + H + ':' + m;
}

// 路由异步组件懒加载
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

// 解析省市区数据，配合area-picker组件使用
function processArea(data, obj) {
  for (const item of data) {
    const code = item.d;
    if (code.indexOf('0000') === 2) {
      obj.provinceList[code] = { s: item.s, d: item.d, n: item.n };
    } else if (code.indexOf('00') === 4) {
      obj.cityList[code] = { s: item.s, d: item.d, n: item.n };
    } else {
      obj.countyList[code] = { s: item.s, d: item.d, n: item.n };
    }
    if (item.c && item.c.length) {
      processArea(item.c, obj);
    }
  }
}

// 解析省市区数据，配合area-picker组件使用
export function parseArea(area) {
  const areaList = {
    provinceList: {},
    cityList: {},
    countyList: {}
  };
  processArea(area, areaList);
  return areaList;
}

// 设备检测
export function checkDevice() {
  const ua = navigator.userAgent;
  const isAndroid = /(Android);?[\s/]+([\d.]+)?/.test(ua);
  const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua);
  const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua);
  const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua);
  const isWechat = /micromessenger/i.test(ua);
  return {
    isAndroid,
    isIpad,
    isIpod,
    isIphone,
    isWechat
  };
}

// 模拟同步sleep机制
export function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
