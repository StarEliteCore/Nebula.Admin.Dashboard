import Vue from 'vue'
import Vuex from 'vuex'
import { IMenuRouerStore } from './modules/menumodule'
import { ITokenRouerStore } from './modules/tokenmodule'
Vue.use(Vuex)

/**
 * 模块接口
 */
export interface IRootState
{ 
  menu:IMenuRouerStore //菜单模块仓库
  token:ITokenRouerStore //菜单模块仓库
}



export default new Vuex.Store<IRootState>({})//挂载模块接口
