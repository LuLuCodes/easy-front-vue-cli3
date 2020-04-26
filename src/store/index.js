import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';
// import createPersistedState from 'vuex-persistedstate';

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
    async checkAuthToken({ commit, rootState }, { data }) {
      // 这里请求api，获取token
      return '123';
    },
    async login({ commit, rootState }, { data }) {
      // 这里请求api登录，并更新vuex
      await api.post({ url: '/user/login', data });
      return '';
    },
    async logout({ commit, rootState }, { data }) {
      // 这里请求api退出登录，并清理vuex
      await api.post({ url: '/user/logout', data });
      return '';
    }
  }
  // ,
  // plugins: [
  //   createPersistedState({
  //     storage: window.sessionStorage
  //   })
  // ]
});
