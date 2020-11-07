import { Component, Emit, Vue } from "vue-property-decorator";

import LoginConfig from "@/shared/config/loginconfig"
import { MenuModule } from '@/store/modules/menumodule';
import Oidc from "oidc-client"
import { TokenModule } from '@/store/modules/tokenmodule';
import ApplicationUserManager from '@/shared/config/IdentityServerFourLogin';

@Component({
  name: "LayoutHeader",
})
export default class LayoutHeader extends Vue {

  private LogOut()
  {
    // localStorage.removeItem('access_token')
    Object.keys(localStorage).forEach(
      item =>
        item.indexOf('oidc.') != -1 ? localStorage.removeItem(item) : ''
    )
    Object.keys(sessionStorage).forEach(
      item =>
        item.indexOf('oidc.') != -1 ? sessionStorage.removeItem(item) : ''
    )
    TokenModule.ResetToken();
    localStorage.clear();
    MenuModule.RemoveMenus();
    ApplicationUserManager.Logout();
    // debugger
    // const oidcmgr = new Oidc.UserManager(LoginConfig);
    // const id_token=localStorage.getItem('id_token');

    // debugger
    // oidcmgr.signoutRedirect();

    // this.$router.push({
    //   name: "logout",
    // });
  }
}