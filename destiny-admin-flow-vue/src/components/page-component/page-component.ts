import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { PaginationHandle } from '@/shared/pageconfig/pagination';

@Component({
  name: "PageComponent"
})
export default class PageComponent extends Vue {
  PaginationHandle: PaginationHandle = new PaginationHandle(
    (size: number) => {
      this.PaginationHandle.Pagination.pageSize = size;
      this.PaginationHandle.Pagination.pageTotal = Math.ceil(
        this.PaginationHandle.Pagination.total /
          this.PaginationHandle.Pagination.pageSize
      );
    },
    (currentPage: number) => {
      this.PaginationHandle.Pagination.pageIndex = currentPage;
    },
    (pageFirst: number) => {
      this.PaginationHandle.Pagination.pageIndex = pageFirst;
    },
    (pageLast: number) => {
      this.PaginationHandle.Pagination.pageIndex = pageLast;
    }
  );
  @Prop({ default: 0, type: Number })
  total!: number;
  @Watch("total", { immediate: true })
  ChangeTotal(_total: number) {
    this.PaginationHandle.Pagination.total = _total;
    if (this.PaginationHandle.Pagination.total === 0) {
      this.PaginationHandle.Pagination.pageTotal = 1;
    } else {
      this.PaginationHandle.Pagination.pageTotal = Math.ceil(
        this.PaginationHandle.Pagination.total /
          this.PaginationHandle.Pagination.pageSize
      );
    }
  }
  @Watch("PaginationHandle.Pagination.pageSize")
  PageSizeChange(_pagesize: number) {
    this.$emit("PageChange", this.PaginationHandle.Pagination);
  }
  @Watch("PaginationHandle.Pagination.pageIndex")
  PageChange(_pageIndex: number) {
    this.$emit("PageChange", this.PaginationHandle.Pagination);
  }
  get ButtonDisable() {
    return this.PaginationHandle.Pagination.total === 0 ? true : false;
  }
  /**
   * @description 页码初始  可初始也可以不初始
   * @param {PaginationHandle} [_pageHandle]
   */
  pageInit(_pageHandle?: PaginationHandle) {
    this.PaginationHandle =
      typeof _pageHandle !== "undefined" ? _pageHandle : this.PaginationHandle;
  }
  PageIndexChange(_index: number): void {
    this.PaginationHandle.Pagination.pageIndex = 1;
  }
}
