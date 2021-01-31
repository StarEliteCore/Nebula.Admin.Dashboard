import { AjaxResult, IAjaxResult } from "@/shared/response";
import { Component, Mixins, Prop } from "vue-property-decorator";

import DestinyCoreModule from "@/shared/core/DestinyCoreModule";
import { EditModalMixins } from "@/shared/mixins/edit-modal.mixins";
import { Guid } from "guid-typescript";
import { MainManager } from "@/domain/services/main/main-manager";
import { TreeChild } from "view-design";

@Component({
  name: "ApiScope",
})
export default class ApiScope extends Mixins(EditModalMixins) {
  private ruleValidate = {
    /**
     *
     */
    name: [
      { required: true, message: "范围名不可为空", trigger: "onHandleCommit" },
    ],
  };
  private apiResourceScopeList: Array<any> = [];

  // protected InIt() {
  //   this.MapTo();
  //   this.GetFormRef();
  // }

  // protected OnBeforeCommit() {
  //   this.editData;
  //   debugger;
  // }

  protected MapTo() {
    const apiService = MainManager.Instance().ApiResourceService;

    apiService.getApiResourceScopeList().then((result: IAjaxResult) => {
      // todo提示待优化
      DestinyCoreModule.ToAjaxResult(result, () => {
        this.apiResourceScopeList = result.data;
      });
    });
  }
}
