export default {
  data() {
    return {
      pending: new Map()
    };
  },
  methods: {
    load({
      message = '加载中',
      overlay = false,
      forbidClick = true,
      duration = 0
    } = {}) {
      this.$toast({
        type: 'loading',
        message,
        overlay,
        forbidClick,
        duration,
        icon: require('../assets/images/common/loading-white-1.png'),
        className: 'toast-white'
      });
    },
    unload() {
      this.$toast.clear();
    },
    async post({
      url = '',
      data = {},
      message = '加载中',
      overlay = false,
      forbidClick = true,
      duration = 0
    } = {}) {
      if (!url && typeof url === 'string') {
        console.error('need a string url!');
        return { error: 'need a string url!', result: null };
      }

      const prams = [url, JSON.stringify(data)].join('&');
      try {
        if (!this.pending.has(prams)) {
          // 如果 pending 中不存在当前请求，则添加进去
          this.pending.set(prams, true);
          this.load({
            message,
            overlay,
            forbidClick,
            duration
          });
          const result = await this.$api.post({ url, data });
          this.pending.delete(prams);
          this.unload();
          return { error: null, result };
        } else {
          console.error('this url request is wating response!');
          return {
            error: 'this url request is wating response!',
            result: null
          };
        }
      } catch (error) {
        this.errorMsg(error.message);
        this.pending.delete(prams);
        return { error: error.message, result: null };
      }
    },
    async dispatch({
      method = '',
      data = {},
      message = '加载中',
      overlay = false,
      forbidClick = true,
      duration = 0
    } = {}) {
      if (!method && typeof url === 'string') {
        console.error('need a string method!');
        return { error: 'need a string method!', result: null };
      }

      const prams = [method, JSON.stringify(data)].join('&');
      try {
        if (!this.pending.has(prams)) {
          // 如果 pending 中不存在当前请求，则添加进去
          this.pending.set(prams, true);
          this.load({
            message,
            overlay,
            forbidClick,
            duration
          });
          const result = await this.$store.dispatch(method, { data });
          this.pending.delete(prams);
          this.unload();
          return { error: null, result };
        } else {
          console.error('this method dispatch is wating response!');
          return {
            error: 'this method dispatch is wating response!',
            result: null
          };
        }
      } catch (error) {
        this.errorMsg(error.message);
        this.pending.delete(prams);
        return { error: error.message, result: null };
      }
    },
    async get({
      url = '',
      data = {},
      message = '加载中',
      overlay = false,
      forbidClick = true,
      duration = 0
    } = {}) {
      if (!url && typeof url === 'string') {
        console.error('need a string url!');
        return { error: 'need a string url!', result: null };
      }
      const prams = [url, JSON.stringify(data)].join('&');
      try {
        if (!this.pending.has(prams)) {
          // 如果 pending 中不存在当前请求，则添加进去
          this.pending.set(prams, true);
          this.load({
            message,
            overlay,
            forbidClick,
            duration
          });
          const result = await this.$api.post({ url, data });
          this.pending.delete(prams);
          this.unload();
          return { error: null, result };
        } else {
          console.error('this url request is wating response!');
          return {
            error: 'this url request is wating response!',
            result: null
          };
        }
      } catch (error) {
        this.errorMsg(error.message);
        this.pending.delete(prams);
        return { error: error.message, result: null };
      }
    },
    warnMsg(warn) {
      if (warn) {
        this.$toast.clear();
        this.$toast({
          type: 'text',
          warn,
          overlay: false,
          forbidClick: true,
          duration: 2500
        });
      }
    },
    errorMsg(error) {
      const msg = typeof error === 'string' ? error : error.message || '';
      if (msg) {
        this.$toast.clear();
        this.$toast({
          type: 'fail',
          msg,
          overlay: false,
          forbidClick: true,
          duration: 2500
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
