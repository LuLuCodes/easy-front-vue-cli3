<template>
  <!-- 底部菜单组件 -->
  <van-tabbar v-model="active" :z-index="100" class="tab-bar" route>
    <van-tabbar-item :to="{path: '/home'}">
      <span>嘉品团</span>
      <template #icon="props">
        <img :src="props.active ? icon.active : icon.normal" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item :to="{path: '/my'}">
      <span>我的</span>
      <template #icon="props">
        <img :src="props.active ? icon1.active : icon1.normal" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  name: 'bottom-tabbar',
  components: {},
  data() {
    return {
      active: 0,
      icon: {
        normal: require('../../assets/images/icon/store.png'),
        active: require('../../assets/images/icon/store-on.png')
      },
      icon1: {
        normal: require('../../assets/images/icon/my.png'),
        active: require('../../assets/images/icon/my-on.png')
      }
    };
  },
  props: {
  },
  computed: {},
  watch: {},
  create() {
    const path = this.$route.path;
    if (path === '/home') {
      this.active = 0;
    } else if (path === '/my') {
      this.active = 1;
    }
  },
  methods: {}
};
</script>
<style lang="less" scoped>
</style>
