import { UserManager } from "oidc-client"
import defaultConsts from "@/shared/config/appconst"

export class ApplicationUserManager extends UserManager {
    constructor() {
        super({
            authority: "https://auth.destinycore.club",
            client_id: "DestinyCoreFlowReactClient",
            redirect_uri: window.location.origin + "/callback",
            response_type: "id_token token",
            scope: "openid profile roles Destiny.Core.Flow.API",
            post_logout_redirect_uri: window.location.origin,
        })
        console.log({
            authority: "https://auth.destinycore.club",
            client_id: process.env.VUE_APP_CLIENT_ID,
            redirect_uri: window.location.origin + "/callback",
            response_type: "id_token token",
            scope: "openid profile roles Destiny.Core.Flow.API",
            post_logout_redirect_uri: window.location.origin,
        })
    }

    /**
     * IdentityServer4登录
     */
    public async Login() {
        /**
         * 登录重定向
         */
        console.log("______________________________==========================================")
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
