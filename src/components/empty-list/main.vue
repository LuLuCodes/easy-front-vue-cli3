<template>
  <!-- 空列表组件 -->
  <section>
    <div class="img-auto f0 txt-c">
      <slot name="image">
        <img style="width:70px;" src="../../assets/images/common/blank.png" />
      </slot>
    </div>

    <p class="txt-c c-333 mt20">
      <slot name="title">您还没有订单，赶紧去下单购买吧</slot>
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
</style>
