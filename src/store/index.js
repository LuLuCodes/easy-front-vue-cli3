import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import md5 from 'crypto-js/md5';
import api from '../api';

// 设置公钥
const pem = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoVF1Z6CSMKdNPtdkuNQWCIYiZ
ZTvjEuEOAEPo0z2rz6A/m6byE8B84V69f+xtNg9s1QtZ0jLW3Lvumps1GmLSXwCX
rJOcKm+3jmB3+KecXTguJMJHEkxvLYUKk270ennfSq7uQZ9P9iIEDgHHaQMJd/I5
M6E1RulpjXQt5cpzUQIDAQAB
-----END PUBLIC KEY-----`;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {},
  mutations: {},
  actions: {
    async postData({ commit, rootState }, { url, data, need_sing = true }) {
      try {
        if (typeof data === 'object' && process.env.VUE_APP_ENABLE_SIGN && need_sing) {
          let sign = md5(JSON.stringify(data));
          // Encrypt with the public key...
          let encrypt = new window.JSEncrypt();
          encrypt.setPublicKey(pem);
          data.S = encrypt.encrypt(sign.toString().toUpperCase());
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
