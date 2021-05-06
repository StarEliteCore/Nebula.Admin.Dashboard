import * as PageQuery from "@/shared/request";

import { Component, Emit, Ref, Vue } from "vue-property-decorator";
import {
  IFilterCondition,
  IOrderCondition,
  IPageRequest,
  IQueryFilter,
  ISearchFilter,
  PageRequest,
  SearchFilter,
} from "@/shared/request";

import { ESex } from "@/domain/entity/userdto/userDto";
import EditModal from "@/components/edit-modal/edit-modal.vue";
import { IAjaxResult } from "../response";
import { IDestinyCoreServeice } from "@/domain/services/destinycoreserveice/IDestinyCoreServeice";
import { ITableColumn } from "../table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";
import MySearch from "@/shared/search/my-search.vue";
import PageComponent from "@/components/page-component/page-component.vue";
import PageInfo from "@/components/page-component/page-component";
import SearchInfo from "@/shared/search/my-search";
import { ESort } from "../request/query.enum";

@Component({
  name: "ComponentMixins",
  components: {
    MySearch,
    PageComponent,
    EditModal,
  },
})
export class ComponentMixins extends Vue {
  request!: IPageRequest;
  mainManager!: MainManager;
  pageUrl!: string;
  deleteUrl!: string;
  saveEditUrl!: string;

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
    this.columns = this.GetColumn();
    this.fields = this.GetFields();
    this.mainManager = MainManager.Instance();
    this.destinyCoreServeice = this.mainManager.DestinyCoreServeice;
    this.GetPage();
    this.editModel = this.$refs.editModel as Vue;
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
          console.error(re);
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
    let conditions = this.GetFilterCondition();
    if (conditions.length > 0) {
      conditions.forEach((e: IFilterCondition, i: number) => {
        _pageRequest.filter.conditions.push(e);
      });
    }

    let orders = this.GetOrderColumn();

    if (orders.length > 0) {
      _pageRequest.orderConditions = orders;
    }

    let filter: IPageRequest = JSON.parse(JSON.stringify(_pageRequest));

    // filter.queryFilter.filters = filters;
    filter.pageIndex = this.PageInfo.PaginationHandle.Pagination.pageIndex;
    filter.pageSize = this.PageInfo.PaginationHandle.Pagination.pageSize;
    return filter;
  }

  //得到排序列
  private GetOrderColumn(): IOrderCondition[] {
    let orders: IOrderCondition[] =
      this.GetOrders().length > 0 ? this.GetOrders() : [];
    if (this.columns.length > 0) {
      this.columns.forEach((e, i) => {
        if (e.sort === ESort.Ascending || e.sort === ESort.Descending) {
          let sort: IOrderCondition = {
            sortDirection: e.sort,
            sortField: e.key ?? "",
          };
          let isSort = orders.filter((o) => {
            //判断是否存在
            return o.sortField.toLowerCase() == e.key?.toLowerCase() ?? "";
          });
          if (isSort.length === 0) {
            orders.push(sort);
          }
        }
      });
    }
    return orders;
  }
  ///排序
  protected GetOrders(): IOrderCondition[] {
    return [];
  }

  protected GetFilterCondition(): IFilterCondition[] {
    return [];
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
  deleteCallback(res: IAjaxResult) {
    if (res.success) {
      this.$Message.success(res.message);
      this.delectLoading = false;
    } else {
      this.$Message.error(res.message);
      this.delectLoading = false;
    }
  }

  handleDelete() {
    if (this.deleteUrl) {
      this.delectLoading = true;
      let selecteds: any = this.currentSelectionArray;
      this.getSingleSeletedRow(
        selecteds,
        (id: string, row: any) => {
          this.mainManager.DestinyCoreServeice.delete(this.deleteUrl, id)
            .then((res: IAjaxResult) => {
              if (res.success) {
                this.GetPage();
                this.deleteCallback(res);
              } else {
                this.deleteCallback(res);
              }
            })
            .finally(() => {
              this.delectLoading = false;
            });
        },
        () => {
          this.delectLoading = false;
        }
      );
    }
  }

  getSeletedRow(callback: any) {
    let selecteds: any = this.currentSelectionArray;
    this.getSingleSeletedRow(selecteds, callback);
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

  editModel: any;
  editTitle: string = "新增";
  editData: any = {};
  handleAdd() {
    if (!this.editModel) {
      return;
    }
    this.editTitle = "新增";
    this.editData = {};
    this.editModel.$emit("open");
  }

  handleUpdate() {
    if (this.editModel) {
      this.getSeletedRow((id: string, row: any) => {
        this.editTitle = "修改";
        this.editData = row;

        this.$nextTick(() => this.editModel.$emit("open"));
      });
    }
  }

  @Emit()
  saveEdit(_data: any) {
    if (this.saveEditUrl) {
      this.mainManager.DestinyCoreServeice.save(this.saveEditUrl, _data).then(
        (res: IAjaxResult) => {
          if (res.success) {
            this.$Message.success("保存成功");
            this.editModel.$emit("close");
            this.GetPage();
          } else {
            this.$Message.error(res.message);
          }
        }
      );
    }
  }

  @Emit()
  refresh() {
    this.GetPage();
  }
}
