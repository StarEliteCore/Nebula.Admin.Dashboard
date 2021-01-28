import { IAjaxResult, IServerPageReturn } from "@/shared/response";

import { IPageRequest } from "@/shared/request";

export interface IClientApplicationService{
      /**
   * 分页获取
   * @param _page
   */
   getPage(_page: IPageRequest): Promise<IServerPageReturn<any>>;
   /**
    * 获取授权类型
    * 
    */
   getGrantTypeSelectItem(): Promise<IAjaxResult>;
}