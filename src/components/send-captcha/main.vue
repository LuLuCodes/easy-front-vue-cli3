<template>
  <span
    class="f13"
    :class="canSendCaptcha ? 'c-red' : 'c-gray'"
    slot="button"
    @click.prevent.stop="sendCaptcha"
    >获取验证码{{ timeTip }}</span
  >
</template>
<script>
export default {
  name: 'send-captcha',
  components: {},
  data() {
    return {
      canSendCaptcha: true,
      timeTip: ''
    };
  },
  props: {
    phone: {
      type: String,
      default: ''
    },
    agree: {
      type: Boolean,
      default: false
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
      try {
        const res = await this.$api.post({
          url: '/common/CheckLoginInStatus2',
          data: {
            Body: {
              LoginSource: 1,
              LoginType: 4,
              LoginID: this.phone
            }
          }
        });
        if (res.LoginInStatus === 2) {
          return true;
        } else if (res.LoginInStatus === 0) {
          this.$toast('手机号未注册');
          return false;
        } else if (res.LoginInStatus === 1) {
          this.$toast('手机号未激活');
          return false;
        } else if (res.LoginInStatus === 3) {
          this.$toast('手机号已禁用');
          return false;
        }
      } catch (error) {
        this.errorMsg({ message: error.message });
      }
    },
    async sendCaptcha() {
      if (!this.canSendCaptcha) {
        return;
      }
      if (!this.agree) {
        this.$toast('请勾选用户协议');
        return;
      }
      if (!this.phone) {
        this.$toast('请输入手机号');
        return;
      }
      try {
        this.load();
        const checkPhone = await this.checkCellPhone();
        if (!checkPhone) {
          this.unload();
          return;
        }
        await this.$api.post({
          url: '/common/SendCaptcha',
          data: {
            Body: {
              CellPhoneNo: this.phone,
              CaptchaType: 1,
              ExpireSecond: 1200
            }
          }
        });
        this.unload();
        this.$toast.success('验证码已发送');
        this.canSendCaptcha = false;
        let time = 60;
        const timer = setInterval(() => {
          time--;
          if (time === 0) {
            this.canSendCaptcha = true;
            this.timeTip = '';
            clearInterval(timer);
          } else {
            this.timeTip = `(${time}s)`;
          }
        }, 1000);
      } catch (error) {
        this.errorMsg({ message: error.message });
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
