// import { Login } from '@/oidc-login/IdentityServerLogin';
import NoticeUtils from '@/shared/Noticemessage/NoticeUtils';
import { TokenModule, GetToken } from '@/store/modules/tokenmodule';
import axios from "axios"
import ApplicationUserManager from '@/shared/config/IdentityServerLogin';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
});
service.interceptors.request.use(
    config => {
        // Add Authorization header to every request, you can add other custom headers here
        const token = GetToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
service.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return response.data;
        }
    },
    error => {
        const response = error.response;
        switch (response.status) {
            case 500:
                //   NoticeUtils.Inst().Error("服务器错误", response.data.msg);
                break;
            case 401:
                // NoticeUtils.Inst().Warning("未登录","12312131313");
                //TokenModule.ResetToken();
                ApplicationUserManager.Login();
                // Login();
                break;
            case 403:

                //   NoticeUtils.Inst().Error("权限不足", response.data.msg);
                break;
        }
        return Promise.reject(error);
    }
)
export default service;