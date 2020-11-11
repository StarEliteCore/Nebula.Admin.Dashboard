import { Component, Mixins, Prop } from "vue-property-decorator";
import { IRoleBaseDto, IRoleInputDto, RoleInputDto, RoleOutputDto } from "@/domain/entity/role/roleDto";

import { EOperate } from "@/shared/eoperate";
import { EditModalMixins } from "@/shared/mixins/edit-modal.mixins";
import { Guid } from "guid-typescript";
import { MainManager } from "@/domain/services/main/main-manager";
import OperateMixins from "@/shared/mixins/operate.mixins";

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
