// template.js 组件模板文件
module.exports = {
  vueTemplate: componentName => {
    return `<template>
  <div class="${componentName}">
    ${componentName}组件
  </div>
</template>
<script>
export default {
  name: '${componentName}',
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
  created() {},
  mounted() {},
  updated() {},
  beforeDestroy() {},
  watch: {},
  methods: {}
};
</script>
<style lang="less" scoped>
.${componentName} {

}
</style>
`;
  },
  entryTemplate: `import Main from './main.vue';
export default Main;`
};
