import { IPageRequest } from "@/shared/request";
import { IServerPageReturn } from "@/shared/response";

export interface IClientApplicationService{
      /**
   * 分页获取
   * @param _page
   */
   getPage(_page: IPageRequest): Promise<IServerPageReturn<any>>;
}