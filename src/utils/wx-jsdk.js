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
