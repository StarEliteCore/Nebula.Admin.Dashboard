import * as QueryEnum from "@/shared/request/query.enum";

import { EFilterConnect, ESort } from "@/shared/request/query.enum";

import { ISelectListItem } from "../response/selectDto";

/**
 * 查询参数
 */
export interface IQueryFilter {
  //查询条件
  // filters: IQueryFilter[];
  /**
   * 查询条件and或者Or
   */
  filterConnect: QueryEnum.EFilterConnect;
  /**
   * 查询条件列表
   */
  conditions: Array<IFilterCondition>;
}
export interface IFieldOperate {
  /**
   * 字段名称
   */
  field: string;
  /**
   * 过滤操作器
   */
  operator?: QueryEnum.EFilterOprator;
}
/**
 * 查询字段接口
 */
export interface IFilterCondition extends IFieldOperate {
  /**
   * 值
   */
  value?: number | boolean | string;
}
/**
 * 排序参数
 */
export interface IOrderCondition {
  /**
   * 获取或设置 排序字段名称
   */
  sortField: string;
  /**
   * 获取或设置 排序方向
   */
  sortDirection: ESort;
}

export interface IPageRequest {
  pageIndex: number;
  pageSize: number;
  orderConditions: IOrderCondition[];
  filter: IQueryFilter;
}

export interface IOrderTable {
  /**
   * 当前列数据
   */
  column: number;
  /**
   * 排序依据的指标
   */
  key: string;
  /**
   * 排序的顺序，值为 asc 或 desc
   */
  order: string;
}

export interface ISelect {
  /**
   * 是否选中
   */
  selected: boolean;
  /**
   * 显示值
   */
  text: string;
  /**
   * 隐藏值
   */
  value: string;
  /**
   * 是否可操作
   */
  disabled: boolean;
  /**
   *
   */
  group: unknown;
}

export interface IUploadExtro {
  fileList: Blob[];
  guid: string;
  fileType: string;
}

export class QueryFilter implements IQueryFilter {
  // filters!: IQueryFilter[];
  /**
   * 查询条件and或者Or
   */
  filterConnect: EFilterConnect = EFilterConnect.And;
  /**
   * 查询条件列表
   */
  conditions: Array<IFilterCondition> = new Array<IFilterCondition>();
}

export class PageRequest implements IPageRequest {
  pageIndex: number = 1;
  pageSize: number = 10;
  orderConditions: IOrderCondition[] = [];
  filter: IQueryFilter = new QueryFilter();
}

//查询条件
export interface ISearchFilter extends IFilterCondition {
  /**
   * 标题
   */
  title: string;

  /**
   * 数据类型
   */
  dataType?: string;

  /**
   * 控件配置,如何空就默认text
   */
  config?: ControlConfig;
}

//控件配置，一般用来select,tre等格外配置
export class ControlConfig {
  //控件类型
  type: ControlTypeEnum=ControlTypeEnum.select;

  //控件数据
  data?: ISelectListItem[] | string | undefined | number;

  //控件URL，某些控件需要请求提交数据的
  url?: string | undefined;
}

//查询过滤条件
export class SearchFilter implements ISearchFilter {
  constructor(
    public title: string,
    public field: string,
    public operator?: QueryEnum.EFilterOprator,
    public config?: ControlConfig,
    public value?: string | number | boolean | undefined
  ) {}
}

//控件类型枚举
export enum ControlTypeEnum {
  //下拉
  select,
}
