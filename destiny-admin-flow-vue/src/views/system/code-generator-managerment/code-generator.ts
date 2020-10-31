import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";

import { AjaxResult } from "@/shared/response";
import { IEntityMetadataDto } from "@/domain/entity/codeGenerator/EntityMetadataDto";
import { IProjectMetadataDto } from "@/domain/entity/codeGenerator/ProjectMetadataDto";
import { IPropertyMetadataDto } from "@/domain/entity/codeGenerator/PropertyMetadataDto";
import { ITableColumn } from "@/shared/table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";
import PageMixins from "@/shared/mixins/page.mixins";

@Component({
  name: "CodeGeneratorManagerment",
})
export default class CodeGeneratorManagerment extends Mixins(PageMixins) {
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private formItem: IPropertyMetadataDto = {
    isPrimaryKey: false,
    propertyName: "",
    displayName: "",
    isNullable: false,
    defaultValue: "",
    cSharpType: "Guid",
    isInputDto: false,
    isOutputDto: false,
    isPageDto: false,
    aggregateType: "",
  };



  private entityFormItem: IEntityMetadataDto = {
    entityName: "",
    displayName: "",
    primaryKeyType: "",
    primaryKeyName: "",
    isGeneratorDto: false,
    isAutoMap: false,
    isCreation: false,
    isModification: false,
    isSoftDelete: false,
    auditedUserKeyType: "",
    properties:[]
  };

  private entityRuleValidate: any = {
    entityName: [
      { required: true, message: "请输入实体名!!!", trigger: "blur" },
    ],
    displayName: [
      { required: true, message: "请输入显示名!!!", trigger: "blur" },
    ],
    primaryKeyType: [
      { required: true, message: "请选择主键类型!!!", trigger: "blur" },
    ],
  };

  private projectRuleValidate: any = {
    namespace: [
      { required: true, message: "请输入命名空间!!!", trigger: "blur" },
    ],
    saveFilePath: [
      { required: true, message: "请输入保存文件路径!!!", trigger: "blur" },
    ],
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
      key: "propertyName",
      align: "center",
    },
    {
      title: "显示名",
      key: "displayName",
      align: "center",
    },
    {
      title: "是否可空",
      key: "isNullable",
      slot: "isNullable",
      align: "center",
    },
    {
      title: "C#类型",
      key: "cSharpType",
      align: "center",
    },
    {
      title: "是否生成输入DTO",
      key: "isInputDto",
      align: "center",
      slot: "isInputDto",
    },
    {
      title: "是否生成输出DTO",
      key: "isOutputDto",
      align: "center",
      slot: "isOutputDto",
    },
    {
      title: "是否生成分页DTO",
      key: "isPageDto",
      align: "center",
      slot: "isPageDto",
    },
    {
      title: "复杂类型",
      key: "aggregateType",
      align: "center",
    },
    {
      title: "操作",
      slot: "op",
      align: "center",
    },
  ];

  private PropertyArr: any = [];
  private IsAddPropertyModal: boolean = false;
  private cSharpTypeList: any = [];

  private ruleValidate: any = {
    propertyName: [
      { required: true, message: "请输入属性名!!!", trigger: "blur" },
    ],
    displayName: [
      { required: true, message: "请输入显示名!!!", trigger: "blur" },
    ],
    cSharpType: [
      { required: true, message: "请选择C#类型!!!", trigger: "blur" },
    ],
  
  };

  
  private projectFormItem: IProjectMetadataDto = {
    namespace: "",
    saveFilePath: "",
    entityMetadata:this.entityFormItem
  };

  private created() {
    let $this = this;
    MainManager.Instance()
      .CodeGeneratorService.GetCSharpTypeToSelectItem()
      .then((result: AjaxResult) => {
        if (result.success) {
          $this.cSharpTypeList = result.data;
          // console.log($this.cSharpTypeList);
        }
      });
  }
  AddProperty() {
    this.IsAddPropertyModal = true;
    this.formItem = {
      isPrimaryKey: false,
      propertyName: "",
      displayName: "",
      isNullable: false,
      defaultValue: "",
      cSharpType: "Guid",
      isInputDto: false,
      isOutputDto: false,
      isPageDto: false,
      aggregateType: "",
    };
  
  }

  private remove(_row: IPropertyMetadataDto, _index: number) {
    this.PropertyArr.splice(_index, 1);
  }

  private cancel() {
    this.IsAddPropertyModal = false;
    (this.$refs["formItem"] as any).resetFields();
  }

  private ok() {
    (this.$refs["formItem"] as any).validate(async (valid: any) => {
      if (valid) {
        let formItemData = this.formItem;
        let data = {
          isPrimaryKey: false,
          propertyName: formItemData.propertyName,
          displayName: formItemData.displayName,
          isNullable: formItemData.isNullable,
          defaultValue: "",
          cSharpType: formItemData.cSharpType,
          isInputDto: formItemData.isInputDto,
          isOutputDto: formItemData.isOutputDto,
          isPageDto: formItemData.isPageDto,
          aggregateType: formItemData.aggregateType,
        };
        this.PropertyArr.push(data);
        this.IsAddPropertyModal = false;
      } else {
        this.IsAddPropertyModal = true;
      }
    });
  }

  private save() {
    let isEntityValid = false;
    let $this = this;

    (this.$refs["entityFormItem"] as any).validate(async (valid: any) => {
      if (valid) {
        isEntityValid = true;
      }
    });
    (this.$refs["projectFormItem"] as any).validate(async (valid: any) => {
      if (valid&&isEntityValid) {
        let projectItem: IProjectMetadataDto = Object.assign(
          $this.projectFormItem
        );
        let entityItem: IEntityMetadataDto = Object.assign(
          $this.entityFormItem
        );

      
        let propertyItem: IPropertyMetadataDto[] = $this.PropertyArr as IPropertyMetadataDto[];
        entityItem.properties=propertyItem;

        MainManager.Instance().CodeGeneratorService.generateCode(projectItem).then((result: AjaxResult) => {
          if (result.success) {
           
            $this.$Message.success("代码生成成功！！");
          }
        });
    
      } else {
        $this.$Message.success("代码生成失败！！");
      }
    });
  }
}
