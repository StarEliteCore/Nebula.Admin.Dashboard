import { Component, Mixins } from "vue-property-decorator";

import { EOperate } from "@/shared/eoperate";
import OperateMixins from "@/shared/mixins/operate.mixins";
import { UserInputDto } from "@/domain/entity/userdto/userDto";

@Component({
  name: "UserOperates",
})
export default class UserOperate extends Mixins(OperateMixins) {
  private userInput: UserInputDto = new UserInputDto();
  Show(_type: EOperate, callback: (res: boolean) => void, _rowId?: string) {
    debugger;
    switch (_type) {
      case EOperate.view:
        this.title = `查看api项`;
        break;
      case EOperate.add:
        this.title = "添加api项";
        break;
      case EOperate.update:
        this.title = `编辑api项`;
        break;
    }
    this.CB = callback;
    this.IsShow = true;
  }
}
