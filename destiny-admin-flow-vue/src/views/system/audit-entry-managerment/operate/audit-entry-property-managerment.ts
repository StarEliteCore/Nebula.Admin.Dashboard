import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";
import { IAuditEntryPropertyTableDto, IAuditEntryTableDto } from '@/domain/entity/auditdto/auditDto';
import { IFilterCondition, IQueryFilter, QueryFilter } from "@/shared/request";

import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { EOperate } from "@/shared/eoperate";
import { ITableColumn } from "@/shared/table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";
import PageMixins from "@/shared/mixins/page.mixins";

@Component({
  name: "AuditEntryPropertyManagerment",
  components: {

  },
})
export default class AuditEntryPropertyManagerment extends Mixins(PageMixins, DeleteMixins) {
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private CurrentRow!: IAuditEntryPropertyTableDto;
  private CurrentArray: Array<IAuditEntryPropertyTableDto> = [];
 private isOpenDrawer:boolean=false;
  private CurrentSelectionArray: any = [];


  private columns: ITableColumn[] = [

    {
      title: "属性名称",
      key: "properties",
      align: "center",
      maxWidth: 300,
    },
    {
      title: "实体显示名称",
      key: "propertieDisplayName",
      align: "center",
      maxWidth: 150
    },
    {
      title: "修改前数据",
      key: "originalValues",
      align: "center",
      maxWidth: 300
    },
    {
      title: "修改后数据",
      key: "newValues",
      align: "center",
      maxWidth: 300
    },
    {
      title: "属性类型",
      key: "propertiesType",
      align: "center",
      maxWidth: 95
    }
  ];
  private auditEntryPropertyTable: Array<IAuditEntryPropertyTableDto> = [];

  private auditEntryId!: string;
  private filters: IFilterCondition[] = [
    {
      field: "entityAllName",
      value: "",
      operator: EFilterOprator.Equal,
    },
    {
      field: "entityDisplayName",
      value: "",
      operator: EFilterOprator.Equal,
    },
    {
      field: "auditEntryId",
      value:'',
      operator: EFilterOprator.Equal,
    },
  ];

  private dynamicQuery: any = {

    auditEntryId:''
  };

 public styles:any= {
    height: 'calc(100% - 55px)',
    overflow: 'auto',
    paddingBottom: '53px',
    position: 'static'
};


  //查询
  private search() {
    let newFilters: IFilterCondition[] = [];
    let $this = this;

    this.filters.forEach((f) => {
      let value = $this.dynamicQuery[f.field];
      if (value != undefined && value != "") {
        let filter: IFilterCondition = {
          field: f.field,
          value: f.operator == EFilterOprator.Like ? `%${value}%` : value,
          operator: f.operator,
        };
        newFilters.push(filter);
      }

      // if(typeof auditEntryId != "undefined"&&newFilters.filter(o=>o.field=="AuditEntryId").length<=0)
      // {
        
      //   let filter: IFilterCondition = {
      //     field: "AuditEntryId",
      //     value:auditEntryId,
      //     operator: EFilterOprator.Equal,
      //   };
      //   newFilters.push(filter);
      // }
    });

    let filter: IQueryFilter = {
      filterConnect: EFilterConnect.And,
      conditions: newFilters,
    };
    this.queryfileter.filter = filter;
    this.getAuditEntryPropertyPageAsync();
  }

  @Emit()
  pageChange() {
    this.getAuditEntryPropertyPageAsync();
  }
  /**
   * 页面加载方法
   */
  private created() {}
  private mounted() {
   
  }

  private async getAuditEntryPropertyPageAsync() {
    await MainManager.Instance()
      .SystemService.getAuditEntryPropertyPage(this.tranfer(this.queryfileter))
      .then((res) => {
        if (res.success) {
          this.auditEntryPropertyTable = res.itemList;
          this.total = res.total;
        }
      });
  }


  private CurrentRowEventArray(_selection: any, _row: any) {
    this.CurrentRow = _row;
    this.CurrentSelectionArray = _selection;
    // console.log(_row, _selection);
  }

  private CurrentRowEventCancel(_selection: any, _row: any) {
    this.CurrentRow = _row;
    this.CurrentSelectionArray = _selection;
  }
  

  public showDrawer(auditEntryId:string)
  {

      this.auditEntryId=auditEntryId;
      this.isOpenDrawer=true;
      this.dynamicQuery.auditEntryId=auditEntryId;
      this.PageInfo.PaginationHandle.Pagination.pageIndex=1;  //不设置就有BUG
      // this.filters.map(o=>({

      //   field:o.field,
      //   value:o.field=="auditEntryId"?auditEntryId :o.value,
      //   operator:o.operator

      // }));
      //this.getAuditEntryPropertyPageAsync();
      this.search();
  }

}
