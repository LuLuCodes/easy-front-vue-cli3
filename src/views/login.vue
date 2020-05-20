<template>
  <div class="container container-nav login">
    <van-nav-bar title="欢迎登录嘉品团" fixed :border="false" />
    <!-- logo -->
    <h1 class="logo lh-1 txt-c">
      <img src="../assets/images/logo.png" alt />
    </h1>

    <!-- login 表单 -->
    <div class="form-wrap">
      <van-cell-group :border="false">
        <van-field placeholder="请输入手机号" type="number" maxlength="11" v-model="cellphone" />
        <van-field placeholder="短信验证码" type="number" maxlength="8" v-model="captcha">
          <template #button>
            <send-captcha
              ref="captcha"
              class="van-hairline--left"
              :phone="cellphone"
              @click.native="sendCaptcha"
            ></send-captcha>
          </template>
        </van-field>
      </van-cell-group>
      <div class="plr15 mt16">
        <van-checkbox
          v-model="agree"
          shape="square"
          icon-size="18px"
          checked-color="#FC3636"
        >
          <span class="c-999">我已阅读并同意</span>
          <span class="c-blue" @click.prevent.stop="showAgreement = true">《用户协议》</span>
        </van-checkbox>
      </div>
      <div class="btn">
        <van-button round block color="#FC3636" @click.prevent.stop="login">
          <span class="f18 c-white">登录</span>
        </van-button>
      </div>
      <div class="flex all-t plr15 mt30">
        <div class>
          <i class="icon icon-tishi f20"></i>
        </div>
        <div class="ml2 pt2">
          <p class="c-666">该应用为嘉品团内部运营门店管理后台，请先与业务对接人联系，确认开通账号后再登录。</p>
          <p class="c-666 mt20">
            客服电话：
            <span class="c-000">400 888 8888</span>
            <span class="circle-phone ml10 van-hairline--surround">
              <i class="icon icon-dianhua f16 c-red"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <agreement :show.sync="showAgreement"></agreement>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Agreement from '@/components/agreement';
import SendCaptcha from '@/components/send-captcha';
export default {
  name: 'login',
  components: {
    Agreement,
    SendCaptcha
  },
  data() {
    return {
      cellphone: '',
      captcha: '',
      agree: false,
      showAgreement: false
    };
  },
  computed: {
    ...mapState({
      UserSysNo: state => state.user.UserSysNo,
      PersonSysNo: state => state.user.PersonSysNo
    })
  },
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
        const { error, result } = await this.post({
          url: '/common/CheckLoginInStatus2',
          data: {
            Body: {
              LoginSource: 1,
              LoginType: 4,
              LoginID: this.cellphone
            }
          },
          message: '检查中...'
        });
        if (error) {
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
    async login() {
      try {
        if (!this.agree) {
          this.warnMsg('请勾选用户协议');
          return;
        }
        if (!this.cellphone) {
          this.warnMsg('请输入手机号');
          return;
        }
        if (!this.captcha) {
          this.warnMsg('请输入验证码');
          return;
        }

        const checkPhone = await this.checkCellPhone();
        if (!checkPhone) {
          return;
        }
        // 不需要在前端暂时loading的，可以直接调用this.$store.dispatch
        await this.dispatch({
          method: 'login',
          data: {
            LoginSource: 1,
            LoginType: 5,
            LoginID: this.cellphone,
            Captcha: this.captcha,
            RegisterMsg: { IsNeedRegister: 1 }
          },
          message: '登录中...'
        });
      } catch (error) {
        this.errorMsg(error.message);
      }
    },
    sendCaptcha() {
      if (!this.agree) {
        this.warnMsg('请勾选用户协议');
        return;
      }
      this.$refs.captcha.send();
    }
  }
};
</script>
<style lang="less" scoped>
.login .logo {
  padding-bottom: 64px;
  padding-top: 43px;
}
.login .logo img {
  width: 190px;
}

.form-wrap {
  padding: 0 10px 0px;
}
.form-wrap .van-cell,
.form-wrap .van-cell-group {
  background: transparent;
}
.form-wrap .van-cell:not(:last-child)::after {
  right: 26px;
}
.form-wrap .van-cell:last-child::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 4.26667vw;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  right: 26px;
}

.form-wrap /deep/ .van-field__button span.van-hairline--left:after {
  border-color: #d2d6d5;
}
.form-wrap .btn {
  padding: 20px 15px 0 15px;
}
.form-wrap .icon-tishi {
  background: linear-gradient(
    180deg,
    rgba(7, 178, 232, 1) 0%,
    rgba(171, 205, 3, 1) 100%
  );
  -webkit-background-clip: text;
  color: transparent;
}
.form-wrap .circle-phone {
  display: inline-block;
  width: 26px;
  height: 26px;
  line-height: 26px;
  text-align: center;
}
.form-wrap .circle-phone:after {
  border-color: #fc3636;
  border-radius: 100%;
}
</style>
