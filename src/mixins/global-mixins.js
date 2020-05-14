export default {
  data() {
    return {
      pending: new Map()
    };
  },
  methods: {
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
        return { ok: false, data: null };
      }

      const prams = [url, JSON.stringify(data)].join('&');
      try {
        if (!this.pending.has(prams)) {
          // 如果 pending 中不存在当前请求，则添加进去
          this.pending.set(prams, true);
          this.$toast({
            type: 'loading',
            message,
            overlay,
            forbidClick,
            duration,
            icon: require('../assets/images/common/loading-white-1.png'),
            className: 'toast-white'
          });
          const result = await this.$api.post({ url, data });
          this.pending.delete(prams);
          this.$toast.clear();
          return { ok: true, data: result };
        } else {
          console.error('this url request is wating response!');
          return { ok: false, data: null };
        }
      } catch (error) {
        this.$toast.clear();
        this.$toast({
          type: 'fail',
          message,
          overlay,
          forbidClick,
          duration
        });
        this.pending.delete(prams);
        return { ok: false, data: null };
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
        return { ok: false, data: null };
      }
      const prams = [url, JSON.stringify(data)].join('&');
      try {
        if (!this.pending.has(prams)) {
          // 如果 pending 中不存在当前请求，则添加进去
          this.pending.set(prams, true);
          this.$toast({
            type: 'loading',
            message,
            overlay,
            forbidClick,
            duration,
            icon: require('../assets/images/common/loading-white-1.png'),
            className: 'toast-white'
          });
          const result = await this.$api.post({ url, data });
          this.pending.delete(prams);
          this.$toast.clear();
          return { ok: true, data: result };
        } else {
          console.error('this url request is wating response!');
          return { ok: false, data: null };
        }
      } catch (error) {
        this.$toast.clear();
        this.$toast({
          type: 'fail',
          message,
          overlay,
          forbidClick,
          duration
        });
        this.pending.delete(prams);
        return { ok: false, data: null };
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
