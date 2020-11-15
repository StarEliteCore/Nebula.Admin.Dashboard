/**
 * 共公服务层接口定义
 */

import { IAjaxResult, IServerPageReturn } from "@/shared/response";

import { IPageRequest } from "@/shared/request";

export interface IDestinyCoreServeice {
  /**
   * 分页获取
   * @param _page
   */
  getPage(_url: string, _page: IPageRequest): Promise<IServerPageReturn<any>>;

  delete(_url: string, _id: string): Promise<IAjaxResult>;

  //保存
  save(_url: string, _data: any): Promise<IAjaxResult>;

  //得到动态路由
  getVueDynamicRouter(): Promise<IAjaxResult>;
}
