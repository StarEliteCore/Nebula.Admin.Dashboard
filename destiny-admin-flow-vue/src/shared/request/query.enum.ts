/**
 * 查询连接条件
 */
export enum EFilterConnect {
    And,
    Or
  }
  
  /**
   * 过滤操作符
   */
  export enum EFilterOprator {
    /**
     * 等于
     */
    Equal,
    /**
     * 大于
     */
    GreaterThan,
    /**
     * 大于或等于
     */
    GreaterThanOrEqual,
    /**
     * 小于
     */
    LessThan,
    /**
     * 小于或等于
     */
    LessThanOrEqual,
    /**
     * 不等于
     */
    NotEqual,
    /**
     * 包含
     */
    In,
    /**
     * 模糊查询
     */
    Like
  }
  /**
 * 排序枚举
 */
export enum ESort {
  Ascending,
  Descending
}
  