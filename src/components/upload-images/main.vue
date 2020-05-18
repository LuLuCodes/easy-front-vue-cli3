<template>
  <!-- 上传图片组件 -->
  <div>
    <slot>
      <div class="f16 c-333 f-b">
        <span>门店照片</span>
      </div>
      <p class="c-666 f12 mt8">*限1张，单张大小不大于2MB</p>
    </slot>

    <div class="upload-list clearfix pt15">
      <div class="upload-item">
        <b class="txt-c chacha">
          <span class="icon icon-chacha f10 c-white"></span>
        </b>
        <img v-lazy="require('../../assets/images/shop.jpg')" />
      </div>
      <div class="upload-add txt-c fl">
        <span class="icon icon-add c-gray f-b f20"></span>
      </div>
    </div>
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
    max: {
      type: Number,
      default: 1
    },
    basePath: {
      type: String,
      default: ''
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
.upload-list .upload-item {
  position: relative;
  width: 90px;
  height: 90px;
  float: left;
  margin-right: 15px;
  text-align: center;
}
.upload-list .upload-item img {
  width: 100%;
  height: 100%;
}
.upload-list .upload-item .chacha {
  position: absolute;
  top: -7px;
  right: -7px;
  background: #d81e06;
  border-radius: 100%;
  width: 16px;
  height: 16px;
  line-height: 15px;
}
.upload-add {
  width: 90px;
  height: 90px;
  line-height: 90px;
  border: 1px dashed #e5e5e5;
}
</style>
