import defaultConsts from "@/shared/config/appconst"
import { UserManager } from "oidc-client"

export class ApplicationUserManager extends UserManager {
    constructor() {
        super({
            authority: defaultConsts.token_root,
            client_id: defaultConsts.client_id,
            redirect_uri: defaultConsts.redirect_uri,
            response_type: defaultConsts.response_type,
            scope: defaultConsts.scope,
            post_logout_redirect_uri: defaultConsts.appBaseUrl,
        })
    }

    /**
     * IdentityServer4登录
     */
    public async Login() {
        /**
         * 登录重定向
         */
        this.signinRedirect();
    }
    /**
     * 退出登录
     */
    public async Logout() {
        return this.signoutRedirect();
    }
}
const applicationUserManager = new ApplicationUserManager();
export { applicationUserManager as default };
