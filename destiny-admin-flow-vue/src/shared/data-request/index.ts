import DataRequest from "./data-request";
export interface IDataRequest {
  getRequest<R, T>(_url: string, _params?: T, _timeout?: number): Promise<R>;
  postRequest<R, D, T>(_url: string, _data: D, _params?: T, _timeout?: number): Promise<R>;
  putRequest<R, D, T>(_url: string, _data: D, _params?: T, _timeout?: number): Promise<R>;
  patchRequest<R, D, T>(_url: string, _data: D, _params?: T, _timeout?: number): Promise<R>;
  deleteRequest<R, T>(_url: string, _params?: T, _data?: any, _timeout?: number): Promise<R>;
}
export default DataRequest;
