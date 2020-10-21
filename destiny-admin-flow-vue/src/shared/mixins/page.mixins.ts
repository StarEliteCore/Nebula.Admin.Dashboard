import { Component, Ref, Vue } from "vue-property-decorator";

import { EOperate } from '../eoperate';
import PageComponent from "@/components/page-component/page-component.vue";
import PageInfo from "@/components/page-component/page-component";
import { IPageRequest } from '../request';

@Component({
  name: "PageMixins",
  components: {
    PageComponent,
  }
})
export default class PageMixins extends Vue {
  protected total: number = 0;
  protected loading: boolean = false;
  private operate = EOperate;
  @Ref("PageInfo")
  protected PageInfo!: PageInfo;
  protected tranfer(_filter: IPageRequest) {
    // let filters = this.$filterTrans.filterParam(
    //   _filter.queryFilter.filters
    // );
    let filter: IPageRequest = JSON.parse(
      JSON.stringify(_filter)
    );
    // filter.queryFilter.filters = filters;
    filter.pageIndex = this.PageInfo.PaginationHandle.Pagination.pageIndex;
    filter.pageRow = this.PageInfo.PaginationHandle.Pagination.pageSize;
    return filter;
  }
}
