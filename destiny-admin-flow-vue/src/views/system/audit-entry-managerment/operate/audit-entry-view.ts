import { Component, Mixins } from "vue-property-decorator";

import { EditModalMixins } from "@/shared/mixins/edit-modal.mixins";
import { IAjaxResult } from "@/shared/response";
import { ITableColumn } from "@/shared/table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";

@Component({
  name: "AuditEntryView",
})
export default class AuditEntryView extends Mixins(EditModalMixins) {
  public getOerationType(oerationType: string) {
    if (oerationType == "0") {
      return "无";
    } else if (oerationType == "1") {
      return "新增";
    } else if (oerationType == "2") {
      return "删除";
    } else if (oerationType == "3") {
      return "更新";
    }
  }

  
  private auditPropertyList:any=[];

  private propertyTableColumn: ITableColumn[]=[

    {
      title: "属性名称",
      key: "properties",
      align: "center",
      maxWidth: 150,
    },
    {
      title: "显示名",
      key: "propertieDisplayName",
      align: "center",
      maxWidth: 150,
    },
    {
      title: "属性类型",
      key: "propertiesType",
      align: "center",
      maxWidth: 150,
    },
    {
      title: "修改前数据",
      key: "newValues",
      align: "center",
    },
    {
      title: "修改后数据",
      key: "originalValues",
      align: "center"
    },
  
  ];

  mounted()
  {
    const containerHtml = document.getElementById("ddd");
        const height: number =
          containerHtml !== null ? containerHtml.clientHeight : 750;
  }
  protected InIt() {

    let id=this.editData.id as string;
    MainManager.Instance().SystemService.getAuditPropertyList(id)
    .then((res: IAjaxResult) => {
      if (res.success == true) {
        this.auditPropertyList = res.data;

      }
    });
   
  }

}
