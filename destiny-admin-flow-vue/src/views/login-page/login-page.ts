import { Component, Vue, Watch } from "vue-property-decorator";

import ApplicationUserManager from "@/shared/config/IdentityServerLogin";
import { IMenuRouter } from '@/domain/entity/menudto/menuRouterDto';
import { MainManager } from "@/domain/services/main/main-manager";
import { MenuList } from "@/modules/static/menuindex";
import { MenuModule } from "@/store/modules/menumodule";
import { TokenModule } from "@/store/modules/tokenmodule";

@Component({
  name: "Login",
})
export default class Login extends Vue {
  // @Watch("$route.name", { immediate: true }) //监听路由名称的变化
  // WatchRoute(_name: string) {
  //   this.init(_name);
  // }
  private created() {
    this.loginCallbackFn();
  }
  async loginCallbackFn() {
    await ApplicationUserManager.signinRedirectCallback();
    // debugger;
    let user = await ApplicationUserManager.getUser();
    // console.log(user);
    if (user !== null) {
      TokenModule.SetToken(user.access_token);
      // this.getUserMenuTree();
      this.$router.push({
        path: "/home-page",
      });
    }
  }
  private getVueDynamicRouterTreeAsync() {
    MainManager.Instance()
      .MenuService.getVueDynamicRouterTreeAsync()
      .then((x) => {
        const data=x.data.itemList
        MenuModule.SetMenus(data as IMenuRouter[]);
      });
  }
}
