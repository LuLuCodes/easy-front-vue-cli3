import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keepAliveInclude: [],
    user: {}
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
  }
  // ,
  // plugins: [
  //   createPersistedState({
  //     storage: window.sessionStorage
  //   })
  // ]
});
