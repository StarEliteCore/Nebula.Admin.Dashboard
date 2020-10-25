const defaultConsts = {
    userManagement: {
        defaultAdminUserName: "admin"
    },
    appBaseUrl: "http://localhost:8848",//前端站点
    token_root: "http://localhost:50001",//IdentityServer4站点
    response_type: "id_token token",//
    scope: 'openid profile roles Destiny.Core.Flow.API',
    menu:'menus',
    cookiename:"_token"
};

let env = process.env.NODE_ENV;
switch (env) {
    case "development":
        // 测试站点
        defaultConsts.appBaseUrl = "http://localhost:8848";
        defaultConsts.token_root = "http://localhost:50001";//"http://localhost:50001";
        break;
}
export default defaultConsts;