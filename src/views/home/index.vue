<template>
  <div class="container container-footer home bg-gray">
    <!-- 头部banner -->
    <section
      class="home-top"
      :style="{
        backgroundImage:
          'url(' + require('../../assets/images/home/' + 'bg-banner.jpg') + ')'
      }"
      style=" background-repeat: no-repeat; background-size: 100% 100%;"
    >
      <div
        class="home-top-fix"
        :style="{
          backgroundImage:
            'url(' +
            require('../../assets/images/home/' + 'bg-banner.jpg') +
            ')'
        }"
        style=" background-repeat: no-repeat; background-size: 100% auto"
      >
        <!-- 头部搜索 -->
        <div class="home-top-search flex all-c">
          <van-search placeholder="搜索商品、分类" shape="round" class="flex-1">
            <span class="icon icon-search" slot="left-icon"></span>
          </van-search>
          <van-icon class-prefix="icon" name="kefu" />
        </div>

        <!-- 头部分类导航 -->
        <section class="home-top-nav pos-r">
          <van-tabs v-model="active" :swipe-threshold="4">
            <van-tab title="推荐"></van-tab>
            <van-tab title="分类"></van-tab>
            <van-tab title="分类"></van-tab>
            <van-tab title="分类"></van-tab>
            <van-tab title="分类"></van-tab>
            <van-tab title="分类"></van-tab>
            <van-tab title="分类最"></van-tab>
          </van-tabs>
          <div class="nav-more-shadow pos-ab"></div>
          <div class="nav-more pos-ab" style="background:#D58E44">
            <van-icon name="wap-nav" color="#fff" />
          </div>
        </section>
      </div>

      <!-- 头部banner -->
      <section class="home-banner">
        <van-swipe :autoplay="3000" indicator-color="white" class="banner-swip">
          <van-swipe-item class="f0">
            <img src="../../assets/images/banner.jpg" alt />
          </van-swipe-item>
          <van-swipe-item class="f0">
            <img src="../../assets/images/banner1.jpg" alt />
          </van-swipe-item>
          <van-swipe-item class="f0">
            <img src="../../assets/images/banner2.png" alt />
          </van-swipe-item>
        </van-swipe>
      </section>
    </section>

    <!-- 分类导航 -->
    <section class="home-class txt-c">
      <div>
        <p class="img-auto">
          <img src="../../assets/images/svg.svg" alt />
        </p>
        <h2 class="f13">女性健康</h2>
      </div>
      <div>
        <p class="img-auto">
          <img src="../../assets/images/home/class1.png" alt />
        </p>
        <h2 class="f13">女性健康</h2>
      </div>
      <div>
        <p class="img-auto">
          <img src="../../assets/images/home/class1.png" alt />
          <span>
            <img src="../../assets/images/home/hot.png" alt />
          </span>
        </p>
        <h2 class="f13">女性健康</h2>
      </div>
      <div>
        <p class="img-auto">
          <img src="../../assets/images/home/class1.png" alt />
        </p>
        <h2 class="f13">女性健康</h2>
      </div>
      <div>
        <p class="img-auto">
          <img src="../../assets/images/home/class1.png" alt />
        </p>
        <h2 class="f13">女性健康</h2>
      </div>
      <div>
        <p class="img-auto">
          <img src="../../assets/images/home/class1.png" alt />
        </p>
        <h2 class="f13">女性健康</h2>
      </div>
      <div>
        <p class="img-auto">
          <img src="../../assets/images/home/class1.png" alt />
        </p>
        <h2 class="f13">女性健康</h2>
      </div>
    </section>

    <!-- 分类楼层 -->
    <section class="home-floor">
      <h2 class="home-floor-title txt-c">
        <b class="f16">推荐分类</b>
      </h2>
      <div class="home-list clearfix">
        <div class="home-list-item">
          <p class="main-pic img-auto flex all-c">
            <img src="../../assets/images/goods.jpg" alt />
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
        <div class="home-list-item">
          <p class="main-pic img-auto flex all-c">
            <img src="../../assets/images/banner1.jpg" alt />
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
      </div>
    </section>

    <!-- 底部导航 -->
    <van-tabbar v-model="active" :z-index="100" class="tab-bar">
      <van-tabbar-item>
        <span>健康商城</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active : icon.normal"
        />
      </van-tabbar-item>
      <van-tabbar-item>
        <span>测量体温</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon1.active : icon1.normal"
        />
      </van-tabbar-item>
      <van-tabbar-item>
        <span>团队</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon2.active : icon2.normal"
        />
      </van-tabbar-item>
      <van-tabbar-item>
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon3.active : icon3.normal"
        />
      </van-tabbar-item>
    </van-tabbar>

    <!-- 确认邀请人弹窗 -->
    <van-popup v-model="show" class="popup-radius txt-c popup-nopadding">
      <div class="popup-container">
        <div class="popup-header">
          <p class="c-white f18">请确认邀请人</p>
        </div>
        <div class="pop-light-bg pos-r">
          <div class="pop-conbg">
            <div class="avatar popup-img mar-b-10">
              <img src="../../assets/images/avatar.png" />
            </div>
            <P class="f16 pt8">邀请你加入护驾健康管理</P>
          </div>
        </div>
        <div class="dialog-footer flex txt-c f16">
          <p class="flex-1 van-hairline--top">取消</p>
          <p class="flex-1 btn-gradient">确定</p>
        </div>
      </div>
    </van-popup>
    <!-- 联系客服弹窗 -->
    <van-popup
      v-model="showLink"
      position="center"
      class="popup-radius popup-talk txt-c"
    >
      <span class="icon icon-close f16"></span>
      <p class="f24 c-333 pt25 pb25 f-b">联系客服</p>
      <div class="qr-img img-auto">
        <img src="../../assets/images/home/qr.jpg" />
      </div>
      <p class="c-brown f14">保存上方客服名片，添加客服微信</p>
      <div class="btn-bg">
        <button class="popup-red-btn f18 c-white">保存客服名片</button>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      show: true,
      showLink: false,
      icon: {
        normal: require('../../assets/images/common/store.png'),
        active: require('../../assets/images/common/store-on.png')
      },
      icon1: {
        normal: require('../../assets/images/common/thermometer.png'),
        active: require('../../assets/images/common/thermometer-on.png')
      },
      icon2: {
        normal: require('../../assets/images/common/friend.png'),
        active: require('../../assets/images/common/friend-on.png')
      },
      icon3: {
        normal: require('../../assets/images/common/my.png'),
        active: require('../../assets/images/common/my-on.png')
      }
    };
  },
  computed: {},
  // mounted() {
  //   this.init();
  // },
  watch: {},
  methods: {}
};
</script>
<style lang="less" scoped>
.home-top {
  min-height: 298px;
}
.home-top-fix {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 4;
}
.home-top /deep/ .van-search {
  background: transparent !important;
  padding: 27px 15px 15px;
}
.home-top /deep/ .van-search__content {
  background: rgba(255, 255, 255, 0.2);
}
.home-top /deep/ .van-field__control,
.home-top /deep/ .van-field__control::placeholder {
  color: #fff;
}
.home-top /deep/ .van-field__left-icon .icon {
  color: #fff;
  font-size: 15px;
}
.home-top .icon-kefu {
  color: #fff;
  margin: 12px 15px 0 0;
  font-size: 30px;
  line-height: 1;
}
.home-top /deep/ .van-tab {
  font-size: 16px;
  color: #fff;
  line-height: 35px;
}
.home-top /deep/ .van-tab.van-tab--active {
  font-size: 18px;
}
.home-top /deep/ .van-tabs__nav {
  background: transparent !important;
  margin-right: 50px;
}
.home-top /deep/ .van-tabs--line .van-tabs__wrap {
  height: 35px;
}
.home-top /deep/ .van-tabs__line {
  display: none;
}
.home-top /deep/ [class*='van-hairline']::after {
  border-color: #fff;
}
.nav-more-shadow {
  top: 1px;
  right: 40px;
  z-index: 2;
  width: 13px;
  height: 33px;
  background: url('../../assets/images/home/line.svg') no-repeat top;
  background-size: cover;
}
.nav-more {
  top: 1px;
  right: 0;
  width: 46px;
  z-index: 3;
  height: 33px;
  text-align: center;
}
.home-top .van-icon-wap-nav {
  font-size: 22px;
  line-height: 1;
  margin-top: 5px;
}

