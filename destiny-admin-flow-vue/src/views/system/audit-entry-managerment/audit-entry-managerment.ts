import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";
import { IAuditEntryOutputPageDto, IAuditEntryTableDto } from '@/domain/entity/auditdto/auditDto';
import { IFilterCondition, IQueryFilter, QueryFilter } from "@/shared/request";

import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { EOperate } from "@/shared/eoperate";
import EntryPropertOperate from "./operate/audit-entry-property-managerment.vue"
import EntryPropertyOperateInfo from "./operate/audit-entry-property-managerment"
import { ITableColumn } from "@/shared/table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";
import PageMixins from "@/shared/mixins/page.mixins";
import { Row } from 'ant-design-vue';

@Component({
  name: "AuditEntryManagerment",
  components: {
    EntryPropertOperate
  },
})
export default class AuditEntryManagerment extends Mixins(PageMixins, DeleteMixins) {
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private CurrentRow!: IAuditEntryTableDto;
  private CurrentArray: Array<IAuditEntryTableDto> = [];

  private CurrentSelectionArray: any = [];


  private columns: ITableColumn[] = [

    {
      title: "实体名称",
      key: "entityAllName",
      align: "center",
      maxWidth: 300,
    },
    {
      title: "实体显示名称",
      key: "entityDisplayName",
      align: "center",
      maxWidth: 150
    },
    {
      title: "主键",
      key: "keyValues",
      align: "center",
      maxWidth: 300
    },
    {
      title: "操作类型",
      key: "operationType",
      align: "center",
      slot: "operationType",
      maxWidth: 95
    },
      {
        title: "昵称",
        key: "nickName",
        align: "center",
        maxWidth: 95
      },

    {
      title: "审计时间",
      key: "createdTime",
      align: "center",
    },
    {
      title: "操作",
      slot: "action",
      align: "center",
      width: 100,
    },
  ];
  private auditEntryTable: Array<IAuditEntryTableDto> = [];


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
    }
  ];

  private dynamicQuery: any = {};



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
    });

    let filter: IQueryFilter = {
      filterConnect: EFilterConnect.And,
      conditions: newFilters,
    };
    this.queryfileter.filter = filter;
    this.getAuditEntryPageAsync();
  }

  @Emit()
  pageChange() {
    this.getAuditEntryPageAsync();
  }
  /**
   * 页面加载方法
   */
  private created() {}
  private mounted() {
    this.getAuditEntryPageAsync();
  }

  private async getAuditEntryPageAsync() {
    await MainManager.Instance()
      .SystemService.getAuditEntryPage(this.tranfer(this.queryfileter))
      .then((res) => {
        if (res.success) {
          this.auditEntryTable = res.itemList;
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


  @Ref("EntryPropertyOperateInfo")
  private EntryPropertyOperateInfo!:EntryPropertyOperateInfo;

  private CurrentRowClick(row:any,index:any)
  {


    this.EntryPropertyOperateInfo.showDrawer(row.id);

  }
}
