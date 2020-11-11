import { Component, Emit, Vue } from "vue-property-decorator";

import { MenuModule } from '@/store/modules/menumodule';
import { TokenModule } from '@/store/modules/tokenmodule';
import ApplicationUserManager  from '@/shared/config/IdentityServerLogin';

@Component({
  name: "LayoutHeader",
})
export default class LayoutHeader extends Vue {

  private LogOut()
  {
    debugger
    TokenModule.ResetToken();
    // MenuModule.RemoveMenus();
    ApplicationUserManager.Logout();
    this.$router.push({
      path: "/login",
    });
  }
}