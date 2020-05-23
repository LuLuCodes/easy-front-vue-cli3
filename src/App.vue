<template>
  <div id="app">
    <keep-alive :include="include">
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { checkDevice } from '@/utils';
export default {
  name: 'App',
  components: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      keepAliveInclude: state => state.keepAliveInclude
    })
  },
  created() {
    const { isWechat } = checkDevice();
    if (isWechat) {
      this.initWxJSSDK();
    }
  },
  beforeDestroy() {
    this.$store.commit('updateKeepAliveInclude', []);
  },
  watch: {
    $route(to, from) {
      const include = [...this.keepAliveInclude];
      // 如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      if (to.meta.keepAlive) {
        include.indexOf(to.name) === -1 && include.push(to.name);
      }
      // 如果 要 form(离开) 的页面是 keepAlive缓存的，
      // 再根据 deepth 来判断是前进还是后退
      if (from.meta.keepAlive && to.meta.deepth <= from.meta.deepth) {
        var index = include.indexOf(from.name);
        index !== -1 && include.splice(index, 1);
      }
      this.$store.commit('updateKeepAliveInclude', include);
    }
  },
  methods: {
    async initWxJSSDK() {
      try {
        const reuslt = await this.$api.post({
          url: '/wx/jssdk',
          data: {
            url: location.href.split('#')[0]
          }
        });
        window.wx.config({
          debug: false,
          appId: reuslt.AppId,
          timestamp: reuslt.Timestamp,
          nonceStr: reuslt.NonceStr,
          signature: reuslt.Signature,
          jsApiList: [
            'scanQRCode',
            'getLocation',
            'chooseImage',
            'previewImage'
            // 'showMenuItems',
            // 'updateTimelineShareData',
            // 'updateAppMessageShareData',
            // 'hideOptionMenu',
            // 'hideMenuItems',
            // 'hideAllNonBaseMenuItem',
            // 'uploadImage',
            // 'downloadImage',
            // 'chooseWXPay'
          ]
        });
        window.wx.error(function (res) {
          console.error(res);
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="less">
@import '../node_modules/vant/lib/index.css';
@import '//at.alicdn.com/t/font_1787502_cau0bt8gx7g.css';
@import './assets/css/style.less';
</style>
