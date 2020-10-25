import { Component, Mixins } from "vue-property-decorator";

import { ISelectListItem } from "@/shared/response/selectDto";
import { MainManager } from "@/domain/services/main/main-manager";
import OperateMixins from "@/shared/mixins/operate.mixins";

@Component({
  name: "AllocationRoles",
})
export default class AllocationRole extends Mixins(OperateMixins) {
  private checkboxArray: Array<ISelectListItem> = new Array<ISelectListItem>();
  private checkedArray: Array<string> = new Array<string>();
  private aaa: any = "";
  async Show(_rowId?: string) {
    var res = await MainManager.Instance().RoleService.getAllRoleAsync();
    res.success && (this.checkboxArray = res.data);
    console.log(this.checkboxArray);
    this.title = "分配角色";
    this.IsShow = true;
  }
  OnHandleCommit() {}
  /**
   * 获取已选的数据
   * @param _data 
   */
  CheckGroupChange(_data:any){
    console.log(_data)
  }
}
