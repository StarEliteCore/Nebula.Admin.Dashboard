import { ICreatedTime, IDescription, IEntity, IIsDeleted, ILastModifionTime } from '@/shared/baseentity/IEntity';

export interface IRoleBaseDto extends IEntity<string>,IDescription
{
    
    name:string,
    isAdmin:boolean,
    
}

/**
 * 角色输入DTO
 */
export class RoleInputDto implements IRoleBaseDto
{

    constructor(public id:string, public name:string,public isAdmin:boolean,public description: string,public menuIds:string[])
    {

        
    }

    
}

/**
 * 角色输出DTO
 */
export class RoleOutputDto extends RoleInputDto
{


}

/**
 * Table表格Dto
 */
export interface IRoleTableDto extends IRoleBaseDto,ICreatedTime, ILastModifionTime {

}

export interface RoleOutputPageListDto extends IRoleTableDto
{

    
}