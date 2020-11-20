// import { Login } from '@/oidc-login/IdentityServerLogin';

import { GetToken, TokenModule } from "@/store/modules/tokenmodule";
import ApplicationUserManager from "@/shared/config/IdentityServerLogin";
import NoticeUtils from "@/shared/Noticemessage/NoticeUtils";
import axios from "axios";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
});
service.interceptors.request.use(
  (config) => {
    // Add Authorization header to every request, you can add other custom headers here
    const token = GetToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return response.data;
    }
  },
  (error) => {
    const response = error.response;
    switch (response.status) {
      case 500:
        NoticeUtils.Inst().Error("服务器异常",response.data.msg)
        break;
      case 401:
        console.log(response)
        debugger
        NoticeUtils.Inst().Warning("未登录，即将自动跳转登录页面",response.data.msg)
        setTimeout(() => {
          TokenModule.ResetToken();
          window.location.reload();
        }, 3000);
        ApplicationUserManager.Login();
        break;
      case 403:
        NoticeUtils.Inst().Error("权限不足，请联系管理人员", response.data.msg);
        break;
    }
    return Promise.reject(error);
  }
);
export default service;
