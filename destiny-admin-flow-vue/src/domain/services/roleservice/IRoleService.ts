import { IAjaxResult, IServerPageReturn } from '@/shared/response';
import { RoleInputDto, RoleOutputPageListDto } from '@/domain/entity/role/roleDto';

import { IPageRequest } from '@/shared/request';

/**
 * 角色服务层接口定义
 */
export interface IRoleService {
    /**
     * 分页获取
     * @param _page 
     */
    getRolePage(_page: IPageRequest): Promise<IServerPageReturn<RoleOutputPageListDto>>;
    /**
     * 添加或者更新角色
     * @param _role 
     */ 
    createOrUpdateRole(_role: RoleInputDto): Promise<IAjaxResult>;

    /**
     * 删除角色
     * @param _id 
     */
    deleteRoleAsync(_id: string): Promise<IAjaxResult>;
}