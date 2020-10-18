import { IPropertyMetadataDto } from './PropertyMetadataDto';

/**
 * 实体元数据
 */
export interface IEntityMetadataDto{
  
    /**
     * 实体名
     */
    entityName:string,
     
     /**
     * 显示名
     */
    displayName:string,

     /**
     * 主键类型
     */
    primaryKeyType:string,

    /**
     * 主键名
     */
    primaryKeyName:string,

    /**
     * 是否生成Dto
     */
    isGeneratorDto:boolean,

      /**
     * 是否自动映射
     */
    isAutoMap:boolean,

    /**
     * 是否创建
     */
    isCreation:boolean,

    /**
     * 是否修改
     */
    isModification:boolean,

     /**
     * 是否软删除
     */
    isSoftDelete:boolean,

     /**
     * 审核用户键类型
     */
    auditedUserKeyType:string,

    /**
     * 属性集合
     */
    properties:IPropertyMetadataDto[]
}