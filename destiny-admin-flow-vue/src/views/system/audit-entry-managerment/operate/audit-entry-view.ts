import { Component, Mixins } from "vue-property-decorator";

import { EditModalMixins } from "@/shared/mixins/edit-modal.mixins";

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
}
