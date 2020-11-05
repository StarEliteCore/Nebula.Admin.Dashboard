import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";
import { IAuditEntryOutputPageDto, IAuditEntryTableDto } from '@/domain/entity/auditdto/auditDto';
import { IFilterCondition, IQueryFilter, QueryFilter } from "@/shared/request";

import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { EOperate } from "@/shared/eoperate";
import EntryPropertOperate from "./operate/audit-entry-property-managerment.vue"
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



  private columns: ITableColumn[] = [
    {
      type: "expand",
      width: 50,
      align: "center",
      render: (h: any, params: any) => {
        return h(EntryPropertOperate, {
          props: {
            row: params.row,
          },
        });
      },
    },
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
      title: "编号",
      key: "keyValues",
      align: "center",
      maxWidth: 300,
      slot: "keyValues",
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
    }
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


}
