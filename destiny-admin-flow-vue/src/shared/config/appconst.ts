const defaultConsts = {
    userManagement: {
      defaultAdminUserName: "admin"
    },
    localization: {
      defaultLocalizationSourceName: "Vicutu"
    },
    appBaseUrl: "http://localhost:8848",
    redirect_uri:"http://localhost:8848/callback",
    token_root: "http://localhost:9800",
    response_type: "id_token token",
    client_id: "DestinyCoreFlowReactClient",
    scope:"openid profile roles Destiny.Core.Flow.API",
    cookiename:"destiny_token",
    menu:"destiny_menu"
  };
  let env = process.env.NODE_ENV;
  switch (env) {
    case "development":
      // 测试站点
      defaultConsts.appBaseUrl = "http://localhost:8848";
      defaultConsts.redirect_uri = "http://localhost:8848/callback";
      defaultConsts.token_root = "https://auth.destinycore.club";
      defaultConsts.client_id = "DestinyCoreFlowReactClient";
      break;
    case "production":
      break;
  }
  export default defaultConsts;




