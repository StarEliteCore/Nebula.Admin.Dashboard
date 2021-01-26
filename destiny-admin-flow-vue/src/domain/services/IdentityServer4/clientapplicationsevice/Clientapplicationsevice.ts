
import "reflect-metadata";

import { IAjaxResult, IServerPageReturn } from "@/shared/response";

import { IPageRequest } from "@/shared/request";
import { MainManager } from "../../main/main-manager";
import { injectable } from "inversify";
import { ClientApi } from "@/domain/config/api";
import { IClientApplicationService } from "./IClientapplicationsevice";

@injectable()
export default class  ClientApplicationService implements IClientApplicationService{
    getPage(_page: IPageRequest): Promise<IServerPageReturn<any>> {
        return MainManager.dataRequest.postRequest(ClientApi.getPage, _page);
    }
}