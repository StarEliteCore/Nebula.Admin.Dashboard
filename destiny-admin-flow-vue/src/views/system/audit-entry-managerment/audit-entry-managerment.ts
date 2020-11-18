import { Component, Mixins } from "vue-property-decorator";

import { AuditApi } from "@/domain/config/api";
import { ComponentMixins } from "@/shared/mixins/component.mixns";
import { EFilterOprator } from "@/shared/request/query.enum";
import EntryPropertOperate from "./operate/audit-entry-property-managerment.vue";
import { ISearchFilter } from "@/shared/request";
import { ITableColumn } from "@/shared/table/ITable";

@Component({
  name: "AuditEntryManagerment",
  components: {
    EntryPropertOperate,
  },
})
export default class AuditEntryManagerment extends Mixins(ComponentMixins) {
  pageUrl: string = AuditApi.getAuditEntryPage;
  likeValueFormat: string = "{0}";
  GetColumn(): ITableColumn[] {
    return [
      {
        type: "expand",
        width: 50,
        align: "center",
        render: (h: any, params: any) => {
          return h(EntryPropertOperate, {
            props: {
              row1: params.row,
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
        maxWidth: 150,
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
        maxWidth: 95,
      },
      {
        title: "昵称",
        key: "nickName",
        align: "center",
        maxWidth: 95,
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
        field: "entityAllName",
        value: "",
        title: "类型",
        operator: EFilterOprator.Like,
      },
      {
        field: "entityDisplayName",
        value: "",
        title: "实体名",
        operator: EFilterOprator.Like,
      },
    ];
  }
}
