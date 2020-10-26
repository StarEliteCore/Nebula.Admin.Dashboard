import { Component, Mixins } from "vue-property-decorator";
import { ISelectListItem } from "@/shared/response/selectDto";
import { MainManager } from "@/domain/services/main/main-manager";
import OperateMixins from "@/shared/mixins/operate.mixins";
import { UserAllocationRoleInputDto } from '@/domain/entity/userdto/userDto';
import { Guid } from 'guid-typescript';

@Component({
  name: "AllocationRoles",
})
export default class AllocationRole extends Mixins(OperateMixins) {
  private checkboxArray: Array<ISelectListItem> = new Array<ISelectListItem>();
  private checkedArray: Array<string> = new Array<string>();
  private _inputUserRole:UserAllocationRoleInputDto=new UserAllocationRoleInputDto();
  async Show(_rowId: string,callback: (res: boolean) => void) {
    var res = await MainManager.Instance().RoleService.getAllRoleAsync();
    var resuser = await MainManager.Instance().UserService.getUserById(_rowId)
    res.success && (this.checkboxArray = res.data);
    this._inputUserRole=new UserAllocationRoleInputDto();
    this._inputUserRole.id=_rowId;
    this.checkedArray=resuser.data.roleIds;
    this.CB=callback;
    this.title = "分配角色";
    this.IsShow = true;
  }
  async OnHandleCommit() {
    this._inputUserRole.roleIds=this.checkedArray;
    let res = await MainManager.Instance().UserService.userAllocationRole(this._inputUserRole);
    this.ajaxcallback(res);
  }
  /**
   * 获取已选的数据
   * @param _data 
   */
  CheckGroupChange(_data:any){
    this._inputUserRole.roleIds=_data;
  }
}
