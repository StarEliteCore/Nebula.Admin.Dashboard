import { IPageRequest } from '@/shared/request';
import { IServerPageReturn } from '@/shared/response';
import { IUserService } from './IUserService';
import { MainManager } from '../main/main-manager';
import { UserApi } from '@/domain/config/api';
import { injectable } from 'inversify';

@injectable()
export default class UserService implements IUserService{
    getUserPage(_page: IPageRequest): Promise<IServerPageReturn<any>> {
        return MainManager.dataRequest.postRequest(UserApi.getUserPage,_page);
    }

}