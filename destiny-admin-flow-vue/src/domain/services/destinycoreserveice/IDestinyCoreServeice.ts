
/**
 * 共公服务层接口定义
 */

import { IAjaxResult, IServerPageReturn } from '@/shared/response';

import { IPageRequest } from '@/shared/request';

export interface IDestinyCoreServeice {
    /**
     * 分页获取
     * @param _page 
     */
    getPage(_url:string,_page: IPageRequest): Promise<IServerPageReturn<any>>;

    delete(_url:string,_id: string): Promise<IAjaxResult>;
   
}