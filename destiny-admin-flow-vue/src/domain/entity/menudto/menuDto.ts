import { IDescription, IEntity } from "@/shared/baseentity/IEntity";

import { Guid } from "guid-typescript";

export interface IMenu extends IEntity<string> {
  /**
   * 菜单名称
   */
  name: string;

  /**
   * 父级菜单ID
   */
  parentId: string;

  /**
   * 排序
   */
  sort: number;

  /**
   * 组件地址(前端)
   */
  path: string;

  /**
   * 菜单图标
   */
  icon: string;

  /**
   * 当前菜单以上所有的父级
   */
  parentNumber: string;

  /**
   * 组件地址
   */
  component: string;

  /**
   * 类型
   */
  type: MenuEnum;

  /**
   * 事件名
   */
  eventName: string;

  /**
   * 子级
   */
  children: Array<IMenu>;
}

export enum MenuEnum {
  /**
   * 菜单
   */
  Menu = 0,
  /**
   * 按钮
   */
  Function = 5,
}

export interface IMenuTableDto extends IMenu, IDescription {
  /**
   * 深度
   */
  depth: number;
}

/**
 * 菜单DTO
 */
export class MenuDto implements IEntity<string> {
  id: string = Guid.EMPTY;
  name: string = "";
  sort!: number;
  path: string = "";
  parentId: string = Guid.EMPTY;
  component: string = "";
  icon: string = "";
  description: string = "";
  parentNumber: string = "";
  depth: number = 0;
  // functionId: Array<string> = [];
  type: MenuEnum = MenuEnum.Menu;
  layout: string = "";
  isHide: boolean = false;
  eventName: string = "";
}

/**
 * 菜单树DTO
 */
export class MenuTreeOutDto implements IEntity<string> {
  id: string = Guid.EMPTY;
  title: string | undefined;
  expand: boolean = true;
  key: string | undefined;
  parentId: string | undefined;
  type: MenuEnum = MenuEnum.Menu;
  children: Array<MenuTreeOutDto> = [];
  checked: boolean = false;
}


/**
 * 菜单表格请求实体
 */
export class MenuOutPageListDto implements IEntity<string>, IDescription {
  id: string = Guid.EMPTY;
  name: string = "";
  sort: number = 0;
  routerPath: string = "";
  parentId: string = "";
  iocn: string = "";
  depth: string = "";
  description: string = "";
  children: Array<MenuOutPageListDto> = new Array<MenuOutPageListDto>();
}