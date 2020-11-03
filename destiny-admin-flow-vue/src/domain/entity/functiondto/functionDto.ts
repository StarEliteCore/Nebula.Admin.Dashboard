import { ICreatedTime, IDescription, IEntity, IIsDeleted, ILastModifionTime } from '@/shared/baseentity/IEntity';

import { Guid } from 'guid-typescript';

/**
 * 功能基DTO
 */
export interface IFunctionBaseDto extends IEntity<string>,IDescription {

   name:string;
   isEnabled:boolean;
   linkUrl:string


}

export interface IFunctionInputDto extends IFunctionBaseDto{

    
}

export class FunctionInputDto implements IFunctionInputDto{

    id=Guid.EMPTY;
    name="";
    isEnabled=true;
    description="";
    linkUrl="";
}

export interface IFunctionOutputDto extends IFunctionBaseDto{

    
}

export class FunctionOutputDto extends FunctionInputDto
{

    
}

export interface IFunctionOutputPageList extends IFunctionBaseDto,ICreatedTime,ILastModifionTime
{

    
}


export interface IFunctionTableDto extends IFunctionOutputPageList {

}


