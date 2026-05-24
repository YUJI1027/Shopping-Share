import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    userGroups: [],
    isLoading: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserGroups(state, groups) {
      state.userGroups = groups;
    },
    setLoading(state, loading) {
      state.isLoading = loading;
    },
  },
  actions: {
    async fetchUser({ commit }) {
      commit('setLoading', true);
      // Fetch user data from API
      const userData = await fetch('/api/user').then(res => res.json());
      commit('setUser', userData);
      commit('setLoading', false);
    },
    async fetchUserGroups({ commit }) {
      commit('setLoading', true);
      // Fetch user groups from API
      const groupsData = await fetch('/api/user/groups').then(res => res.json());
      commit('setUserGroups', groupsData);
      commit('setLoading', false);
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    getUserGroups(state) {
      return state.userGroups;
    },
  },
});