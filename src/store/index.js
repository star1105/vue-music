import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // 提示修改数据的插件

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' // 开发环境的调试工具

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug, // 开发环境的调试工具
  plugins: debug ? [createLogger()] : [] // 提示修改数据的插件，可以自定义(高级)
})