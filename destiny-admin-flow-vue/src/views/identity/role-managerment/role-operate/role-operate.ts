import { Component, Mixins } from "vue-property-decorator";
import { IRoleInputDto, RoleInputDto } from "@/domain/entity/role/roleDto";

import { EOperate } from '@/shared/eoperate';
import { Guid } from 'guid-typescript';
import { MainManager } from "@/domain/services/main/main-manager";
import OperateMixins from "@/shared/mixins/operate.mixins";

@Component({
  name: "RoleOperate",
})
export default class RoleOperate extends Mixins(OperateMixins) {
  private roleInput: IRoleInputDto = new RoleInputDto(Guid.EMPTY,"", false, "");

  private ruleValidate = {
    /**
     *
     */
    name: [
      { required: true, message: "角色名不可为空", trigger: "OnHandleCommit" },
    ],
  };

  private OnHandleCommit() {
    (this.$refs.form as any).validate((valid: boolean) => {
      if (valid) {
        this.CreateOrUpdateRole();
      }
    });
  }

  Show(_type: EOperate, callback: (res: boolean) => void, _rowId?: string) {

    this.title = "添加角色";
    this.CB = callback;
    this.type = _type;
    this.IsShow = true;
  }

  //创建或者更新角色
  private async CreateOrUpdateRole() {
  
    let res = await MainManager.Instance().RoleService.createOrUpdateRole(
      this.roleInput
    );
    this.ajaxcallback(res, true);
    this.IsShow = false;
  }
}
