import { Component, Vue, Watch } from "vue-property-decorator";

import ApplicationUserManager from "@/shared/config/IdentityServerLogin";
import { IMenuRouter } from '@/domain/entity/menudto/menuRouterDto';
import { MainManager } from "@/domain/services/main/main-manager";
import { GetMenuList } from "@/modules/static/menuindex";
import { MenuModule } from "@/store/modules/menumodule";
import { TokenModule } from "@/store/modules/tokenmodule";
import router from "@/router/index";

@Component({
  name: "Login",
})
export default class Login extends Vue {
  // @Watch("$route.name", { immediate: true }) //监听路由名称的变化
  // WatchRoute(_name: string) {
  //   this.init(_name);
  // }
  private created() {
    // TokenModule.ResetToken();
    // await this.loginCallbackFn();
    // // debugger
    // this.$router.push({
    //   path: "/home-page",
    // });
  }
  async loginCallbackFn() {

    await ApplicationUserManager.signinRedirectCallback();

    // debugger;
    let user = await ApplicationUserManager.getUser();
    console.log(user)
    // console.log(user);
    if (user !== null) {
      TokenModule.SetToken(user.access_token);
      const menuList = await GetMenuList();
      MenuModule.SetMenus(menuList);
      (router as any).$addRoutes(menuList);
    }
  }
  async getVueDynamicRouterTreeAsync() {
    let res = await MainManager.Instance().MenuService.getVueDynamicRouterTreeAsync();
    console.log(res)
  }

}
