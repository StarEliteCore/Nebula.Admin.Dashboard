import { IAjaxResult, IServerPageReturn } from '@/shared/response';
import { MenuDto, MenuOutPageListDto } from '@/domain/entity/menudto/menuDto';

import { FunctionInputDto } from "@/domain/entity/functiondto/functionDto";
import { IMenuService } from './IMenuService';
import { IPageRequest } from '@/shared/request';
import { MainManager } from '../main/main-manager';
import { MenuApi } from '@/domain/config/api';
import { injectable } from 'inversify';

@injectable()
export default class MenuService implements IMenuService {
    getTable(): Promise<IServerPageReturn<any>> {
        return MainManager.dataRequest.getRequest(MenuApi.getTable);
    }
    addMenu(_menu: MenuDto): Promise<IAjaxResult> {
        return MainManager.dataRequest.postRequest(MenuApi.addMenu, _menu);
    }
    updateMenu(_menu: MenuDto): Promise<IAjaxResult> {
        return MainManager.dataRequest.putRequest(MenuApi.updateMenu, _menu);
    }
    delete(_id: string): Promise<IAjaxResult> {
        return MainManager.dataRequest.deleteRequest(MenuApi.delete, { Id: _id });
    }
    getMenuById(_id: string): Promise<IAjaxResult> {
        return MainManager.dataRequest.getRequest(MenuApi.loadFormMenu, { Id: _id });
    }
    getMenuTable(_page: IPageRequest): Promise<IServerPageReturn<any>> {
        return MainManager.dataRequest.postRequest("", _page);
    }

    getMenuTreeByRoleId(_roleId?: string): Promise<IAjaxResult> {
        return MainManager.dataRequest.getRequest(MenuApi.getMenuTree, { roleId: _roleId });
    }

    GetMenuPage(_page: IPageRequest): Promise<IServerPageReturn<Array<MenuOutPageListDto>>> {
        return MainManager.dataRequest.postRequest(MenuApi.getMenuPage, _page);
    }

    GetAllMenuTree(): Promise<IServerPageReturn<any>> {
        return MainManager.dataRequest.getRequest(MenuApi.GetAllMenuTree);
    }

    BatchAddMenuFunctionAsync(menuIds: Array<string>, functionIds: string[]): Promise<IAjaxResult> {
        return MainManager.dataRequest.postRequest(MenuApi.BatchAddMenuFunction, { menuIds, functionIds });
    }
    BatchDeleteMenuFunctionAsync(menuId: string, functionIds: string[]): Promise<IAjaxResult> {
        return MainManager.dataRequest.deleteRequest(MenuApi.BatchDeleteMenuFunction, null, { menuId, functionIds });
    }
    GetMenuFunctionByMenuIdPageAsync(menuId: string, _page: IPageRequest): Promise<IServerPageReturn<FunctionInputDto[]>> {
        return MainManager.dataRequest.postRequest(MenuApi.GetMenuFunctionByMenuIdPage, Object.assign({ menuId }, _page));
    }
    /**
     * 获取动态路由
     */
    getVueDynamicRouterTreeAsync(): Promise<IAjaxResult> {
        return MainManager.dataRequest.getRequest(MenuApi.getVueDynamicRouterTreeAsync);
    }
}
