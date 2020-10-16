import { TokenModule } from '@/store/modules/tokenmodule';
import axios from "axios"

console.log(process.env.VUE_APP_BASE_API)
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
});
service.interceptors.request.use(
    config => {
        // Add Authorization header to every request, you can add other custom headers here
    if (TokenModule.token) {
        console.log(TokenModule.token)
      config.headers["Authorization"] = `Bearer ${TokenModule.token}`;
    }
    return config;
    },
    error => {
        return Promise.reject(error);
    }
);
service.interceptors.response.use(
    response=>{
        if(response.status==200)
        {
            return response.data;
        }
    },
    error => {
        const response = error.response;
        return Promise.reject(error);
    }
)
export default service;