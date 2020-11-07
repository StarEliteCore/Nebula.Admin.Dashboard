import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Prop } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from '@/shared/request/query.enum';
import { IFilterCondition, IQueryFilter } from '@/shared/request';

import AuditEntryPropertyExpandOperate from "../../audit-entry-managerment/operate/audit-entry-property-managerment.vue"
import { IAuditEntryTableDto } from "@/domain/entity/auditdto/auditDto";
import { ITableColumn } from "@/shared/table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";
import PageMixins from "@/shared/mixins/page.mixins";

@Component({
  name: "TableExpand",
  components: {
    AuditEntryPropertyExpandOperate,
  },
})
export default class TableExpand extends Mixins(PageMixins) {
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();

  @Prop()
  protected row!: any;

  private columns: ITableColumn[] = [
    {
      type: "expand",
      width: 50,
      align: "center",
      render: (h: any, params: any) => {
        return h(AuditEntryPropertyExpandOperate, {
          props: {
            row: params.row,
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

  @Emit()
  pageChange() {
    this.getAuditEntryPageAsync();
  }

  private auditEntryTable: Array<IAuditEntryTableDto> = [];
  private created() {}
  private mounted() {
    let newFilters: IFilterCondition[] = [{
      field:"AuditLogId",
      operator:EFilterOprator.Equal,
      value:this.row.id
    }];
    let filter: IQueryFilter = {
      filterConnect: EFilterConnect.And,
      conditions: newFilters,
    };
    this.queryfileter.filter = filter;


    this.getAuditEntryPageAsync();
  }
}
