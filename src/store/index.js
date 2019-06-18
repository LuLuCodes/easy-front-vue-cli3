import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import md5 from 'crypto-js/md5';
import CryptoJS from 'crypto-js';
// import NodeRSA from 'node-rsa';
import api from '../api';

// 设置公钥
// const pem = `-----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJuYYs3NoRMLVBCPqpROHu3K5V
// 50ZxluIPC6I13vl0vuu1XuAt88gpC5zERI9x8KSzzhHRKAKmbvTCKHDTJINwCfvu
// OhzjxUPNxWvLVF1aioIVsdmAqpkYsislydtOSB8VNT0sELDbHRWS5+6USYs92hLy
// 1/mK/AATLsvKR0KmlQIDAQAB
// -----END PUBLIC KEY-----`;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    iv: 'iv-test'
  },
  modules: {},
  mutations: {},
  actions: {
    async postData({ commit, rootState }, { url, data, need_sign = true }) {
      try {
        if (typeof data === 'object' && process.env.VUE_APP_ENABLE_SIGN && need_sign) {
          let sign = md5(JSON.stringify(data));
          // JSEncrypt...
          // let encrypt = new window.JSEncrypt();
          // encrypt.setPublicKey(pem);
          // data.S = encrypt.encrypt(sign.toString().toUpperCase()); // 加密明文
          // console.log('error', data.S.length);
          // data.S = btoa(data.S).replace(/\+/g, '%$#%');

          // NodeRSA...
          // console.log('data.S: ', data.S);
          // let publicKey = new NodeRSA(pem, 'pkcs8-public', {
          //   environment: 'browser',
          //   encryptionScheme: 'pkcs1'
          // });
          // data.S = publicKey.encrypt(sign.toString().toUpperCase(), 'base64');
          data.S = CryptoJS.AES.encrypt(sign.toString().toUpperCase(), rootState.iv).toString();
          console.log('data.S: ', data.S);
        }
        let res = await api.post(url, data);
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
      } catch (error) {
        throw error;
      }
    }
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});
