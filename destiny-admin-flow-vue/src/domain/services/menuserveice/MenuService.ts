import { IMenuService } from './IMenuService';
import { IPageRequest } from '@/shared/request';
import { IServerPageReturn } from '@/shared/response';
import { MainManager } from '../main/main-manager';
import { injectable } from 'inversify';

@injectable()
export default class MenuService implements IMenuService{
    getMenuTable(_page: IPageRequest): Promise<IServerPageReturn<any>> {
        return MainManager.dataRequest.postRequest("",_page);
    }
}