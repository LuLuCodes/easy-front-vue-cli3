/**
 * 常用的方法，统一install到vue 实例
 */

const common = {
  install: function(Vue, options) {
    // 深copy
    Vue.prototype.$cloneDeep = function(Obj) {
      var buf;
      if (Obj instanceof Array) {
        buf = [];
        var i = Obj.length;
        while (i--) {
          buf[i] = this.$cloneDeep(Obj[i]);
        }
        return buf;
      } else if (Obj instanceof Object) {
        buf = {};
        for (var k in Obj) {
          if (Object.prototype.hasOwnProperty.call(Obj, k)) {
            buf[k] = this.$cloneDeep(Obj[k]);
          }
        }
        return buf;
      } else {
        return Obj;
      }
    };
    // 所有的枚举
    Vue.prototype.$enum = {};
    /**
     * h5调用壳的方法，参考 getClipText
     * @param {string} methodName 方法名
     * @param {object} postData 请求参数
     * @param {function} cb 降级处理方式
     */
    Vue.prototype.$callNative = (methodName, postData, cb) => {
      try {
        const params =
          typeof postData === 'object' ? JSON.stringify(postData) : postData;
        // 如果是webkit内核，则iso是最新的
        if (
          window.webkit &&
          window.webkit.messageHandlers &&
          window.webkit.messageHandlers[methodName]
        ) {
          window.webkit.messageHandlers[methodName].postMessage(
            params === undefined ? {} : params
          );
        } else if (window.android && window.android[methodName]) {
          // 安卓无参数时不能传任何值
          if (postData === undefined) {
            window.android[methodName]();
          } else {
            window.android[methodName](params);
          }
        } else {
          window[methodName](params);
        }
      } catch (e) {
        // 壳不支持方法，降级处理
        if (typeof cb === 'function') {
          cb();
        }
      }
    };
  }
};

export default common;
