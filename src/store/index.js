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
        let resData = res.data;
        if (resData.IsSuccess) {
          if (Array.isArray(resData.Data)) {
            return {
              List: resData.Data,
              Paging: resData.Paging
            };
          } else if (resData.Paging) {
            return {
              ...resData.Data,
              Paging: resData.Paging
            };
          } else {
            return resData.Data;
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
