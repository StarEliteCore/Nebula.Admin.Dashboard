import { IAjaxResult, IServerPageReturn } from '@/shared/response';

import { IPageRequest } from '@/shared/request';
import { MenuDto } from '@/domain/entity/menudto/menuDto'

/**
 * 菜单服务层接口定义
 */
export interface IMenuService {
    getMenuTable(_page: IPageRequest): Promise<IServerPageReturn<any>>;

    /**
     * 获取菜单表格信息
     */
    getTable(): Promise<IServerPageReturn<any>>;

    /**
     * 添加菜单
     * @param _menu 菜单DTO
     */
    addMenu(_menu: MenuDto): Promise<IAjaxResult>;

    /**
     * 修改菜单
     * @param _menu 菜单DTO
     */
    updateMenu(_menu: MenuDto): Promise<IAjaxResult>;

    /**
     * 删除菜单
     * @param _id 菜单id
     */
    delete(_id: string): Promise<IAjaxResult>;

    /**
     * 根据菜单id获取菜单信息
     * @param _id 菜单id
     */
    getMenuById(_id: string): Promise<IAjaxResult>;

      /**
     * 根据角色ID得到菜单树
     * @param _roleId 角色id
     */
    getMenuTreeByRoleId(_roleId?: string): Promise<IAjaxResult>;
}