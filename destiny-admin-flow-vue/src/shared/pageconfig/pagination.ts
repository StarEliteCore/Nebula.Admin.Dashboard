type PaginationSizeChange = (size: number) => void;
type PaginationCurrentChange = (currentPage: number) => void;
const pagesize: string[] = ["10", "20", "50", "100"];

export interface IPageBase {
    pageIndex: number;
    pageSize: number;
    pageTotal: number;
    total: number;
  }

  export class PageBase implements IPageBase {
    pageIndex: number = 0;
    pageSize: number = 100;
    pageTotal: number = 0;
    total: number = 0;
  }

  /**
 * 前端页面显示的结构
 */
export class Pagination {
    public pageIndex: number = 1;
    public total: number = 0;
    public pageTotal: number = 0;
    public pageSize: number = 10;
    public defaultCurrent: number = 1;
    public defaultPageSize: number = 10;
    public hideOnSinglePage?: boolean = false;
    public pageSizeOptions?: string[] = pagesize;
    public showQuickJumper?: boolean = false;
    public showSizeChanger?: boolean = false;
  }

  // 分页操作
export class PaginationHandle {
    // 修改pageSize
    public OnHandleSizeChangeSelf?: PaginationSizeChange;
    // 前后翻页
    public OnCurrentChangeSelf?: PaginationCurrentChange;
    // 跳转到首页
    public OnHandleFirst?: PaginationCurrentChange;
    // 跳转到尾页
    public OnHandleLast?: PaginationCurrentChange;
    // 跳页
    public OnJumpPage?: PaginationCurrentChange;
  
    public Pagination: Pagination = new Pagination();
  
    constructor(
      _OnHandleSizeChange?: PaginationSizeChange,
      _OnCurrentChange?: PaginationCurrentChange,
      _OnPageFirst?: PaginationCurrentChange,
      _OnPageLast?: PaginationCurrentChange,
      _OnJumpPage?: PaginationCurrentChange
    ) {
      this.OnHandleSizeChangeSelf = _OnHandleSizeChange;
      this.OnCurrentChangeSelf = _OnCurrentChange;
      this.OnHandleFirst = _OnPageFirst;
      this.OnHandleLast = _OnPageLast;
      this.OnJumpPage = _OnJumpPage;
    }
  }
  