import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
import md5 from 'crypto-js/md5';
import aes from 'crypto-js/aes';
import api from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keepAliveInclude: []
  },
  modules: {},
  mutations: {
    updateKeepAliveInclude: (state, data) => {
      state.keepAliveInclude = data;
    },
    clearKeepAliveInclude: state => {
      state.keepAliveInclude = [];
    }
  },
  actions: {
    async postData({ commit, rootState }, { url, data, needSign = true }) {
      if (
        typeof data === 'object' &&
        process.env.VUE_APP_ENABLE_SIGN &&
        needSign
      ) {
        const sign = md5(JSON.stringify(data));
        data.S = aes.encrypt(sign.toString().toUpperCase(), url).toString();
      }
      const res = await api.post(url, data);
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
    },
    async getData({ commit, rootState }, { url, data, needSign = true }) {
      if (
        typeof data === 'object' &&
        process.env.VUE_APP_ENABLE_SIGN &&
        needSign
      ) {
        const sign = md5(JSON.stringify(data));
        data.S = aes.encrypt(sign.toString().toUpperCase(), url).toString();
      }
      const res = await api.get(url, data);
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
    }
  }
  // ,
  // plugins: [
  //   createPersistedState({
  //     storage: window.sessionStorage
  //   })
  // ]
});
