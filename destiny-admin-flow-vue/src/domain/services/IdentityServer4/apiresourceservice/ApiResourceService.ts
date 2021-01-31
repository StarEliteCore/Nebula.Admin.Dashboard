import "reflect-metadata";

import { ApiResourceApi, ApiResourceScopeApi } from "@/domain/config/api";
import { IAjaxResult, IServerPageReturn } from "@/shared/response";

import { IApiResourceInputDto } from "@/domain/entity/identityServer4/apiResourceDto/apiResourceDto";
import { IApiResourceService } from "./IApiResourceService";
import { IPageRequest } from "@/shared/request";
import { MainManager } from "../../main/main-manager";
import { injectable } from "inversify";

@injectable()
export default class  ApiResourceService implements IApiResourceService{
    getApiResourceScopeList(): Promise<IAjaxResult> {
        return MainManager.dataRequest.getRequest(ApiResourceScopeApi.getApiResourceScopes);
    }
    getJwtClaimTypeSelectItem(): Promise<IAjaxResult> {
        return MainManager.dataRequest.getRequest(ApiResourceApi.getJwtClaimType);
    }
    getApiResourceById(_id: string): Promise<IAjaxResult> {
        return MainManager.dataRequest.getRequest(ApiResourceApi.loadApiResource, { id: _id });
    }
    getApiResourcePage(_page: IPageRequest): Promise<IServerPageReturn<any>> {
        return MainManager.dataRequest.getRequest(ApiResourceApi.getPage, _page);
    }
    deleteApiResource(_id: string): Promise<IAjaxResult> {
        return MainManager.dataRequest.deleteRequest(ApiResourceApi.delete,  { id: _id });
    }
    createOrUpdateApiResource(_dto: IApiResourceInputDto): Promise<IAjaxResult> {
        return MainManager.dataRequest.postRequest(ApiResourceApi.createApiResource, _dto)
    }

    
}