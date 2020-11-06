import { UserManager } from "oidc-client";
import LoginConfig from "@/shared/config/loginconfig";

export class ApplicationUserManager extends UserManager {
    constructor() {
        super(LoginConfig)
    }
    /**
     * 登录
     */
    public async Login() {
        // console.log(LoginConfig.authority,LoginConfig.client_id,LoginConfig.redirect_uri,LoginConfig.response_type,LoginConfig.scope,LoginConfig.post_logout_redirect_uri)


        this.signinRedirect(); //执行重定向
    };
    /**
     * 登出
     */
    async Logout() {
        // debugger
        console.log(LoginConfig.post_logout_redirect_uri)
        return this.signoutRedirect();
    }
}
const applicationUserManager = new ApplicationUserManager();
export { applicationUserManager as default }
