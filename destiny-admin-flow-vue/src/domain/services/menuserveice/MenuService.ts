import { IPageRequest } from '@/shared/request';
import { IServerPageReturn } from '@/domain/response';
import { MainManager } from '../main/main-manager';
import { IMenuService } from './IMenuService';

export default class MenuService implements IMenuService{
    getMenuTable(_page: IPageRequest): Promise<IServerPageReturn<any>> {
        return MainManager.dataRequest.postRequest("",_page);
    }
}