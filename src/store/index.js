import Vue from "vue";
import Vuex from "vuex";
import images from "./modules/images";
import messages from "./modules/messages";
import user from "./modules/user";
import common from "./modules/common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    images,
    messages,
    user,
    common
  }
});
