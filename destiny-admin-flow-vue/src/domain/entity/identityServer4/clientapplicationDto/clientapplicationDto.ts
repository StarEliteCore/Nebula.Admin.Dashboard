import { IDescription, IEntity } from '@/shared/baseentity/IEntity';

export interface IClientDtoBase extends IEntity<string>,IDescription{
    clientId:string;
    enabled:boolean;
    clientName:string;
    allowedGrantTypes:Array<string>;
    allowAccessTokensViaBrowser:boolean;
    redirectUris:Array<string>;
    postLogoutRedirectUris:Array<string>;
    allowedCorsOrigins:Array<string>;
    allowedScopes:Array<string>;
    protocolType:Array<string>;
    allowedIdentityTokenSigningAlgorithms:Array<string>;
   }