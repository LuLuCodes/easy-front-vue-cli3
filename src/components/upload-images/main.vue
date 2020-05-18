<template>
  <!-- 上传图片组件 -->
  <div class="upload-add txt-c fl">
    <span class="icon icon-add c-gray f-b f20"></span>
  </div>
</template>
<script>
export default {
  name: 'upload-images',
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
.upload-add {
  width: 90px;
  height: 90px;
  line-height: 90px;
  border: 1px dashed #e5e5e5;
}
</style>
