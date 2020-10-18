import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";

import { AjaxResult } from "@/shared/response";
import { IPropertyMetadataDto } from "@/domain/entity/codeGenerator/PropertyMetadataDto";
import { ITableColumn } from "@/shared/table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";
import PageMixins from "@/shared/mixins/page.mixins";

@Component({
  name: "CodeGeneratorManagerment",
})
export default class CodeGeneratorManagerment extends Mixins(PageMixins) {
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
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
      type: "index",
      title: "序号",
      width: 70,
      align: "center",
    },
    {
      title: "属性名",
      slot: "PropertyName",
      align: "center",
    },
    {
      title: "显示名",
      slot: "DisplayName",
      align: "center",
    },
    {
      title: "是否可空",
      slot: "IsNullable",
      align: "center",
    },
    {
      title: "C#类型",
      slot: "CSharpType",
      align: "center",
    },
    {
      title: "是否生成输入DTO",
      slot: "IsInputDto",
      align: "center",
    },
    {
      title: "是否生成输出DTO",
      slot: "IsOutputDto",
      align: "center",
    },
    {
      title: "是否生成分页DTO",
      slot: "IsPageDto",
      align: "center",
    },
  ];

  private PropertyArr: IPropertyMetadataDto[] = [];
  private cSharpTypeList: ITableColumn[] = [
    {
      title: "是否生成分页DTO",
      slot: "IsPageDto",
      align: "center",
    },
  ];
  private created() {
    let $this = this;
    MainManager.Instance()
      .CodeGeneratorService.GetCSharpTypeToSelectItem()
      .then((result: AjaxResult) => {
        if (result.success) {
          //  $this.cSharpTypeList=result.data;
          console.log($this.cSharpTypeList);
        }
      });
    this.PropertyArr.push(this.default);
  }
  AddRow() {
    this.PropertyArr.push({
      isPrimaryKey: false,
      propertyName: "",
      displayName: "",
      isNullable: false,
      defaultValue: "",
      cSharpType: "",
      isInputDto: false,
      isOutputDto: false,
      isPageDto: false,
    });
  }

  private updatePropertyName(_row: IPropertyMetadataDto, _index: number) {
    this.PropertyArr[_index].propertyName = _row.propertyName;
  }

  private updateDisplayName(_row: IPropertyMetadataDto, _index: number) {
    this.PropertyArr[_index].displayName = _row.displayName;
  }

  private updateIsNullable(_row: IPropertyMetadataDto, _index: number) {
    this.PropertyArr[_index].isNullable = _row.isNullable;
  }

  private updateDefaultValue(_row: IPropertyMetadataDto, _index: number) {
    this.PropertyArr[_index].defaultValue = _row.defaultValue;
  }

  private updateCSharpType(_row: IPropertyMetadataDto, _index: number) {
    this.PropertyArr[_index].cSharpType = _row.cSharpType;
  }

  private updateIsInputDto(_row: IPropertyMetadataDto, _index: number) {
    this.PropertyArr[_index].isInputDto = _row.isInputDto;
  }

  private updateIsOutputDto(_row: IPropertyMetadataDto, _index: number) {
    this.PropertyArr[_index].isOutputDto = _row.isOutputDto;
  }

  private updateIsPageDto(_row: IPropertyMetadataDto, _index: number) {
    this.PropertyArr[_index].isPageDto = _row.isPageDto;
  }
}
