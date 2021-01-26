import { Component, Vue, Watch } from "vue-property-decorator";
import { GetMenus, MenuModule } from "@/store/modules/menumodule";
import { GetToken, TokenModule } from "@/store/modules/tokenmodule";

import ApplicationUserManager from "@/shared/config/IdentityServerLogin";
import { GetMenuList } from "@/modules/static/menuindex";
import { UserInfoModule } from '@/store/modules/userinfomodule';

// import { IMenuRouter } from '@/domain/entity/menudto/menuRouterDto';
// import { MainManager } from "@/domain/services/main/main-manager";





@Component({
  name: "Callback",
})
export default class Callback extends Vue {
  // @Watch("$route.name", { immediate: true }) //监听路由名称的变化
  // WatchRoute(_name: string) {
  //   this.init(_name);
  // }
  private created() {
    // console.log(555555555555555555555555555555555555555)
    this.loginCallbackFn().then(() => {
      this.$router.push({
        path: "/home-page",
      });
    })
      .catch((res) => {
        console.warn(res);
      });
  }
  async loginCallbackFn() {

    await ApplicationUserManager.signinRedirectCallback();
    let user = await ApplicationUserManager.getUser();
    if (user !== null) {
      if(typeof user.access_token!=="undefined"&& !GetToken())
      {
        TokenModule.SetToken(user.access_token);
        UserInfoModule.SetUserInfo(user.profile)
      }
      // console.log(user.profile)//用户信息
      // console.log("ssssssssss",GetMenus())
      if(!GetMenus())
      {
        // console.log(11111111111)
        const menuList = await GetMenuList();
        MenuModule.SetMenus(menuList);
        (this.$router as any).$addRoutes(menuList);
      }
    }
  }
  // async getVueDynamicRouterTreeAsync() {
  //   let res = await MainManager.Instance().MenuService.getVueDynamicRouterTreeAsync();
  //   console.log(res)
  // }

}
