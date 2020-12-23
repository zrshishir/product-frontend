import Vue from 'vue'
import Vuex from 'vuex'
import auth from './module/auth'
import application from './module/application'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
      auth,
      application
  }
});
