import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import goods_create from "./modules/goods_create";
import user from "./modules/user";

Vue.use(Vuex);

const state = {};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    goods_create,
    user,
  },
});

export default store;
