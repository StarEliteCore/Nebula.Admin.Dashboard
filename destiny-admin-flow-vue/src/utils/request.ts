import axios from "axios"
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
});
service.interceptors.request.use(
    config => {
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