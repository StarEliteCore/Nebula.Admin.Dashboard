import { IUserService } from './IUserService';
import { IPageRequest } from '@/shared/request';
import { IServerPageReturn } from '@/shared/response';
import { MainManager } from '../main/main-manager';
import { injectable } from 'inversify';
import { UserApi } from '@/domain/config/api';

@injectable()
export default class UserService implements IUserService{
    getUserPage(_page: IPageRequest): Promise<IServerPageReturn<any>> {
        return MainManager.dataRequest.postRequest(UserApi.getUserPage,_page);
    }

}