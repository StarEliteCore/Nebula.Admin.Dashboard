import { Component, Ref, Vue } from "vue-property-decorator";
import { IAjaxResult, IServerReturn } from "../response";

import { EOperate } from "../eoperate";

@Component({
  name: "OperateMixins",
})
export default class OperateMixins extends Vue {
  /**
   * 是否顯示
   */
  protected IsShow: boolean = false;
  /**
   * 標題名稱
   */
  protected title: string = "";
  /**
   * 隱藏
   */
  protected disabled: boolean = false;
  /**
   * 操作類型
   */
  protected type: EOperate = -1;
  /**
   * 回調事件
   */
  protected CB: Function = (res: boolean) => {};
  /**
   * 是否是編輯
   */
  get canEdit() {
    return this.type !== EOperate.view;
  }
  /**
   * 某些字段是否显示
   */
  protected IsShowColumn: boolean = true;
  protected OnHandleCancel() {
    /**
     * 取消顯示
     */
    this.IsShow = false;
    (this.$refs.form as any).resetFields();
  }
  /**
   * 没有表单验证的取消
   */
  protected OnHandleCancelNotform() {
    /**
     * 取消顯示
     */
    this.IsShow = false;
  }

  protected callback(res: IServerReturn<boolean>) {
    this.CB(res.success);
    res.success
      ? this.$Message.success(res.message)
      : this.$Message.error(res.message);
    this.IsShow = false;
    (this.$refs.form as any).resetFields();
  }
  protected ajaxcallback(res: IAjaxResult,_isresetform:boolean=false) {
    this.CB(res.success);
    res.success
      ? this.$Message.success(res.message)
      : this.$Message.error(res.message);
    this.IsShow = false;
    if(_isresetform)
    {
      (this.$refs.form as any).resetFields();
    }
  }
}
