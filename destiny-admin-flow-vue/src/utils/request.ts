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
        return Promise.reject(response);
        break;
      case 401:
        ApplicationUserManager.Login();
        break;
      case 403:
        return Promise.reject(response);
    }
    return Promise.reject(error);
  }
);
export default service;
