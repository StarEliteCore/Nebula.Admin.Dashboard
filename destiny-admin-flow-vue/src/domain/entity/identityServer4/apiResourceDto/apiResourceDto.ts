import { IDescription, IEntity } from '@/shared/baseentity/IEntity';

import { Guid } from 'guid-typescript';

export interface IApiResourceDtoBase extends IEntity<string>,IDescription{

 name:string;
 enabled:boolean;
 displayName:string;
 userClaims:Array<string>;
 apiSecrets:Array<IApiResourceSecretDto>;
 scopes:Array<string>;

}


export interface IApiResourceInputDto extends IApiResourceDtoBase{


}

export interface IApiResourceSecretDto
{

    value:string;
}

