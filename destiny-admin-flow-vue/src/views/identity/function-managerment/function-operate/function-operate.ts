import { AjaxResult, IAjaxResult } from '@/shared/response';
import { Component, Mixins } from "vue-property-decorator";
import { FunctionInputDto, IFunctionInputDto } from '@/domain/entity/functiondto/functionDto';
import { IRoleInputDto, RoleInputDto } from "@/domain/entity/role/roleDto";

import { EOperate } from "@/shared/eoperate";
import { Guid } from "guid-typescript";
import { MainManager } from "@/domain/services/main/main-manager";
import OperateMixins from "@/shared/mixins/operate.mixins";

@Component({
  name: "FunctionOperate",
})
export default class FunctionOperate extends Mixins(OperateMixins) {
  private functionInput: IFunctionInputDto= new FunctionInputDto();
  private ruleValidate = {
    /**
     *
     */
    name: [
      { required: true, message: "功能不可为空", trigger: "OnHandleCommit" },
    ],
    linkUrl: [
        { required: true, message: "链接Url", trigger: "OnHandleCommit" },
      ],
  };

  private OnHandleCommit() {
    (this.$refs.form as any).validate((valid: boolean) => {
      if (valid) {
        this.CreateOrUpdateFunction();
      }
    });
  }

  protected OnHandleCancel() {
    /**
     *
     */
    this.IsShow = false;
    this.functionInput= new FunctionInputDto();
    (this.$refs.form as any).resetFields();
  }

  Show(
    _type: EOperate,
    callback: (res: boolean) => void,
    _rowId?: string
  ) {
    switch (_type) {

      case EOperate.add:
        this.title = "添加功能";
        this.functionInput = new FunctionInputDto();
        break;
      case EOperate.update:
        this.disabled = false;
        this.IsShowColumn = false;
        typeof _rowId !== "undefined" && this.getFunctionById(_rowId);
        this.title = `修改角色`;
        break;
    }
    this.CB = callback;
    this.type = _type;
    this.IsShow = true;
  }


private  getFunctionById(id: string)
{
     MainManager.Instance().FunctionService.getFunctionById(id).then((res:IAjaxResult)=>{

       if(res.success)
       {
           this.functionInput=res.data;
       }

     });

}
  //创建或者更新角色
  private async CreateOrUpdateFunction() {
    let res = await MainManager.Instance().FunctionService.createOrUpdateFunction(
      this.functionInput
    );
    this.ajaxcallback(res, true);
    this.IsShow = false;
  }
}
