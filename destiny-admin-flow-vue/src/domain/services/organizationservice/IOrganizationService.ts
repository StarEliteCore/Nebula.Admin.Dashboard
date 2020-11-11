import { IAjaxResult, IServerPageReturn } from "@/shared/response";
import { OrganizationInputDto, OrganizationPageListDto } from "@/domain/entity/organization/OrganizationDto";

import { IPageRequest } from "@/shared/request";

/**
 * 组织架构服务层接口定义
 */
export interface IOrganizationService {
  /**
   * 分页获取
   * @param _page
   */
  getOrganizationPage(_page: IPageRequest): Promise<IServerPageReturn<any>>;
  /**
   * 添加组织架构
   * @param _role
   */

  createOrganizationAsync(
    _organization: OrganizationInputDto
  ): Promise<IAjaxResult>;
  /**
   * 修改组织架构
   * @param _organization
   */
  updateOrganizationAsync(
    _organization: OrganizationInputDto
  ): Promise<IAjaxResult>;
  /**
   * 删除组织架构
   * @param _id
   */
  deleteOrganizationAsync(_id: string): Promise<IAjaxResult>;
  /**
   * 获取树形组织架构
   */
  getAllOrganizationTree(): Promise<IServerPageReturn<any>>;
  /**
   * 加载组织架构
   * @param _id 
   */
  loadFormOrganization(_id:string):Promise<IAjaxResult>;
}
