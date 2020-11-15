import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";
import {
  IAuditLogOutputPageDto,
  IAuditLogTableDto,
} from "@/domain/entity/auditdto/auditDto";
import {
  IFilterCondition,
  IQueryFilter,
  ISearchFilter,
} from "@/shared/request";

import { AuditApi } from "@/domain/config/api";
import { ComponentMixins } from "@/shared/mixins/component.mixns";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { ITableColumn } from "@/shared/table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";
import TableExpandOperate from "./log-operate/audit-entry-table-expand.vue";

@Component({
  name: "AuditLogManagerment",
  components: {
    TableExpandOperate,
  },
})
export default class AuditLogManagerment extends Mixins(
  ComponentMixins
) {
  pageUrl: string = AuditApi.getAuditLogPage;

  GetColumn() {
    return [
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
  }

  GetFields(): ISearchFilter[] {
    return [
      {
        field: "functionName",
        value: "",
        operator: EFilterOprator.Equal,
        title: "功能名：",
      },
      {
        field: "action",
        value: "",
        operator: EFilterOprator.Equal,
        title: "审计URL：",
      },
    ];
  }

}
