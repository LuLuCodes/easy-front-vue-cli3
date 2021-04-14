import request from './request';
import md5 from 'crypto-js/md5';
import aes from 'crypto-js/aes';

const post = async ({ url, data, needSign, option }) => {
  if (typeof data === 'object' && process.env.VUE_APP_ENABLE_SIGN && needSign) {
    delete data.sign;
    data.timestamp = Date.now();
    const sign = md5(JSON.stringify(data));
    data.sign = aes.encrypt(sign.toString(), url).toString();
  }
  const res = await request.post(url, data, option);
  if (res) {
    if (res.code === 0) {
      return res.data;
    } else {
      throw new Error(res.msg);
    }
  }
};

const uploadFile = async ({ url, data }) => {
  const res = await request.request({
    method: 'post',
    url,
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  if (res) {
    if (res.code === 0) {
      return res.data;
    } else {
      throw new Error(res.msg);
    }
  }
};

export default {
  post,
  uploadFile
};
