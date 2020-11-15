import { Component, Mixins } from "vue-property-decorator";

import { EditModalMixins } from "@/shared/mixins/edit-modal.mixins";
import { IAjaxResult } from "@/shared/response";
import { MainManager } from "@/domain/services/main/main-manager";

@Component({
  name: "FunctionOperate",
})
export default class FunctionOperate extends Mixins(EditModalMixins) {
  private ruleValidate = {
    /**
     *
     */
    name: [
      { required: true, message: "功能不可为空", trigger: "onHandleCommit" },
    ],
    linkUrl: [
      { required: true, message: "链接Url", trigger: "onHandleCommit" },
    ],
  };

  protected MapTo(_rowId: string) {
    if (_rowId === undefined) {
      return;
    }
    MainManager.Instance()
      .FunctionService.getFunctionById(_rowId)
      .then((res: IAjaxResult) => {
        if (res.success) {
          this.editData = res.data;
        }
      });
  }

  protected InIt() {
    this.MapTo(this.editData.id as string);
    this.GetFormRef();
  }

  //   //创建或者更新角色
  //   private async CreateOrUpdateFunction() {
  //     let res = await MainManager.Instance().FunctionService.createOrUpdateFunction(
  //       this.functionInput
  //     );
  //     this.ajaxcallback(res, true);
  //     this.IsShow = false;
  //   }
}
