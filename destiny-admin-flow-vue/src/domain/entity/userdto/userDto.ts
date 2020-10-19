import { ICreatedTime, IDescription, IEntity, IIsDeleted, ILastModifionTime } from '@/shared/baseentity/IEntity';

export interface IUserBaseDto
{   
    /**
     * 是否系统用户
     */
    isSystem:boolean;
    /**
     * 用户昵称
     */
    nickName:string;
    /**
     * 性别
     */
    sex:ESex;
    /**
     * 用户名
     */
    userName:string
}
/**
 * Table表格Dto
 */
export interface IUserTableDto extends IEntity<string>,ICreatedTime,ILastModifionTime,IIsDeleted,IDescription
{
    
}


export enum ESex {
    Man,
    Female,
  }