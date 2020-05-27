<template functional>
  <!-- 路由加载失败组件 -->
  <div class="container">
    <section class="loading txt-c flex all-c">
      <div>
        <p class="f0">
          <img src="../../assets/images/common/loading-fail.svg" alt />
        </p>
        <h2 class="f15 c-666 pt17">加载页面失败</h2>
        <p class="f12 c-999 pt4 pb25">请检查您的设备是否联网</p>
        <van-button round type="default" onclick="window.location.reload();">重新加载</van-button>
      </div>
    </section>
  </div>
</template>
<script>

export default {
  name: 'router-error',
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
