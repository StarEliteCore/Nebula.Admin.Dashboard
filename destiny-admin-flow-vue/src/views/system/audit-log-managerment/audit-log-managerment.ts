import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";
import {
  IAuditLogOutputPageDto,
  IAuditLogTableDto,
} from "@/domain/entity/auditdto/auditDto";
import { IFilterCondition, IQueryFilter, QueryFilter } from "@/shared/request";

import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { EOperate } from "@/shared/eoperate";
import { ITableColumn } from "@/shared/table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";
import PageMixins from "@/shared/mixins/page.mixins";
import TableExpandOperate from "./log-operate/audit-entry-table-expand.vue";

@Component({
  name: "AuditLogManagerment",
  components: {
    TableExpandOperate,
  },
})
export default class AuditLogManagerment extends Mixins(
  PageMixins,
  DeleteMixins
) {
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private CurrentRow!: IAuditLogTableDto;
  private CurrentArray: Array<IAuditLogTableDto> = [];

  private CurrentSelectionArray: any = [];

  private columns: ITableColumn[] = [
    {
      type: "expand",
      width: 50,
      align: "center",
      render: (h: any, params: any) => {
        return h(TableExpandOperate, {
          props: {
            row: params.row,
          },
        });
      },
    },
    {
      title: "功能名",
      key: "functionName",
      align: "center",
      maxWidth: 150,
    },
    {
      title: "用户名",
      key: "userName",
      align: "center",
      maxWidth: 90,
    },
    {
      title: "昵称",
      key: "nickName",
      align: "center",
      maxWidth: 90,
    },

    {
      title: "Url",
      key: "action",
      align: "center",
    },
    {
      title: "IP地址",
      key: "ip",
      align: "center",
    },
    {
      title: "执行时长",
      key: "executionDuration",
      align: "center",
    },
    {
      title: "浏览器信息",
      key: "browserInformation",
      align: "center",
      tooltip: true,
    },

    {
      title: "审计时间",
      key: "createdTime",
      align: "center",
    },
  ];
  private auditLogTable: Array<IAuditLogOutputPageDto> = [];

  private filters: IFilterCondition[] = [
    {
      field: "functionName",
      value: "",
      operator: EFilterOprator.Equal,
    },
    {
      field: "action",
      value: "",
      operator: EFilterOprator.Equal,
    },
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
    this.getAuditLogPageAsync();
  }

  @Emit()
  pageChange() {
    this.getAuditLogPageAsync();
  }
  /**
   * 页面加载方法
   */
  private created() {}
  private mounted() {
    this.getAuditLogPageAsync();
  }

  private async getAuditLogPageAsync() {
    await MainManager.Instance()
      .SystemService.getAuditLogPage(this.tranfer(this.queryfileter))
      .then((res) => {
        if (res.success) {
          this.auditLogTable = res.itemList;
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
}
