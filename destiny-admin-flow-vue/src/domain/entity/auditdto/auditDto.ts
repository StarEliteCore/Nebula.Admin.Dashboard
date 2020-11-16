import { AjaxResultType, IAjaxResult } from '@/shared/response';

import { Dictionary } from 'vue-router/types/router';
import { IEntity } from '@/shared/baseentity/IEntity';

export interface IAuditLogOutputPageDto extends IEntity<string>
{

    browserInformation:string;
    ip:string;
    functionName:string;
    action:string;
    executionDuration:string;
    createdTime:string;
    userName:string;
    nickName:string;
    message:string;
    operationType:AjaxResultType;
}

export interface IAuditLogTableDto extends IAuditLogOutputPageDto
{
    
}

export interface IAuditEntryBaseDto extends IEntity<string>
{
    entityAllName:string;
    entityDisplayName:string;
    keyValues:string;
    dataOperationType:DataOperationType;
    auditLogId:string;
    userName:string;
    nickName:string;
}


export interface IAuditEntryTableDto extends IAuditEntryBaseDto
{
    
}
export interface IAuditEntryOutputPageDto extends IAuditEntryBaseDto
{
    entityAllName:string;
    entityDisplayName:string;
    keyValues:string;
    dataOperationType:DataOperationType;
    auditLogId:string;
    userName:string;
    nickName:string;
}

export interface IAuditEntryPropertyBaseDto extends IEntity<string>
{
    properties:string;
    propertieDisplayName:string;
    originalValues:string;
    newValues:string;
    propertiesType:string;
    auditEntryId:string;
}


export interface IAuditEntryPropertyTableDto extends IAuditEntryPropertyBaseDto
{
   
}


export interface IAuditEntryPropertyOutputPageDto extends IAuditEntryPropertyBaseDto
{
   
}

export enum DataOperationType 
{

    None,
    Add,
    Delete,
    Update
}