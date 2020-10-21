import { UserInputDto, UserUpdateInputDto } from '@/domain/entity/userdto/userDto';
import { IPageRequest } from '@/shared/request';
import { IAjaxResult, IServerPageReturn, IServerReturn } from '@/shared/response';

/**
 * 菜单服务层接口定义
 */
export interface IUserService {
    /**
     * 分页获取
     * @param _page 
     */
    getUserPage(_page: IPageRequest): Promise<IServerPageReturn<any>>;
    /**
     * 添加用户
     * @param _user 
     */
    createUser(_user: UserInputDto): Promise<IAjaxResult>;
    /**
     * 加载用户
     * @param _id 
     */
    getUserById(_id: string): Promise<IAjaxResult>;
    /**
     * 删除用户
     * @param _id 
     */
    deleteUserById(_id: string): Promise<IAjaxResult>;
    /**
     * 修改用户
     * @param _user 
     */
    updateUser(_user:UserUpdateInputDto): Promise<IAjaxResult>;
}