<template>
  <div class="home-list-item">
    <p class="main-pic img-auto flex all-c">
      <img src="../../assets/images/avatar.png" alt />
    </p>
    <p class="store-name f0">
      <span class="f12 txt-elips">国药大药房</span>
    </p>
    <h3 class="txt-elips">
      <b>切诺 桉柠蒎肠溶软胶囊 急慢性鼻窦炎支气管炎肺炎</b>
    </h3>
    <p>
      <span class="f24 c-red">¥</span>
      <b class="f24 c-red">41.9</b>
      <span class="f11 c-gray l-t plr6">￥50.9</span>
    </p>
    <p>
      <b class="f16 lb-vm">￥38.9</b>
      <span class="lb-vm label-diamond f0 ml5">
        <img src="../../assets/images/common/label-diamond.svg" alt />
      </span>
    </p>
    <p class="f12 mt10">
      <span class="c-gray">赚取元气</span>
      <span class="c-red">419</span>
    </p>
  </div>
</template>
<script>
export default {
  name: 'home-goods-item',
  components: {},
  data() {
    return {};
  },
  props: {},
  computed: {},
  created() {
    console.log('this is created');
  },
  mounted() {
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
.goods-item {
}
</style>
