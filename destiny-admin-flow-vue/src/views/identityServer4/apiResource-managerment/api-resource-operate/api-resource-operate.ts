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

    private editData1:IApiResourceDtoBase | undefined;
    private userClaims:Array<any> =[];
    protected InIt() {
      this.MapTo(this.editData.id as string);
      this.GetFormRef();
    }
  
    protected MapTo(_rowId: string) {
      this.editData1= this.editData as IApiResourceDtoBase;
      const apiService=  MainManager.Instance().ApiResourceService;

      apiService.getJwtClaimTypeSelectItem().then((result: IAjaxResult)=>{

        DestinyCoreModule.ToAjaxResult(result,()=>{
         this.userClaims=result.data.itemList;

        });

      })
     }
    


}
