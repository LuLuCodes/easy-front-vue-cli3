export async function initWxJSSDK() {
  try {
    const reuslt = await this.$api.post({
      url: '/wx/jssdk',
      data: {
        url: location.href.split('#')[0]
      }
    });
    window.wx.config({
      debug: false,
      appId: reuslt.AppId,
      timestamp: reuslt.Timestamp,
      nonceStr: reuslt.NonceStr,
      signature: reuslt.Signature,
      jsApiList: [
        'scanQRCode',
        'getLocation',
        'chooseImage',
        'previewImage'
        // 'showMenuItems',
        // 'updateTimelineShareData',
        // 'updateAppMessageShareData',
        // 'hideOptionMenu',
        // 'hideMenuItems',
        // 'hideAllNonBaseMenuItem',
        // 'uploadImage',
        // 'downloadImage',
        // 'chooseWXPay'
      ]
    });
    window.wx.error(function (res) {
      console.error(res);
    });
  } catch (e) {
    console.error(e);
  }
}

export function chooseImage({
  count = 9,
  sourceType = ['album', 'camera']
} = {}) {
  return new Promise((resolve, reject) => {
    window.wx.chooseImage({
      count,
      sizeType: ['compressed'],
      sourceType, // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        resolve(res.localIds);
      },
      fail: function(error) {
        reject(error);
      }
    });
  });
}

export function getLocalImgData(localId) {
  return new Promise((resolve, reject) => {
    window.wx.getLocalImgData({
      localId: localId,
      success: async function(res) {
        resolve(res);
      },
      fail: function(error) {
        reject(error);
      }
    });
  });
}

export function previewImage({ current = '', urls = [] } = {}) {
  window.wx.previewImage({
    current: '', // 当前显示图片的http链接
    urls: [] // 需要预览的图片http链接列表
  });
}
