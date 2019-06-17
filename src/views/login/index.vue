<template>
  <div class="login.vue">
    login.vue组件
  </div>
</template>
<script>
export default {
  name: 'login.vue',
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    this.init();
  },
  watch: {},
  methods: {
    async init() {
      await this.$store.dispatch('postData', {
        url: '/login',
        data: {
          Extra: {
            IndustryClassSysNoList: [1018804],
            Limit: { IsShowFileThumbnailUrlList: 1, IsShowSkuInventory: 1 }
          },
          Filters: [
            { DataType: 'LJProductGroup', Except: ['ProductGroupDetail'] }
          ],
          Sorts: [{ SortName: 'SortNo', SortType: 'ASC' }],
          PageIndex: 0,
          PageSize: 0
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login.vue {
}
</style>
