import { Guid } from 'guid-typescript';

/**
 * 主键
 */
export interface IEntity<T> {
  id: T;
}
/**
 * 描述
 */
export interface IDescription {
  /**
   * 描述
   */
  description: string;
}
/**
 * 创建时间
 */
export interface ICreatedTime {
  createdTime: string;
}
/**
 * 最后修改时间
 */
export interface ILastModifionTime {
  lastModifionTime: string;
}
/**
 * 是否删除
 */
export interface IIsDeleted {
  isDeleted: boolean;
}





