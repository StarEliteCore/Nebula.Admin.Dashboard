import { Component, Mixins, Prop } from "vue-property-decorator";

import { AuditApi } from "@/domain/config/api";
import { ComponentMixins } from "@/shared/mixins/component.mixns";
import { EFilterOprator } from "@/shared/request/query.enum";
import { IFilterCondition } from "@/shared/request";
import { ITableColumn } from "@/shared/table/ITable";

@Component({
  name: "AuditEntryPropertyManagerment",
  components: {},
})
export default class AuditEntryPropertyManagerment extends Mixins(
  ComponentMixins
) {
  @Prop()
  protected row1!: any;
  pageUrl: string = AuditApi.getAuditEntryPropertyPage;

  GetColumn(): ITableColumn[] {
    return [
      {
        title: "属性显示名",
        key: "propertieDisplayName",
        align: "center",
        maxWidth: 150,
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
        maxWidth: 300,
      },
      {
        title: "修改后数据",
        key: "newValues",
        align: "center",
        maxWidth: 300,
      },
      {
        title: "属性类型",
        key: "propertiesType",
        align: "center",
        slot: "propertiesType",
      },
    ];
  }

  GetFilterCondition(): IFilterCondition[] {
    let newFilters: IFilterCondition[] = [
      {
        field: "AuditEntryId",
        operator: EFilterOprator.Equal,
        value: this.row1.id,
      },
    ];
    return newFilters;
  }
}
