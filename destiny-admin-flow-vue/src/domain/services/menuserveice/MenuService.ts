import { IAjaxResult, IServerPageReturn } from '@/shared/response';

import { IMenuService } from './IMenuService';
import { IPageRequest } from '@/shared/request';
import { MainManager } from '../main/main-manager';
import { MenuApi } from '@/domain/config/api';
import { MenuDto } from '@/domain/entity/menudto/menuDto';
import { injectable } from 'inversify';

@injectable()
export default class MenuService implements IMenuService {
    getTable(): Promise<IServerPageReturn<any>> {
        return MainManager.dataRequest.getRequest(MenuApi.getTable);
    }
    addMenu(_menu: MenuDto): Promise<IAjaxResult> {
        return MainManager.dataRequest.getRequest(MenuApi.addMenu, _menu);
    }
    updateMenu(_menu: MenuDto): Promise<IAjaxResult> {
        return MainManager.dataRequest.getRequest(MenuApi.updateMenu, _menu);
    }
    delete(_id: string): Promise<IAjaxResult> {
        return MainManager.dataRequest.getRequest(MenuApi.delete, _id);
    }
    getMenuById(_id: string): Promise<IAjaxResult> {
        return MainManager.dataRequest.getRequest(MenuApi.loadFormMenu, _id);
    }
    getMenuTable(_page: IPageRequest): Promise<IServerPageReturn<any>> {
        return MainManager.dataRequest.postRequest("", _page);
    }

    getMenuTreeByRoleId(_roleId?: string): Promise<IAjaxResult>
    {
        console.log(MenuApi.getMenuTree);
        return MainManager.dataRequest.getRequest(MenuApi.getMenuTree);
    }
}