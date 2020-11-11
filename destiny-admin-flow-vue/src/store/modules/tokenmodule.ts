import * as CookieInfo from "@/shared/cookie/Cookies"

import {
    Action,
    Module,
    Mutation,
    VuexModule,
    getModule
} from "vuex-module-decorators";

import { IMenuRouter } from '@/domain/entity/menudto/menuRouterDto';
import defaultConsts from '@/shared/config/appconst';
import store from "@/store"

export interface ITokenRouerStore
{
    token:string 
}

/**
 * 菜单模块
 */
@Module({dynamic:true,store,name:"token"})
class TokenRouerStore extends VuexModule implements ITokenRouerStore{
    token: string=CookieInfo.getcookie(defaultConsts.cookiename)|| "";
    /**
     * 
     * @param _menus 属性
     */
    @Mutation
    private SET_TOKEN(_token:string)
    {
        CookieInfo.setcookie(defaultConsts.cookiename,_token);
    }
    /**
     * 写入值
     */
    @Action
    public SetToken(_token:string) {
        this.SET_TOKEN(_token)
    }
    // 重置Token
  @Action
  public ResetToken() {
    CookieInfo.removecookie(defaultConsts.cookiename)
    localStorage.clear();
  }
}

export const TokenModule =getModule(TokenRouerStore);//获取模块
