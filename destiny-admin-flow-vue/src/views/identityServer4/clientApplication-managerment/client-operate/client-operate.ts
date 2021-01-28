import { AjaxResult, IAjaxResult } from "@/shared/response";
import { Component, Mixins } from "vue-property-decorator";

import { ClientDtoBase } from "@/domain/entity/identityServer4/clientapplicationDto/clientapplicationDto";
import DestinyCoreModule from "@/shared/core/DestinyCoreModule";
import { EOperate } from "@/shared/eoperate";
import { EditModalMixins } from "@/shared/mixins/edit-modal.mixins";
import { IApiResourceDtoBase } from "@/domain/entity/identityServer4/apiResourceDto/apiResourceDto";
import { MainManager } from "@/domain/services/main/main-manager";
import OperateMixins from "@/shared/mixins/operate.mixins";
import { SelectListItem } from "@/shared/response/selectDto";

@Component({ 
    name: "ClientOperate"
    }
)
export default class ClientOperate extends Mixins(OperateMixins) {
  private client: ClientDtoBase =new ClientDtoBase();
  private grantTypes: Array<SelectListItem> = [];
  private ruleValidate = {
    /**
     * 客户端Id
     */
    clientId: [{ required: true, message: "客户端Id不可为空", trigger: "OnHandleCommit" }],
    /**
     * 客户端名称
     */
    clientName: [{ required: true, message: "客户端名称不可为空", trigger: "OnHandleCommit" },],
    allowedGrantTypes: [{ required: true, message: "授权类型不可为空", trigger: "OnHandleCommit" },],
  };
  created()
  {
    console.log(1231313213)
  }
  Show(_type: EOperate, callback: (res: boolean) => void, _rowId?: string) {
    MainManager.Instance().ClientApplicationService.getGrantTypeSelectItem()
      .then((x) => {
        x.success && (this.grantTypes = x.data.itemList);
        // console.log(this.grantTypes)
      });
    switch (_type) {
        case EOperate.add:
             this.title="添加客户端";
            break;
    }
    this.IsShow = true;
    this.type = _type;
  }
  private OnHandleCommit() {
    (this.$refs.form as any).validate((valid: boolean) => {
      if (valid) {
        debugger
        switch (this.type) {
          case EOperate.view:
            this.IsShow = false;
            this.CB(true);
            break;
          case EOperate.add:
            debugger
            console.log(this.client)
            this.IsShow = false;
            break;
          case EOperate.update:
            // this.UpdateUser();
            this.IsShow = false;
            break;
        }
      }
    });
  }
}
