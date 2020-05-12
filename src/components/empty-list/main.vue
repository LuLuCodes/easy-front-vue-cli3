<template functional>
  <section class="blank">
    <div class="img-auto f0 txt-c">
      <img style="width:70px;" src="../../assets/images/common/blank.png" />
    </div>
    <p class="txt-c c-333 mt20">
      您还没有订单，赶紧去“嘉品团”小程序
      <br />把好货分享给你的好友吧～
    </p>
  </section>
</template>

<script>
export default {
  name: 'empty-list',
  data() {
    return {};
  },
  props: {},
  watch: {},
  methods: {}
};
</script>
<style lang="less" scoped>
.blank {
  padding-top: 100px;
}
</style>
