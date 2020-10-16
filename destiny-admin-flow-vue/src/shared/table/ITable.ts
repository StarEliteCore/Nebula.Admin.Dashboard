export interface ITableBase {
      /**
       * 列头显示文字
       */
      title?: string;
      /**
       * 对应列内容的字段名
       */
      key?: string;
      /**
       * 插槽
       */
      slot?: string;
    }
    export interface ITbaleStyle {
          /**
           * 列宽
           */
          width?: number;
          /**
           * 最大列宽
           */
          maxWidth?: number;
          /**
           * 最小列宽
           */
          minWidth?: number;
          /**
           * 对齐方式，可选值为 left 左对齐、right 右对齐和 center 居中对齐
           */
          align?: string;
          /**
           * 列是否固定在左侧或者右侧，可选值为 left 左侧和 right 右侧
           */
          fixed?: string;
          /**
           * 开启后，文本将不换行，超出部分显示为省略号
           */
          ellipsis?: boolean;
          /**
           * 使用 slot 自定义列时，列的渲染模式。可选值为 block、inline、inline-block，当使用树形数据时，建议使用 inline 或 inline-block
           */
          display?: string;
        }
    /**
 * iview 结构
 */
export interface ITableColumn extends ITableBase, ITbaleStyle {
      /**
       * 开启后，文本将不换行，超出部分显示为省略号，并用 Tooltip 组件显示完整内容
       */
      tooltip?: boolean;
      /**
       * 列类型，可选值为 index、selection、expand、html
       */
      type?: string;
      /**
       * 列的样式名称
       */
      className?: string;
      /**
       * 对应列是否可以排序，如果设置为 custom，则代表用户希望远程排序，需要监听 Table 的 on-sort-change 事件
       */
      sortable?: boolean | string;
      /**
       * 该列是否允许拖拽调整宽度，需开启 border 属性，且设置 width
       */
      resizable?: boolean;
      /**
       *
       */
      render?: Function;
      /**
       * 指定该列为显示展开/收起图标，树形数据时使用
       */
      tree?: boolean;
      /**
       * 表头分组
       */
      children?: Array<ITableColumn>;
      /**
       * 数据过滤的选项是否多选
       */
      filterMultiple?: boolean;
    }