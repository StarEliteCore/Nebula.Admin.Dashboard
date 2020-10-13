import * as QueryEnum from "@/shared/request/query.enum";
import { ESort } from '@/shared/request/query.enum';

/**
 * 查询参数
 */
export interface IQueryFilter {
    /**
     * 查询条件and或者Or
     */
    filterConnect: QueryEnum.EFilterConnect;
    /**
     * 查询条件列表
     */
    filters: Array<IFilterCondition>;
  }
  export interface IFieldOperate {
    /**
     * 字段名称
     */
    field: string;
    /**
     * 过滤操作器
     */
    operator: QueryEnum.EFilterOprator;
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
    pageRow: number;
    orderConditions: IOrderCondition[];
    queryFilter: IQueryFilter;
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
  