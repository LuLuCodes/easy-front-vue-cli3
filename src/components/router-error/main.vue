<template>
  <!--你这里需要给小姐姐给你设计UI-->
  <div class="router-error">路由加载失败</div>
</template>
<script>
export default {
  name: 'router-error',
  components: {},
  data() {
    return {};
  },
  props: {
    prop: {
      type: Object,
      default() {
        return {};
      }
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
  methods: {}
};
</script>
<style lang="less" scoped>
.router-error {
}
</style>
