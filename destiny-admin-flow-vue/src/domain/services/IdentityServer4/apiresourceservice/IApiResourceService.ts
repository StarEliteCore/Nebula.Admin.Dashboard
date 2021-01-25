import { IAjaxResult, IServerPageReturn } from "@/shared/response";

import { IApiResourceInputDto } from "@/domain/entity/identityServer4/apiResourceDto/apiResourceDto";
import { IPageRequest } from "@/shared/request";

export interface IApiResourceService {
  /**
   * 分页获取
   * @param _page
   */
   getApiResourcePage(_page: IPageRequest): Promise<IServerPageReturn<any>>;

   /**
     * 删除Api资源
     * @param _id 
     */
    deleteApiResource(_id: string): Promise<IAjaxResult>;

     /**
     * 添加或者更新Api资源
     * @param _dto 
     */ 
    createOrUpdateApiResource(_dto: IApiResourceInputDto): Promise<IAjaxResult>;
    
     /**
     * 加载Api资源
     * @param _id 
     */
    getApiResourceById(_id: string): Promise<IAjaxResult>;
}
