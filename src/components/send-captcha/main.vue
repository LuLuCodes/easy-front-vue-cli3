<template>
  <!-- 短信验证码组件 -->
  <span class="f13" :class="canSend ? 'c-red' : 'c-gray'" slot="button">获取验证码{{ timeTip }}</span>
</template>
<script>
export default {
  name: 'send-captcha',
  components: {},
  data() {
    return {
      canSend: true,
      timeTip: ''
    };
  },
  props: {
    phone: {
      type: String,
      default: ''
    },
    captchaType: {
      type: Number,
      default: 1
    },
    expireSec: {
      type: Number,
      default: 1200
    }
  },
  computed: {},
  created() {
    // api请求尽量放在这里
    console.log('this is created');
  },
  mounted() {
    // 对数据的操作尽量放在这里
    console.log('this is mounted');
  },
  updated() {
    console.log('this is updated');
  },
  beforeDestroy() {
    console.log('this is beforeDestroy');
  },
  watch: {},
  methods: {
    async checkCellPhone() {
      // 不需要在前端暂时loading的，可以直接调用this.$api.post
      try {
        const result = await this.post({
          url: '/common/CheckLoginInStatus2',
          data: {
            Body: {
              LoginSource: 1,
              LoginType: 4,
              LoginID: this.phone
            }
          },
          message: '检查中...'
        });
        if (!result) {
          return false;
        }
        if (result.LoginInStatus === 2) {
          return true;
        } else if (result.LoginInStatus === 0) {
          this.warnMsg('手机号未注册');
          return false;
        } else if (result.LoginInStatus === 1) {
          this.warnMsg('手机号未激活');
          return false;
        } else if (result.LoginInStatus === 3) {
          this.warnMsg('手机号已禁用');
          return false;
        }
      } catch (error) {
        this.errorMsg(error.message);
      }
    },
    async send() {
      if (!this.canSend) {
        return;
      }
      if (!this.phone) {
        this.warnMsg('请输入手机号');
        return;
      }
      try {
        const checkPhone = await this.checkCellPhone();
        if (!checkPhone) {
          return;
        }
        await this.post({
          url: '/common/SendCaptcha',
          data: {
            Body: {
              CellPhoneNo: this.phone,
              CaptchaType: this.captchaType,
              ExpireSecond: this.expireSec
            }
          },
          message: '发送中...'
        });
        this.$toast.success('验证码已发送');
        this.canSend = false;
        let time = 60;
        const timer = setInterval(() => {
          time--;
          if (time === 0) {
            this.canSend = true;
            this.timeTip = '';
            clearInterval(timer);
          } else {
            this.timeTip = `(${time}s)`;
          }
        }, 1000);
      } catch (error) {
        this.errorMsg(error.message);
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
