import { AjaxResult, IAjaxResult } from "@/shared/response";
import { Component, Mixins, Prop } from "vue-property-decorator";

import DestinyCoreModule from "@/shared/core/DestinyCoreModule";
import { EditModalMixins } from "@/shared/mixins/edit-modal.mixins";
import { Guid } from "guid-typescript";
import { IApiResourceDtoBase } from "@/domain/entity/identityServer4/apiResourceDto/apiResourceDto";
import { MainManager } from "@/domain/services/main/main-manager";

@Component({
  name: "ApiResource",
})
export default class ApiResource extends Mixins(EditModalMixins) {
  private index: number = 1;

  editData1 = {
    id: Guid.EMPTY,
    name: "",
    enabled: true,
    displayName: "",
    description: "",
    userClaims: [],
    apiSecretValue: "",
    scopes: [],
    apiSecrets: [
      {
        value: "",
      },
    ],
    items: [
      {
        value: "",
        index: 1,
        status: 1,
      },
    ],
  };

  private userClaimItemList: Array<any> = [];
  protected InIt() {
    this.MapTo(this.editData.id as string);
    this.GetFormRef();
  }

  private userClaimsValidator = (rule: any, value: any, callback: Function) => {
    if (typeof value === "undefined" || value === "") {
      callback(new Error("用户声明不可为空"));
    } else {
      callback();
    }
  };

  private ruleValidate = {
    /**
     *
     */
    name: [
      { required: true, message: "资源名不可为空", trigger: "onHandleCommit" },
    ],
    userClaims: [
      {
        required: true,
        validator: this.userClaimsValidator,
        trigger: "onHandleCommit",
      },
    ],
    apiSecretValue: [
      { required: true, message: "秘钥不可为空", trigger: "onHandleCommit" },
    ],
  };

  handleAdd() {
    this.index++;
    this.editData1.items.push({
      value: "",
      index: this.index,
      status: 1,
    });
    // (this.editData.items as Array<any>).push({

    //   value: "",
    //   index: this.index,
    //   status: 1,
    // })
  }

  handleRemove(index: number) {
    this.editData1.items[index].status = 0;
  }

  protected OnBeforeCommit() {
    ///有没有办法简单点(用拷贝吗？？？？)
    this.editData.name = this.editData1.name;
    this.editData.enabled = this.editData1.enabled;
    this.editData.displayName = this.editData1.displayName;
    this.editData.description = this.editData1.description;
    this.editData.scopes = [];
    this.editData.userClaims = this.editData1.userClaims;
    this.editData.apiSecrets = [];
    this.editData.apiSecrets.push({ value: this.editData1.apiSecretValue });
    this.editData1.items.forEach((value) => {
      this.editData.scopes.push(value.value);
    });
  }

  protected MapTo(_rowId: string) {
    const apiService = MainManager.Instance().ApiResourceService;

    apiService.getJwtClaimTypeSelectItem().then((result: IAjaxResult) => {
      // todo提示待优化
      DestinyCoreModule.ToAjaxResult(result, () => {
  
        this.userClaimItemList = result.data.itemList;
      });
    });
  }
}
