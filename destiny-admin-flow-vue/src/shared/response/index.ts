export interface IServerReturn<T> {
  itemList: T;
  success: boolean;
  message: string;
  type: number;
}
export interface IServerPageReturn<T> extends IServerReturn<T> {
  total: number;
}

export interface IAjaxResult {
  data: any;
  success: boolean | true;
  message: string | "";
  type:AjaxResultType
}

///类型枚举
export enum AjaxResultType{


  ///消息结果
  Info = 203,

  ///成功
  Success = 200,

  Error=500,

  //未经授权
  Unauthorized=401,

   //已登录但权限不足
   Uncertified=403,
}
export class AjaxResult implements IAjaxResult {
  constructor(
    public data: any,
    public success: boolean,
    public message: string,
    public type:AjaxResultType.Success
  ) {
    // ...
  }


}
