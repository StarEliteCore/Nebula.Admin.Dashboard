import { IAjaxResult, IServerPageReturn } from "@/shared/response";
import { inject, injectable } from "inversify";

import { IDestinyCoreServeice } from "./IDestinyCoreServeice";
import { IPageRequest } from "@/shared/request";
import { IUserService } from "../userservice/IUserService";
import { IocTypes } from "@/shared/diconfig/ioc-types";
import { MainManager } from "../main/main-manager";
import { MenuApi } from '@/domain/config/api';
import container from "@/shared/diconfig/inversify.config";

@injectable()
export default class DestinyCoreServeice implements IDestinyCoreServeice {
  getVueDynamicRouter(): Promise<IAjaxResult> {
    return MainManager.dataRequest.getRequest(MenuApi.getVueDynamicRouterTreeAsync);
  }
  delete(_url: string, _id: string): Promise<IAjaxResult> {
    return MainManager.dataRequest.deleteRequest(_url, {
      id: _id,
    });
  }
  getPage(_url: string, _page: IPageRequest): Promise<IServerPageReturn<any>> {
    return MainManager.dataRequest.postRequest(_url, _page);
  }

  save(_url: string, _data: any): Promise<IAjaxResult> {
    return MainManager.dataRequest.postRequest(_url, _data);
  }
}
