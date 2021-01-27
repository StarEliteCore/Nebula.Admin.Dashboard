import { IDescription, IEntity } from '@/shared/baseentity/IEntity';

import { Guid } from 'guid-typescript';

export class ClientDtoBase  implements IEntity<string>{
    id:string=Guid.EMPTY;
    clientId:string="";
    enabled:boolean=true;
    clientName:string="";
    allowedGrantTypes:Array<string>=[];
    allowAccessTokensViaBrowser:boolean=true;
    redirectUris:Array<string>=[];
    postLogoutRedirectUris:Array<string>=[];
    allowedCorsOrigins:Array<string>=[];
    allowedScopes:Array<string>=[];
    protocolType:Array<string>=[];
    allowedIdentityTokenSigningAlgorithms:Array<string>=[];
   }