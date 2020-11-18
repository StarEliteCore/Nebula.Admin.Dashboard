import { IAjaxResult, IServerPageReturn } from '@/shared/response';
import { MenuDto, MenuOutPageListDto } from '@/domain/entity/menudto/menuDto';

import { FunctionInputDto } from "@/domain/entity/functiondto/functionDto";
import { IPageRequest } from '@/shared/request';

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

    /**
     * 得到菜单分页数据（不是树，只是普通表格）
     * @param _page 查询DTO
     */
    GetMenuPage(_page: IPageRequest): Promise<IServerPageReturn<Array<MenuOutPageListDto>>>;

    /**
     * 获取所有菜单
     */
    GetAllMenuTree(): Promise<IServerPageReturn<any>>;

    /**
     * 批量添加功能菜单
     * @param menuIds 菜单ID
     * @param functionIds 功能ID集合
     */
    BatchAddMenuFunctionAsync(menuIds: Array<string>, functionIds: Array<string>): Promise<IAjaxResult>;

    /**
     * 批量删除功能菜单
     * @param menuId 菜单ID
     * @param functionIds 功能ID集合
     */
    BatchDeleteMenuFunctionAsync(menuId: string, functionIds: Array<string>): Promise<IAjaxResult>;

    /**
     * 根据菜单ID得到菜单功能分页
     * @param _page 查询DTO
     */
    GetMenuFunctionByMenuIdPageAsync(menuId: string, _page: IPageRequest): Promise<IServerPageReturn<Array<FunctionInputDto>>>;
    /**
     * 获取动态路由菜单
     */
    getVueDynamicRouterTreeAsync(): Promise<IAjaxResult>;
}