import { Component, Mixins } from "vue-property-decorator";

import { EditModalMixins } from "@/shared/mixins/edit-modal.mixins";

@Component({
  name: "RoleOperate",
})
export default class RoleOperate extends Mixins(EditModalMixins) {

  private ruleValidate = {
    /**
     *
     */
    name: [
      { required: true, message: "角色名不可为空", trigger: "onHandleCommit" },
    ],
  };



}
