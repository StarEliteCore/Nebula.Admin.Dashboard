// import Oidc from "oidc-client"
// import LoginConfig from "@/shared/config/loginconfig"
// import { TokenModule } from '@/store/modules/tokenmodule';
// const oidcmgr = new Oidc.UserManager(LoginConfig)

// /**
//  * 登录
//  */
// export const Login=()=>{
//     debugger
//     oidcmgr.signinRedirect(); //执行重定向
// }
// /**
//  * IdentityServer4登录完成之后回调事件
//  */
// export const loginCallbackFunc=()=>{
//     debugger
//     oidcmgr.signinRedirectCallback().then((res: Oidc.User) => {
//         // res.profile.name 用户名
//         // res.profile.sub 密码
//         if (res.access_token) {
//             TokenModule.SetToken(res.access_token);
//         }
//     })
//     .catch((e: any) => {
//         console.error(e);
//     });
// }