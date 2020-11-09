import { IDataRequest } from "./index";
import { AxiosInstance, Method } from "axios";
export default class DataRequest implements IDataRequest {
    private request: AxiosInstance;
    private static inst: DataRequest;
    constructor(_request: AxiosInstance) {
        this.request = _request;
    }
    public static Inst(_request: AxiosInstance): DataRequest {
        if (typeof this.inst === "undefined") {
            this.inst = new DataRequest(_request);
        }
        return this.inst;
    }
    //#region 
    /**
     * @description get请求
     * @template R 返回数据类型
     * @template T params参数类型
     * @param {string} _url 接口url
     * @param {T} [_params] 参数
     * @returns {Promise<R>} 返回值
     * @memberof DataRequest
     */
    public getRequest<R, T>(_url: string, _params?: T, _timeout?: number): Promise<R> {
        return this.getOrDeleteRequest<R, T>(_url, _params, "get", _timeout);
    }
    /**
     * @description delete请求
     * @template R 返回数据类型
     * @template T params参数类型
     * @param {string} _url 接口url
     * @param {T} [_params] 参数
     * @returns {Promise<R>} 返回值
     * @memberof DataRequest
     */
    public deleteRequest<R, T>(_url: string, _params?: T, _data?: any, _timeout?: number): Promise<R> {
        // return this.getOrDeleteRequest<R, T>(_url, _params, "delete", _timeout);
        return new Promise((resolve, reject) => {
            this.request({
                method: "DELETE",
                url: _url,
                params: _params,
                data: _data,
                timeout: _timeout
            }).then((response: any) => {
                resolve(response);
            }).catch((error: any) => {
                reject(error);
            })
        })
    }
    /**
     * @description post请求
     * @template R  返回数据类型
     * @template D  data数据类型
     * @template T  params参数类型
     * @param {string} _url 接口url
     * @param {D} _data body传值
     * @param {T} [_params] 参数
     * @returns {Promise<R>} 返回值
     * @memberof DataRequest
     */
    public postRequest<R, D, T>(_url: string, _data: D, _params?: T, _timeout?: number): Promise<R> {
        return this.pRequest<R, D, T>(_url, "post", _data, _params, _timeout);
    }
    /**
     * @description put请求
     * @template R  返回数据类型
     * @template D  data数据类型
     * @template T  params参数类型
     * @param {string} _url 接口url
     * @param {D} _data body传值
     * @param {T} [_params] 参数
     * @returns {Promise<R>} 返回值
     * @memberof DataRequest
     */
    public putRequest<R, D, T>(_url: string, _data: D, _params?: T, _timeout?: number): Promise<R> {
        return this.pRequest<R, D, T>(_url, "put", _data, _params, _timeout);
    }
    /**
     * @description patch请求
     * @template R  返回数据类型
     * @template D  data数据类型
     * @template T  params参数类型
     * @param {string} _url 接口url
     * @param {D} _data body传值
     * @param {T} [_params] 参数
     * @returns {Promise<R>} 返回值
     * @memberof DataRequest
     */
    public patchRequest<R, D, T>(_url: string, _data: D, _params?: T): Promise<R> {
        return this.pRequest<R, D, T>(_url, "patch", _data, _params);
    }
    //#endregion
    private getOrDeleteRequest<R, T>(_url: string, _params?: T, _method?: Method, _timeout?: number): Promise<R> {
        return new Promise((resolve, reject) => {
            this.request({
                method: typeof _method === "undefined" ? "get" : _method,
                url: _url,
                params: _params,
                timeout: _timeout
            }).then((response: any) => {
                resolve(response);
            }).catch((error: any) => {
                reject(error);
            })
        })
    }
    private pRequest<R, D, T>(_url: string, _method: Method, _data: D, _params?: T, _timeout?: number): Promise<R> {
        return new Promise((resolve, reject) => {
            this.request({
                method: _method,
                url: _url,
                params: typeof _params !== "undefined" ? _params : {},
                data: _data,
                timeout: _timeout
            }).then((response: any) => {
                resolve(response);
            }).catch((error: any) => {
                reject(error);
            })
        })
    }
}