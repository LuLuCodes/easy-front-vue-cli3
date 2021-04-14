/**
 * 常用的方法，统一install到vue 实例
 */

 const common = {
  install: function(Vue, options) {
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

    const gobalFunc = {
      $loading = function (message) {
        this.$toast.loading({
          duration: 0,
          loadingType: 'spinner',
          forbidClick: true,
          message: message || '加载中...',
          icon: 'https://doudou-cdn.xiyueapp.com/h5/assets/images/loading-white-1.png',
          className: 'toast-white'
        });
      },
      goBack() {
        this.$router.go(-1);
      },
      go(path) {
        this.$router.push(path);
      }
    };

    Object.keys(gobalFunc).forEach(key => {
      Vue.prototype[key] = gobalFunc[key];
    });

  }
};

export default common;
