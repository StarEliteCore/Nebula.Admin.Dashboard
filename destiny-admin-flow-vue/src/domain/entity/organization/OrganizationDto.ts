import { Guid } from "guid-typescript";
import { IEntity } from "@/shared/baseentity/IEntity";

/**
 * 组织架构添加修改Dto
 */
export class OrganizationInputDto implements IEntity<string> {
  /**
   *
   */
  id: string = Guid.EMPTY;
  /**
   * 组织架构名称
   */
  name: string = "";
  /**
   * 父级ID
   */
  parentId: string = Guid.EMPTY;
  /**
   * 所有的父级集合
   */
  parentNumber: string = "";
  /**
   * 深度
   */
  depth: number = 0;
  /**
   * 领导
   */
  ladingCadre: string = "";
  /**
   * 其他领导
   */
  firstLeader: string = "";
  /**
   * 分管领导
   */
  secondLeader: string = "";
}

/**
 * 组织架构分页Dto
 */
export class OrganizationPageListDto implements IEntity<string> {
  constructor()
  {
    
  }
  /**
   *
   */
  id: string = Guid.EMPTY;
  /**
   * 组织架构名称
   */
  name: string = "";
  /**
   * 父级ID
   */
  parentId: string = Guid.EMPTY;
  /**
   * 所有的父级集合
   */
  parentNumber: string = "";
  /**
   * 深度
   */
  depth: number = 0;
  /**
   *
   */
  ladingCadre: string = "";
  /**
   * 主管领导
   */
  firstLeader: string = Guid.EMPTY;
  /**
   * 分管领导
   */
  secondLeader: string = Guid.EMPTY;
}