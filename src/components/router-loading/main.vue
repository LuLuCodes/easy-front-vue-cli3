<template functional>
  <div class="container">
    <section class="loading txt-c flex all-c">
      <div>
        <p class="loading-icon f0">
          <img src="../../assets/images/common/loading.svg" alt />
        </p>
        <h2 class="f15 c-666 pt17">页面加载中...</h2>
      </div>
    </section>
  </div>
</template>
<script>

export default {
  name: 'router-loading',
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>
<style lang="less" scoped>
.loading {
  min-height: 100vh;
}
.loading img {
  width: 80px;
  height: 80px;
}
.loading p.loading-icon {
  animation: spin 500ms infinite linear;
  line-height: 1;
  width: 80px;
  height: 80px;
  margin: 0 auto;
}
.loading /deep/ .van-button {
  min-width: 140px;
}
</style>
