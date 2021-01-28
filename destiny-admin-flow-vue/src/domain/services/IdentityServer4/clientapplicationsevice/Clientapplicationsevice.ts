import "reflect-metadata";

import { IAjaxResult, IServerPageReturn } from "@/shared/response";

import { ClientApi } from "@/domain/config/api";
import { IClientApplicationService } from "./IClientapplicationsevice";
import { IPageRequest } from "@/shared/request";
import { MainManager } from "../../main/main-manager";
import { injectable } from "inversify";

@injectable()
export default class  ClientApplicationService implements IClientApplicationService{
    getGrantTypeSelectItem(): Promise<IAjaxResult> {
        return MainManager.dataRequest.getRequest(ClientApi.getGrantType);
    }
    getPage(_page: IPageRequest): Promise<IServerPageReturn<any>> {
        return MainManager.dataRequest.postRequest(ClientApi.getPage, _page);
    }
}