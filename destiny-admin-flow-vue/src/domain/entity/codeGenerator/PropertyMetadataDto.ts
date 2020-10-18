/**
 * 属性元数据
 */

export interface IPropertyMetadataDto {
  /**
   * 是否主键
   */
  isPrimaryKey: boolean;

  /**
   * 属性名
   */
  propertyName: string;

  /**
   * 显示名
   */
  displayName: string;

  /**
   * 是否允许为空
   */
  isNullable: boolean;

  /**
   * 默认值
   */
  defaultValue: string;

  /**
   *  C#数据类型
   */
  cSharpType: string;

  /**
   *  该字段是否生成输入DTO
   */
  isInputDto: boolean;

  /**
   *  该字段是否生成输出DTO
   */
  isOutputDto: boolean;

  /**
   *  该字段是否生成分页DTO
   */
  isPageDto: boolean;

  /**
   *  该字段集合类型
   */
  aggregateType: string;
}
