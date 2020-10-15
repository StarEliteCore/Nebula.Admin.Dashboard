import { Component, Vue, Watch } from "vue-property-decorator";

import LoginConfig from "@/shared/config/loginconfig"
import { MenuList } from '@/modules/static/menuindex';
import { MenuModule } from '@/store/modules/menumodule';
import Oidc from "oidc-client"
import { TokenModule } from '@/store/modules/tokenmodule';

console.log(LoginConfig)

const oidcmgr = new Oidc.UserManager(LoginConfig)
@Component({
    name: "Login"
})

export default class Login extends Vue {
    @Watch("$route.name", { immediate: true })//监听路由名称的变化
    WatchRoute(_name: string) {
        this.init(_name);
    }
    private created()
    {
      MenuModule.SetMenus(MenuList);
    }
    init(_name: string) {
        let name: string = _name ? _name : "";
        switch (name) {
            case "login":
                this.loginFunc();
                break;
            case "callback":
                this.loginCallbackFn();
                break;
            case "logout":
                this.logoutFn();
                break;
        }
    }
    /**
    * 登录
    */
    loginFunc() {
        oidcmgr.signinRedirect(); //执行重定向
    }
    /**
     * 登录重定向
     */
    loginCallbackFn() {
        oidcmgr
            .signinRedirectCallback()
            .then((res: Oidc.User) => {
                // res.profile.name 用户名
                // res.profile.sub 密码
                if (res.access_token) {
                    debugger
                    TokenModule.SetToken(res.access_token);
                    // ...  信息处理
                    // 跳转路由
                    this.$router.push({
                        path: "/home-page"
                    });
                }
            })
            .catch((e: any) => {
                console.error(e);
            });
    }
    /**
     * 退出登录
     */
    logoutFn() {
        // let vm = this;
        // // try {
        // debugger;
        // mgr
        //   .signoutRedirectCallback(tokenCofig.post_logout_redirect_uri)
        //   .then((res: any) => {
        //     // debugger;
        //     UserModule.ResetToken();
        //     this.$router.replace({
        //       name: "login"
        //     });
        //   })
        //   .catch((err: any) => {
        //     console.error(err)
        //   });
    }

}