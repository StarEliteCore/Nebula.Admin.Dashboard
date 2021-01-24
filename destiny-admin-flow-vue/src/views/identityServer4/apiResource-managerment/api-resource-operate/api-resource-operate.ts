import { Component, Mixins } from "vue-property-decorator";

import { EditModalMixins } from "@/shared/mixins/edit-modal.mixins";
import { MainManager } from "@/domain/services/main/main-manager";

@Component({
  name: "ApiResource",
})
export default class ApiResource extends Mixins(EditModalMixins) {

    protected MapTo(_rowId: string) {
      
     }
    


}
