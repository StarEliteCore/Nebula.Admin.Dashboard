import { ICreatedTime, IDescription, IEntity, IIsDeleted, ILastModifionTime } from '@/shared/baseentity/IEntity';

import { Guid } from 'guid-typescript';

export interface IUserBaseDto {
    /**
     * 是否系统用户
     */
    isSystem: boolean;
    /**
     * 用户昵称
     */
    nickName: string;
    /**
     * 性别
     */
    sex: ESex;
    /**
     * 用户名
     */
    userName: string
}
export interface IPassWord {
    passwordHash: string;
}

/**
 * Table表格Dto
 */
export interface IUserTableDto extends IEntity<string>, IUserBaseDto,ICreatedTime, ILastModifionTime, IIsDeleted, IDescription {

}

/**
 * 用戶添加/修改Dto
 */
export class UserInputDto implements IEntity<string>, IDescription, IUserBaseDto, IPassWord {
    isSystem: boolean = false;
    sex: ESex = ESex.Man;
    userName: string = "";
    id: string = Guid.EMPTY;
    description: string = "";
    nickName: string = "";
    roleIds: Array<string> = [];
    passwordHash: string = "";
}
/**
 * 性別枚舉
 */
export enum ESex {
    Man,
    Female,
}