import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";

import { IPropertyMetadataDto } from "@/domain/entity/codeGenerator/PropertyMetadataDto";
import { ITableColumn } from "@/shared/table/ITable";
import PageMixins from "@/shared/mixins/page.mixins";

@Component({
  name: "CodeGeneratorManagerment",
})
export default class CodeGeneratorManagerment extends Mixins(PageMixins) {
  private default: IPropertyMetadataDto = {
    isPrimaryKey: false,
    propertyName: "",
    displayName: "",
    isNullable: false,
    defaultValue: "",
    cSharpType: "",
    isInputDto: false,
    isOutputDto: false,
    isPageDto: false,
  };

  private columns: ITableColumn[] = [
    {
      title: "属性名",
      slot: "Name",
      align: "center",
    },
    {
      title: "属性名",
      slot: "Name",
      align: "center",
    },
  ];
  private PropertyArr: IPropertyMetadataDto[] = [];
  private created() {
    this.PropertyArr.push(this.default);
  }
  AddRow() {
    this.PropertyArr.push(this.default);
  }
}
