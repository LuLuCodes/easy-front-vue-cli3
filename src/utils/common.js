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
  }
};

export default common;
