import { Component, Emit, Vue } from "vue-property-decorator";

import ApplicationUserManager from "@/shared/config/IdentityServerLogin";
import { MenuModule } from "@/store/modules/menumodule";
import { TokenModule } from "@/store/modules/tokenmodule";

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
    const key =
      "oidc.user:https://auth.destinycore.club:DestinyCoreFlowReactClient";
    const ids4Info = sessionStorage.getItem(key) as any;
    return JSON.parse(ids4Info).profile.name;
  }

  private formCustom: any = {
    newPassword: "",
    passwdCheck: "",
    oldPassword: "",
  };

  validatePass: any = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("请输入您的密码!!"));
    } else {
      if (this.formCustom.passwdCheck !== "") {
        // 对第二个密码框单独验证
        (this.$refs.formCustom as any).validateField("passwdCheck");
      }
      callback();
    }
  };
  validatePassCheck = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("请重新输入密码!"));
    } else if (value !== this.formCustom.newPassword) {
      callback(new Error("两个输入的密码不匹配！"));
    } else {
      callback();
    }
  };

  private ruleCustom = {
    oldPassword: [
      { required: true, message: "请输入上一次密码：", trigger: "blur" },
    ],
    newPassword: [{ validator: this.validatePass, trigger: "blur" }],
    passwdCheck: [{ validator: this.validatePassCheck, trigger: "blur" }],
  };
  isOpen: boolean = false;
  title: string = "修改密码";

  public OpenUpdatePaw() {
    this.isOpen = true;
  }

  handleSubmit(name: string) {
    (this.$refs[name] as any).validate((valid: any) => {
      if (valid) {
        this.$Message.success("修改密码成功！！！");
      } else {
        this.$Message.error("修改密码失败！！！");
      }
    });
  }
}