.home-banner {
  padding: 123px 0 0 0;
  overflow: hidden;
  height: 158px;
}
.banner-swip /deep/ .van-swipe-item {
  height: 158px;
  padding: 0 15px;
  box-sizing: border-box;
  width: 100%;
}
.banner-swip img {
  height: 158px;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
}

.home-class {
  background: url('../../assets/images/home/bg-class.png') no-repeat top center;
  background-size: 100% auto;
  margin-top: -6px;
  z-index: 2;
  position: relative;
  overflow: hidden;
  padding: 20px 0 2px;
}
.home-class > div {
  float: left;
  width: 20%;
  margin-bottom: 14px;
}
.home-class .img-auto {
  width: 46px;
  height: 46px;
  margin: 0 auto 4px;
  position: relative;
}
.home-class .img-auto > img {
  width: 46px;
  height: 46px;
  border-radius: 100%;
  overflow: hidden;
}
.home-class .img-auto > span {
  position: absolute;
  top: -2px;
  right: 0;
}
.home-class .img-auto > span img {
  width: 23px;
}

.home-floor-title {
  padding: 18px 5px 15px;
}
.home-floor-title b {
  background: url('../../assets/images/common/bg-title.svg') no-repeat center;
  background-size: 100% 11px;
  display: inline-block;
  padding: 0 25px;
}

