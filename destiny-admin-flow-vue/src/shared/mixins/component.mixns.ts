import * as PageQuery from "@/shared/request";

import { Component, Emit, Ref, Vue } from "vue-property-decorator";
import {
  IPageRequest,
  IQueryFilter,
  ISearchFilter,
  PageRequest,
  SearchFilter,
} from "@/shared/request";

import { DestinyCoreBase } from '../core/destiny-core-base';
import { IAjaxResult } from "../response";
import { IDestinyCoreServeice } from '@/domain/services/destinycoreserveice/IDestinyCoreServeice';
import { ITableColumn } from "../table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";
import MySearch from "@/shared/search/my-search.vue";
import PageComponent from "@/components/page-component/page-component.vue";
import PageInfo from "@/components/page-component/page-component";
import SearchInfo from "@/shared/search/my-search";

@Component({
  name: "ComponentMixins",
  components: {
    MySearch,
    PageComponent,
  },
})
export class ComponentMixins extends Vue implements DestinyCoreBase {

  request!: IPageRequest;
  mainManager!: MainManager;
  pageUrl!: string;
  deleteUrl!: string;

  columns: ITableColumn[] = [];
  tableData: any[] = [];
  fields: ISearchFilter[] = [];
  //删除时候控制
  delectLoading: boolean = false;

  currentArray: any = [];
  currentSelectionArray: any = [];
  currentRow: any = [];

  destinyCoreServeice!: IDestinyCoreServeice;

  protected Init() {
    this.request = new PageRequest();
    this.mainManager = MainManager.Instance();
    this.columns = this.GetColumn();
    this.fields = this.GetFields();
    this.destinyCoreServeice= this.mainManager.DestinyCoreServeice;
    this.GetPage();
  }

  public mounted() {
    this.Init();
  }

  protected GetPage() {
    if (this.pageUrl) {
      this.mainManager.DestinyCoreServeice.getPage(
        this.pageUrl,
        this.GetReq(this.request)
      )
        .then((res) => {
          if (res.success) {
            this.tableData = res.itemList;
            this.total = res.total;
          }
        })
        .catch((re) => {
          console.log(re);
        });
    }
  }

  protected GetColumn(): ITableColumn[] {
    return [];
  }

  protected GetFields(): SearchFilter[] {
    return [];
  }

  @Ref("SearchInfo")
  protected SearchInfo!: SearchInfo;

  search(filter: IQueryFilter) {
    if (!filter) {
      return;
    }
    this.request.filter = filter;
    this.GetPage();
  }

  protected total: number = 0;
  protected loading: boolean = false;
  @Ref("PageInfo")
  protected PageInfo!: PageInfo;

  protected GetReq(_pageRequest: IPageRequest) {
    let filter: IPageRequest = JSON.parse(JSON.stringify(_pageRequest));
    // filter.queryFilter.filters = filters;
    filter.pageIndex = this.PageInfo.PaginationHandle.Pagination.pageIndex;
    filter.pageSize = this.PageInfo.PaginationHandle.Pagination.pageSize;
    return filter;
  }

  currentRowEventArray(_selection: any, _row: any) {
    this.currentRow = _row;
    this.currentSelectionArray = _selection;
  }

  currentRowEventCancel(_selection: any, _row: any) {
    this.currentRow = _row;
    this.currentSelectionArray = _selection;
  }

  //删除回调
  deleteCallback(res: IAjaxResult) {}

 handleDelete() {
    if (this.deleteUrl) {
      this.delectLoading = true;
      let selecteds: any = this.currentSelectionArray;
      this.getSingleSeletedRow(selecteds, (id: string, row: any) => {
        this.mainManager.DestinyCoreServeice.delete(this.deleteUrl, id)
          .then(
            (res: IAjaxResult) => {
              if (res.success) {
                this.GetPage();
                this.deleteCallback(res);
                this.$Message.success(res.message);
              } else {
                this.deleteCallback(res);
                this.$Message.error(res.message);
              }
            },
            () => {
              this.delectLoading = false;
            }
          )
          .finally(() => {
            this.delectLoading = false;
          });
      });
     
    }
  }

  //得到表格单选行
  getSingleSeletedRow(
    selection: [],
    callback: any,
    infoCallback?: any,
    key?: string
  ): void {
    if (selection == null || selection == undefined || selection.length === 0) {
      this.$Message.error("请选择一行数据!!");
      if (infoCallback) {
        infoCallback();
      }
      return;
    }

    if (selection.length > 1) {
      this.$Message.info(
        `已选${selection.length},条选数据，请选择一条数据！！`
      );
      if (infoCallback) {
        infoCallback();
      }
      return;
    }
    let newSelection: Array<any> = selection as [];

    let fun = function() {
      if (callback) {
        if (typeof key == "undefined" || undefined || null) {
          key = "id";
        }
        callback(newSelection[0][key], newSelection[0]);
      }
    };

    fun();
  }

  @Emit()
  pageChange() {
    this.GetPage();
  }
}
