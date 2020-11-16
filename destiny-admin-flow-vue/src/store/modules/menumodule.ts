import {
    Action,
    Module,
    Mutation,
    VuexModule,
    getModule
} from "vuex-module-decorators";

import { Guid } from 'guid-typescript';
import { IMenuRouter } from '@/domain/entity/menudto/menuRouterDto';
import { MenuEnum } from '@/domain/entity/menudto/menuDto';
import defaultConsts from "@/shared/config/appconst"
import store from "@/store"

/**
 * 菜单模块
 */
@Module({ dynamic: true, store, name: "menu" })
class MenuRouerStore extends VuexModule {
    /**
     * 
     * @param _menus 属性
     */
    @Mutation
    private SET_MENUS(_menus: Array<IMenuRouter>) {
        // _menus.unshift(this.defaulthomepage);
        // console.log(_menus)
        let _menuString = JSON.stringify(_menus);
        localStorage.setItem(defaultConsts.menu, _menuString)
    }
    /**
     * 
     * @param _menus 属性
     */
    @Mutation
    private Remove_MENUS() {
        localStorage.removeItem(defaultConsts.menu)
    }
    /**
     * 写入值
     */
    @Action
    public SetMenus(_menus: Array<IMenuRouter>) {
        this.SET_MENUS(_menus)
    }
    /**
     * 清除用户路由
     */
    @Action
    public RemoveMenus() {
        this.Remove_MENUS()
    }
}

export const MenuModule = getModule(MenuRouerStore);//获取模块

export function GetMenus(): string {
    return localStorage.getItem(defaultConsts.menu) || "";
}


