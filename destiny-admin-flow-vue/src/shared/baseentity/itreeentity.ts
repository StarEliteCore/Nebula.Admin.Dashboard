/**
 * 树形通用实体
 */
export interface ITreeDto {
    /**
     * 唯一值
     */
    key: string;
    /**
     * 是否展开
     */
    expand: boolean;
    /**
     * 是否禁用
     */
    disabled: boolean;
    /**
     * 深度
     */
    depth: number;
    /**
     * 父级Id
     */
    parentId: string;
    /**
     * 所有父级Id
     */
    parenNumber: string;
    /**
     * 标题
     */
    title:string;
  }