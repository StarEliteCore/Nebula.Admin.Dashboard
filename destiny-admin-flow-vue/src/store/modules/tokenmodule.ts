import * as CookieInfo from "@/shared/cookie/Cookies"

import {
    Action,
    Module,
    Mutation,
    VuexModule,
    getModule
} from "vuex-module-decorators";

import defaultConsts from '@/shared/config/appconst';
import store from "@/store"


/**
 * 菜单模块
 */
@Module({ dynamic: true, store, name: "token" })
class TokenRouerStore extends VuexModule {
    /**
     * 
     * @param _menus 属性
     */
    @Mutation
    private SET_TOKEN(_token: string) {
        console.log(defaultConsts.cookiename);
        CookieInfo.setcookie(defaultConsts.cookiename, _token);
    }
    /**
     * 写入值
     */
    @Action
    public SetToken(_token: string) {
        this.SET_TOKEN(_token)
    }
    // 重置Token
    @Action
    public ResetToken() {
        CookieInfo.removecookie(defaultConsts.cookiename)
        // localStorage.clear();
    }
}

export const TokenModule = getModule(TokenRouerStore);//获取模块

export function GetToken(): string {
    return CookieInfo.getcookie(defaultConsts.cookiename) || "";
}
