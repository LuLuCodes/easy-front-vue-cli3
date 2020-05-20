<template>
  <!-- 用户协议组件 -->
  <van-popup :value="show" position="left" :style="{ width: '100%' }">
    <div class="container container-footer bg-gray">
      <footer class="footer-fixed flex all-c txt-c" @click="closePupop">
        <div class="btn btn-red flex-1 f18">我已了解</div>
      </footer>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'agreement',
  components: {},
  data() {
    return {};
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    closePupop() {
      this.$emit('update:show', false);
    }
  }
};
</script>
