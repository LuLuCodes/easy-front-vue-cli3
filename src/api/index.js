import request from './request';
import md5 from 'crypto-js/md5';
import aes from 'crypto-js/aes';

const post = async ({ url, data, needSign = true } = {}) => {
  if (typeof data === 'object' && process.env.VUE_APP_ENABLE_SIGN && needSign) {
    const sign = md5(JSON.stringify(data));
    data.S = aes.encrypt(sign.toString().toUpperCase(), url).toString();
  }
  const res = await request.post(url, data);
  if (res) {
    if (res.IsSuccess) {
      if (Array.isArray(res.Data)) {
        return {
          List: res.Data,
          Paging: res.Paging
        };
      } else if (typeof res.Data === 'string') {
        return res.Data;
      } else if (res.Paging) {
        return {
          ...res.Data,
          Paging: res.Paging
        };
      } else {
        return res.Data;
      }
    } else {
      throw new Error(res.ErrorMsg);
    }
  }
};

const get = async ({ url, data, needSign = true } = {}) => {
  if (typeof data === 'object' && process.env.VUE_APP_ENABLE_SIGN && needSign) {
    const sign = md5(JSON.stringify(data));
    data.S = aes.encrypt(sign.toString().toUpperCase(), url).toString();
  }
  const res = await request.get(url, data);
  if (res) {
    if (res.IsSuccess) {
      if (Array.isArray(res.Data)) {
        return {
          List: res.Data,
          Paging: res.Paging
        };
      } else if (typeof res.Data === 'string') {
        return res.Data;
      } else if (res.Paging) {
        return {
          ...res.Data,
          Paging: res.Paging
        };
      } else {
        return res.Data;
      }
    } else {
      throw new Error(res.ErrorMsg);
    }
  }
};
const uploadFile = async formData => {
  const res = await request.request({
    method: 'post',
    url: '/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res;
};

export default {
  post,
  get,
  uploadFile
};
