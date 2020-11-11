import { IPageRequest } from '@/shared/request';
import { IAjaxResult, IServerPageReturn } from '@/shared/response';
import { IUserService } from './IUserService';
import { MainManager } from '../main/main-manager';
import { UserApi } from '@/domain/config/api';
import { injectable } from 'inversify';
import { UserAllocationRoleInputDto, UserInputDto, UserUpdateInputDto } from '@/domain/entity/userdto/userDto';

@injectable()
export default class UserService implements IUserService {
    userAllocationRole(_user: UserAllocationRoleInputDto): Promise<IAjaxResult> {
        return MainManager.dataRequest.postRequest(UserApi.userAllocationRole,_user)
    }
    
    updateUser(_user: UserUpdateInputDto): Promise<IAjaxResult> {
        return MainManager.dataRequest.postRequest(UserApi.updateUser, _user)
    }
    createUser(_user: UserInputDto): Promise<IAjaxResult> {
        return MainManager.dataRequest.postRequest(UserApi.createrUser, _user)
    }
    getUserPage(_page: IPageRequest): Promise<IServerPageReturn<any>> {
        return MainManager.dataRequest.postRequest(UserApi.getUserPage, _page);
    }
    getUserById(_id: string): Promise<IAjaxResult> {
        return MainManager.dataRequest.getRequest(UserApi.loadUser, { id: _id });
    }
    deleteUserById(_id: string): Promise<IAjaxResult> {
        return MainManager.dataRequest.deleteRequest(UserApi.deleteUser, { id: _id });
    }
    getSelectAllUser(): Promise<IAjaxResult> {
        return MainManager.dataRequest.getRequest(UserApi.userAll);
    }
}