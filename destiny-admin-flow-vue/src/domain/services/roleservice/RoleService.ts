import { IAjaxResult, IServerPageReturn } from "@/shared/response";
import {
  RoleInputDto,
  RoleOutputPageListDto,
} from "@/domain/entity/role/roleDto";

import { IPageRequest } from "@/shared/request";
import { IRoleService } from "./IRoleService";
import { MainManager } from "../main/main-manager";
import { RoleApi } from "@/domain/config/api";
import { injectable } from "inversify";

@injectable()
export default class RoleService implements IRoleService {
  getRolePage(
    _page: IPageRequest
  ): Promise<IServerPageReturn<any>> {
    return MainManager.dataRequest.postRequest(RoleApi.getRolePage, _page);
  }
  createOrUpdateRole(_role: RoleInputDto): Promise<IAjaxResult> {
    return MainManager.dataRequest.postRequest(
      RoleApi.createrOrUpdateRole,
      _role
    );
  }

  deleteRoleAsync(_id: string): Promise<IAjaxResult> {
    return MainManager.dataRequest.deleteRequest(RoleApi.deleteRole, { id: _id });
  }
  getAllRoleAsync(): Promise<IAjaxResult> {
    return MainManager.dataRequest.getRequest(RoleApi.getAllRole);
  }
}
