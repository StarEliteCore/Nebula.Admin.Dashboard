import { AjaxResult, IAjaxResult } from "@/shared/response";
import { Component, Mixins } from "vue-property-decorator";

import DestinyCoreModule from "@/shared/core/DestinyCoreModule";
import { EditModalMixins } from "@/shared/mixins/edit-modal.mixins";
import { IApiResourceDtoBase } from "@/domain/entity/identityServer4/apiResourceDto/apiResourceDto";
import { MainManager } from "@/domain/services/main/main-manager";

@Component({
  name: "ApiResource",
})
export default class ApiResource extends Mixins(EditModalMixins) {


    private userClaimItemList:Array<any> =[];
    protected InIt() {
      this.MapTo(this.editData.id as string);
      this.GetFormRef();
    }
  
    private userClaimsValidator = (rule: any, value: any, callback: Function) => {
      debugger;
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
        { required: true, validator:this.userClaimsValidator, trigger: "onHandleCommit" },
        
      ],
      apiSecretValue: [
        { required: true, message: "秘钥不可为空", trigger: "onHandleCommit" },
        
      ],
    };


 
    protected MapTo(_rowId: string) {

      const apiService=  MainManager.Instance().ApiResourceService;

      apiService.getJwtClaimTypeSelectItem().then((result: IAjaxResult)=>{

        // todo提示待优化
        DestinyCoreModule.ToAjaxResult(result,()=>{
         this.userClaimItemList=result.data.itemList;

        });

      })
     }
    


}
