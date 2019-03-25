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
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
}
</script>
<style lang="less" scoped>
.${componentName} {

}
</style>
`;
  },
  entryTemplate: `import Main from './main.vue'
export default Main`
};
