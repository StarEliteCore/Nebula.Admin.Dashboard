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
@Module({ dynamic: true, store, name: "userinfo" })
class UserInfoStore extends VuexModule {
    /**
     * 
     * @param _menus 属性
     */
    @Mutation
    private SET_USERINFO(_user: any) {
        let _userString = JSON.stringify(_user);
        localStorage.setItem(defaultConsts.userinfo, _userString)
    }
    /**
     * 
     * @param _menus 属性
     */
    @Mutation
    private Remove_USERINFO() {
        localStorage.removeItem(defaultConsts.userinfo)
    }
    /**
     * 写入值
     */
    @Action
    public SetUserInfo(_user: any) {
        this.SET_USERINFO(_user)
    }
        /**
     * 清除用户信息
     */
    @Action
    public RemoveUserInfo() {
        this.Remove_USERINFO()
    }
}
export const UserInfoModule = getModule(UserInfoStore);//获取模块

export function GetUserInfo(): string {
    return localStorage.getItem(defaultConsts.userinfo) || "";
}