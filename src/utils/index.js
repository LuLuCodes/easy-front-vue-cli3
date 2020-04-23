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
