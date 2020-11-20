import { Component, Vue, Watch } from "vue-property-decorator";

import ApplicationUserManager from "@/shared/config/IdentityServerLogin";
// import { IMenuRouter } from '@/domain/entity/menudto/menuRouterDto';
// import { MainManager } from "@/domain/services/main/main-manager";
import { GetMenuList } from "@/modules/static/menuindex";
import { MenuModule } from "@/store/modules/menumodule";
import { TokenModule } from "@/store/modules/tokenmodule";
import { UserInfoModule } from '@/store/modules/userinfomodule';

@Component({
  name: "Callback",
})
export default class Callback extends Vue {
  // @Watch("$route.name", { immediate: true }) //监听路由名称的变化
  // WatchRoute(_name: string) {
  //   this.init(_name);
  // }
  private created() {
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
      console.log(user)
      if(typeof user.access_token!=="undefined")
      {
        TokenModule.SetToken(user.access_token);
        UserInfoModule.SetUserInfo(user.profile)
      }
      // console.log(user.profile)//用户信息
      const menuList = await GetMenuList();
      MenuModule.SetMenus(menuList);
      (this.$router as any).$addRoutes(menuList);
    }
  }
  // async getVueDynamicRouterTreeAsync() {
  //   let res = await MainManager.Instance().MenuService.getVueDynamicRouterTreeAsync();
  //   console.log(res)
  // }

}
