import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import api from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {},
  mutations: {

  },
  actions: {
    async postData({
      commit,
      rootState
    }, {
      url,
      data
    }) {
      try {
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
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});
