import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Prop, Ref } from "vue-property-decorator";
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

  @Prop()
  protected row!: any;


  private columns: ITableColumn[] = [
    {
      title: "属性显示名",
      key: "propertieDisplayName",
      align: "center",
      maxWidth: 150
    },
    {
      title: "属性名称",
      key: "properties",
      align: "center",
      maxWidth: 300,
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
      align: "center"
    }
  ];
  private auditEntryPropertyTable: Array<IAuditEntryPropertyTableDto> = [];






  

  @Emit()
  pageChange() {
    this.getAuditEntryPropertyPageAsync();
  }
  /**
   * 页面加载方法
   */
  private created() {}
  private mounted() {
    let newFilters: IFilterCondition[] = [{
      field:"AuditEntryId",
      operator:EFilterOprator.Equal,
      value:this.row.id
    }];
    let filter: IQueryFilter = {
      filterConnect: EFilterConnect.And,
      conditions: newFilters,
    };
    this.queryfileter.filter = filter;

    this.getAuditEntryPropertyPageAsync();
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


  


}
