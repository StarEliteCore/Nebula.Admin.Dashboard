const defaultConsts = {
    userManagement: {
        defaultAdminUserName: "admin"
    },
    appBaseUrl: "http://localhost:8848",//前端站点
    token_root: "http://localhost:50001",//IdentityServer4站点
    response_type: "id_token token",//
    scope: 'openid profile roles Destiny.Core.Flow.API',
    menu: 'menus',
    cookiename: "_token",
    client_id: "DestinyCoreFlowReactClient",
};

let env = process.env.NODE_ENV;
switch (env) {
    case "development":
        // 测试站点
        defaultConsts.appBaseUrl = "http://localhost:8848";
        defaultConsts.token_root = "https://auth.destinycore.club";//"http://localhost:50001";
        defaultConsts.client_id = "DestinyCoreFlowReactClient";
        break;
    case "production":
        // defaultConsts.appBaseUrl = "http://10.1.40.210:9863";
        // defaultConsts.remoteServiceBaseUrl = "http://10.1.40.207:8042";
        defaultConsts.token_root = "https://auth.destinycore.club";
        defaultConsts.client_id = "DestinyCoreFlowReactClient";
        break;
}
export default defaultConsts;