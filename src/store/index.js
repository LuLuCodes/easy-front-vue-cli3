import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';
import storage from '@/utils/storage';
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keepAliveInclude: [],
    user: {
      CellPhoneNo: '',
      FaceUrl: '',
      OrganizationSysNo: 0,
      PersonName: '',
      PersonSysNo: 0,
      RealName: '',
      UserSysNo: 0
    }
  },
  modules: {},
  mutations: {
    updateKeepAliveInclude: (state, data) => {
      state.keepAliveInclude = data;
    },
    clearKeepAliveInclude: state => {
      state.keepAliveInclude = [];
    },
    updateLoginData: (state, user) => {
      state.user = user;
    }
  },
  actions: {
    async checkAuthToken({ commit, rootState }, { data = {} } = {}) {
      // 这里请求api，获取token
      const res = await api.post({ url: '/user/get-auth-token', data });
      return res;
    },
    async login({ commit, rootState }, { data = {} } = {}) {
      // 这里请求api登录，并更新vuex
      const res = await api.post({ url: '/user/login', data });
      commit('updateLoginData', res);
    },
    async logout({ commit, rootState }, { data = {} } = {}) {
      // 这里请求api退出登录，并清理vuex
      await api.post({ url: '/user/logout', data });
      storage.clear();
    },
    async updateUserInfo({ commit, rootState }, { data = {} } = {}) {
      const res = await api.post({ url: '/user/get-session-user', data });
      commit('updateLoginData', res);
    }
  }
  // ,
  // plugins: [
  //   createPersistedState({
  //     storage: window.sessionStorage
  //   })
  // ]
});
