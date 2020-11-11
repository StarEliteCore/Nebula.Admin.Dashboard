import { IAjaxResult, IServerPageReturn } from "@/shared/response";
import { OrganizationInputDto, OrganizationPageListDto } from "@/domain/entity/organization/OrganizationDto";

import { IOrganizationService } from "./IOrganizationService";
import { IPageRequest } from "@/shared/request";
import { ITreeDto } from '@/shared/baseentity/itreeentity';
import { MainManager } from "../main/main-manager";
import { OrganizationApi } from "@/domain/config/api";
import { injectable } from "inversify";

@injectable()
export default class OrganizationService implements IOrganizationService {
  getOrganizationPage(_page: IPageRequest): Promise<IServerPageReturn<any>> {
    return MainManager.dataRequest.postRequest(
      OrganizationApi.getOrganizationPage,
      _page
    );
  }
  createOrganizationAsync(
    _organization: OrganizationInputDto
  ): Promise<IAjaxResult> {
    return MainManager.dataRequest.postRequest(
      OrganizationApi.createrOrganization,
      _organization
    );
  }
  updateOrganizationAsync(
    _organization: OrganizationInputDto
  ): Promise<IAjaxResult> {
    return MainManager.dataRequest.putRequest(
      OrganizationApi.updateOrganization,
      _organization
    );
  }
  deleteOrganizationAsync(_id: string): Promise<IAjaxResult> {
    return MainManager.dataRequest.deleteRequest(
      OrganizationApi.deleteOrganization,
      { id: _id }
    );
  }
  getAllOrganizationTree(): Promise<IServerPageReturn<ITreeDto>> {
    return MainManager.dataRequest.getRequest(OrganizationApi.getOrganizationTree);
  }
  loadFormOrganization(_id:string):Promise<IAjaxResult>{
    return MainManager.dataRequest.getRequest(OrganizationApi.loadOrganization,{ id: _id })
  }
}
