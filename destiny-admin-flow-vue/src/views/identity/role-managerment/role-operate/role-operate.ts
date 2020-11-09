import { Component, Mixins, Prop } from "vue-property-decorator";
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
        this.$emit("saveEdit", this.roleInput);
        //this.CreateOrUpdateRole();
      }
    });
  }



  private ToRoleInputDto = (_row?: any): IRoleInputDto => {
    if (_row === undefined) {
      return this.roleInput;
    }
    let dto: IRoleInputDto = {
      description: _row.description,
      id: _row.id,
      isAdmin: _row.isAdmin,
      name: _row.name,
    };
    return dto;
  };

  

  @Prop()
  editTitle!: string;

  @Prop()
  editData!: any;

  isOpen: boolean = false;


  private created() {
    this.$on("open", this.open);
    this.$on("close", this.close);
  }

  public open() {
    this.isOpen = true;
     
     this.roleInput = this.ToRoleInputDto(this.editData);
  }

  public close() {
    this.isOpen = false;
  }
}
