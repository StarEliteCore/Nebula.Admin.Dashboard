import { Component, Mixins } from "vue-property-decorator";
import { IRoleInputDto, RoleInputDto } from "@/domain/entity/role/roleDto";

import { EOperate } from "@/shared/eoperate";
import { Guid } from "guid-typescript";
import { MainManager } from "@/domain/services/main/main-manager";
import OperateMixins from "@/shared/mixins/operate.mixins";

@Component({
  name: "RoleOperate",
})
export default class RoleOperate extends Mixins(OperateMixins) {
  private roleInput: IRoleInputDto = new RoleInputDto(
    Guid.EMPTY,
    "",
    false,
    ""
  );

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

  protected OnHandleCancel() {
    /**
     * 取消顯示
     */
    this.IsShow = false;
    this.roleInput= new RoleInputDto(
      Guid.EMPTY,
      "",
      false,
      ""
    );
    (this.$refs.form as any).resetFields();
  }

  Show(
    _type: EOperate,
    callback: (res: boolean) => void,
    _rowId?: string,
    _row?: any
  ) {
    debugger;
    switch (_type) {
      case EOperate.view:
        this.title = `查看角色`;
        this.disabled = true;

        this.roleInput = this.ToRoleInputDto(_row);
        break;
      case EOperate.add:
        this.title = "添加角色";
        this.roleInput = new RoleInputDto(Guid.EMPTY, "", false, "");
        break;
      case EOperate.update:
        this.disabled = false;
        this.IsShowColumn = false;
        this.roleInput = this.ToRoleInputDto(_row);
        this.title = `修改角色`;
        break;
    }
    this.CB = callback;
    this.type = _type;
    this.IsShow = true;
  }

  private ToRoleInputDto = (_row: any): IRoleInputDto => {
    let dto: IRoleInputDto = {
      description: _row.description,
      id: _row.id,
      isAdmin: _row.isAdmin,
      name: _row.name,
    };
    return dto;
  };

  // Show(_type: EOperate, callback: (res: boolean) => void, _rowId?: string) {

  //   this.title = "添加角色";
  //   this.CB = callback;
  //   this.type = _type;
  //   this.IsShow = true;
  // }

  //创建或者更新角色
  private async CreateOrUpdateRole() {
    let res = await MainManager.Instance().RoleService.createOrUpdateRole(
      this.roleInput
    );
    this.ajaxcallback(res, true);
    this.IsShow = false;
  }
}
