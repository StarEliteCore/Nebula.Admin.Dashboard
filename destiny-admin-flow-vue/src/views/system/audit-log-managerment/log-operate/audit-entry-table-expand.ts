import { Component, Mixins, Prop } from "vue-property-decorator";

import { AuditApi } from "@/domain/config/api";
import AuditEntryPropertyExpandOperate from "../../audit-entry-managerment/operate/audit-entry-property-managerment.vue";
import { ComponentMixins } from "@/shared/mixins/component.mixns";
import { EFilterOprator } from "@/shared/request/query.enum";
import { IFilterCondition } from "@/shared/request";
import { ITableColumn } from "@/shared/table/ITable";

@Component({
  name: "TableExpand",
  components: {
    AuditEntryPropertyExpandOperate,
  },
})
export default class TableExpand extends Mixins(ComponentMixins) {
  pageUrl: string = AuditApi.getAuditEntryPage;

  @Prop()
  protected row!: any;

  GetColumn(): ITableColumn[] {
    return [
      {
        type: "expand",
        width: 50,
        align: "center",
        render: (h: any, params: any) => {
          return h(AuditEntryPropertyExpandOperate, {
            props: {
              row1: params.row,
            },
          });
        },
      },
      {
        title: "实体名称",
        key: "entityDisplayName",
        align: "center",
      },
      {
        title: "实体类型",
        key: "entityAllName",
        align: "center",

      },
      {
        title: "编号",
        key: "keyValues",
        align: "center",
        slot: "keyValues",
      },
      {
        title: "类型",
        key: "operationType",
        align: "center",
        slot: "operationType",
      },
    ];
  }

  GetFilterCondition() {
    let newFilters: IFilterCondition[] = [
      {
        field: "AuditLogId",
        operator: EFilterOprator.Equal,
        value: this.row.id,
      },
    ];
    return newFilters;
  }

  // private mounted() {
  //   let newFilters: IFilterCondition[] = [{
  //     field:"AuditLogId",
  //     operator:EFilterOprator.Equal,
  //     value:this.row.id
  //   }];}
  //   let filter: IQueryFilter = {
  //     filterConnect: EFilterConnect.And,

  //   this.getAuditEntryPageAsync();      conditions: newFilters,
  //   };
  //   this.queryfileter.filter = filter;

  // }
}
