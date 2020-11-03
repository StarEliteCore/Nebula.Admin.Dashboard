import { FunctionInputDto, IFunctionOutputPageList } from '@/domain/entity/functiondto/functionDto';
import { IAjaxResult, IServerPageReturn } from '@/shared/response';

import { IPageRequest } from '@/shared/request';

/**
 * 功能服务层接口定义
 */
export interface IFunctionService {
    /**
     * 分页获取
     * @param _page 
     */
    getFunctionPage(_page: IPageRequest): Promise<IServerPageReturn<IFunctionOutputPageList[]>>;
    /**
     * 添加或者更新功能
     * @param _function 
     */ 
    createOrUpdateFunction(_function: FunctionInputDto): Promise<IAjaxResult>;

    /**
     * 删除功能
     * @param _id 
     */
    deleteFunctionAsync(_id: string): Promise<IAjaxResult>;


    /**
     * 加载功能
     * @param _id 
     */
    getFunctionById(_id: string): Promise<IAjaxResult>;

}