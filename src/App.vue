<template>
  <div id="app">
    <keep-alive :include="include">
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
  }
};
</script>

<style lang="less">
@import './assets/css/style.less';
</style>
