import { Component, Mixins } from "vue-property-decorator";
import { ESex, UserInputDto } from "@/domain/entity/userdto/userDto";

import { EOperate } from "@/shared/eoperate";
import { MainManager } from "@/domain/services/main/main-manager";
import OperateMixins from "@/shared/mixins/operate.mixins";

@Component({
  name: "UserOperates",
})
export default class UserOperate extends Mixins(OperateMixins) {
  private userInput: UserInputDto = new UserInputDto();
  private SexSelectOptions: Array<any> = [
    { key: ESex.Man, label: "男" },
    { key: ESex.Female, label: "女" },
  ];

  private ruleValidate = {
    /**
     *
     */
    userName: [{ required: true, message: "用户名不可为空", trigger: "blur" }],
    /**
     *
     */
    nickName: [
      { required: true, message: "用户昵称不可为空", trigger: "blur" },
    ],
    /**
     * 密码不可为空
     */
    passwordHash: [
      { required: true, message: "密码不可为空", trigger: "blur" },
    ],
    /**
     * 请选择性别
     */
    sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  };

  Show(_type: EOperate, callback: (res: boolean) => void, _rowId?: string) {
    switch (_type) {
      case EOperate.view:
        this.title = `查看用户`;
        this.disabled = true;
        typeof _rowId !== "undefined" && this.getUserById(_rowId);
        break;
      case EOperate.add:
        this.title = "添加用户";
        this.userInput = new UserInputDto();
        break;
      case EOperate.update:
        this.disabled = false;
        this.IsShowColumn = false;
        typeof _rowId !== "undefined" && this.getUserById(_rowId);
        this.title = `编辑用户`;
        break;
    }
    this.CB = callback;
    this.type = _type;
    this.IsShow = true;
  }
  private OnHandleCommit() {
    debugger;
    (this.$refs.form as any).validate((valid: boolean) => {
      if (valid) {
        switch (this.type) {
          case EOperate.view:
            this.IsShow = false;
            this.CB(true);
            break;
          case EOperate.add:
            this.CreateUser();
            break;
          case EOperate.update:
            this.IsShow = false;
            break;
        }
      }
    });
  }
  /**
   * @description 根据id获取用户
   * @param {string} _id id
   */
  private async getUserById(_id: string) {
    let res = await MainManager.Instance().UserService.getUserById(_id);
    if (res.success) {
      this.userInput = res.data;
      console.log(this.userInput);
    }
  }
  private async CreateUser() {
    let res = await MainManager.Instance().UserService.createUser(
      this.userInput
    );
    this.ajaxcallback(res);
  }
}
