import { Component, Emit, Vue } from "vue-property-decorator";

import ApplicationUserManager from '@/shared/config/IdentityServerLogin';
import { MenuModule } from '@/store/modules/menumodule';
import { TokenModule } from '@/store/modules/tokenmodule';

@Component({
  name: "LayoutHeader",
})
export default class LayoutHeader extends Vue {

  private LogOut() {
    TokenModule.ResetToken();
    ApplicationUserManager.Logout();
    this.$router.push({
      path: "/login",
    });
  }

  private GetUserName() {
    const key = "oidc.user:https://auth.destinycore.club:DestinyCoreFlowReactClient";
    const ids4Info = sessionStorage.getItem(key) as any;
    return JSON.parse(ids4Info).profile.name;
  }

}