.home-list {
  padding-left: 2%;
}
.home-list-item {
  background: #fff;
  margin: 0 2% 5px 0;
  height: 328px;
  width: 48%;
  float: left;
  padding: 10px;
  box-sizing: border-box;
}
.home-list-item .main-pic {
  height: 160px;
  margin-bottom: 10px;
}
.home-list-item .main-pic img {
  max-height: 160px;
}
.home-list-item .store-name {
  height: 22px;
  line-height: 22px;
  background: url('../../assets/images/common/label-left.png') no-repeat left
    center;
  background-size: auto 100%;
  color: #fff;
  padding-left: 21px;
}
.home-list-item .store-name span {
  height: 22px;
  line-height: 22px;
  background: url('../../assets/images/common/label-right.png') no-repeat right
    center;
  background-size: auto 100%;
  display: inline-block;
  padding-right: 8px;
  max-width: 100%;
}

.home-list-item h3 {
  padding: 6px 0;
}

.popup-radius {
  width: 80%;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
}
.popup-radius .icon-close {
  position: absolute;
  top: 20px;
  right: 20px;
}
.popup-nopadding {
  padding: 0;
}
.pop-light-bg {
  height: 120px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 248, 233, 1) 100%
  );
}
.pop-conbg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  height: 120px;
  padding-bottom: 20px;
  background: url(../../assets/images/home/bg-pop.png) no-repeat left bottom -18px;
  background-size: 100% auto;
}
.popup-header {
  height: 85px;
  background: url('../../assets/images/home/bg-pop-top.svg') center/cover
    no-repeat;
  p {
    line-height: 74px;
  }
}
.popup-img {
  margin-top: -20px;
  width: 78px;
  height: 78px;
  border: 2px solid #fff;
}
.dialog-footer {
  height: 48px;
  line-height: 48px;
}
.dialog-footer .btn-gradient {
  background: #ebc981;
  color: #db1b23;
}
.popup-talk {
  width: 85%;
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 248, 233, 1) 100%
  );
}
.qr-img {
  width: 180px;
  height: 180px;
  margin: 0 auto 30px auto;
}
.btn-bg {
  background: url(../../assets/images/home/bg-pop.png) no-repeat left bottom;
  background-size: 100% auto;
  padding: 30px 0 35px;
}
.popup-red-btn {
  border: 0 none;
  height: 47px;
  line-height: 47px;
  width: 65%;
  background: #db1b23;
  box-shadow: 0px 0px 5px 0px rgba(231, 87, 93, 1);
  border-radius: 25px;
}
</style>
