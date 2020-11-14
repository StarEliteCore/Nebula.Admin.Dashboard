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
}