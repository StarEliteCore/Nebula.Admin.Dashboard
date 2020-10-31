import {
  FunctionInputDto,
  IFunctionOutputPageList,
} from "@/domain/entity/functiondto/functionDto";
import { IAjaxResult, IServerPageReturn } from "@/shared/response";

import { FunctionApi } from "@/domain/config/api";
import { IFunctionService } from "./IFunctionService";
import { IPageRequest } from "@/shared/request";
import { MainManager } from "../main/main-manager";
import { injectable } from "inversify";

@injectable()
export class FunctionService implements IFunctionService {
  /**
   * 分页获取
   * @param _page
   */
  getFunctionPage(
    _page: IPageRequest
  ): Promise<IServerPageReturn<IFunctionOutputPageList[]>> {
    return MainManager.dataRequest.postRequest(
      FunctionApi.getFunctionPage,
      _page
    );
  }

  /**
   * 添加或者更新功能
   * @param _function
   */

  createOrUpdateFunction(_function: FunctionInputDto): Promise<IAjaxResult> {
    return MainManager.dataRequest.postRequest(
      FunctionApi.createrOrUpdateFunction,
      _function
    );
  }

  /**
   * 删除功能
   * @param _id
   */
  deleteFunctionAsync(_id: string): Promise<IAjaxResult> {
    return MainManager.dataRequest.deleteRequest(FunctionApi.deleteFunction, {
      id: _id,
    });
  }

  /**
   * 加载功能
   * @param _id
   */
  getFunctionById(_id: string): Promise<IAjaxResult> {
    return MainManager.dataRequest.getRequest(FunctionApi.loadFunction, {
      id: _id,
    });
  }
}
