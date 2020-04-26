import Vue from 'vue';
import Vuex from 'vuex';
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
  actions: {}
  // ,
  // plugins: [
  //   createPersistedState({
  //     storage: window.sessionStorage
  //   })
  // ]
});
