export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    load({
      message = '加载中',
      overlay = false,
      forbidClick = true,
      duration = 0
    } = {}) {
      if (this.loading) {
        return this.loading;
      }
      this.loading = true;
      this.$toast({
        type: 'loading',
        message,
        overlay,
        forbidClick,
        duration,
        icon: require('../assets/images/common/loading-white-1.png'),
        className: 'toast-white'
      });
      return false;
    },
    unload() {
      this.loading = false;
      this.$toast.clear();
    },
    errorMsg({
      message = '网络异常，请稍后再试！',
      overlay = false,
      forbidClick = true,
      duration = 3000
    } = {}) {
      this.loading = false;
      this.$toast.clear();
      this.$toast({
        type: 'fail',
        message,
        overlay,
        forbidClick,
        duration
      });
    }
  }
};
