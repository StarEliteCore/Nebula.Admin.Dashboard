import { Component, Mixins, Ref } from "vue-property-decorator";

import { Guid } from "guid-typescript";
import { IAjaxResult } from "@/shared/response";
import { MainManager } from "@/domain/services/main/main-manager";
import { MenuTreeOutDto } from "@/domain/entity/menudto/menuDto";
import OperateMixins from "@/shared/mixins/operate.mixins";

@Component({
  name: "SetPermission",
})
export default class SetPermission extends Mixins(OperateMixins) {
  @Ref("tree")
  private tree: any;

  private treeData: Array<MenuTreeOutDto> = [];

  private autoExpandParent: boolean = true;
  private checkedKeys: any = {
    checked: [],
  };

  private defaultCheckedKeys:string[]=[];

  private roleId: string = Guid.EMPTY;

  private defaultExpandedKeys: string[] = [];
  private expandedKeys: any;
  Show(_rowId: string) {
    MainManager.Instance()
      .MenuService.getMenuTreeByRoleId(_rowId)
      .then((res: IAjaxResult) => {
        if (res.success == true) {
          let menuTreeDto = res.data.itemList as MenuTreeOutDto[];
          this.treeData = menuTreeDto;
          this.title = `分配权限`;
          this.IsShow = true;
          this.roleId = _rowId;
   
          //this.defaultCheckedKeys=res.data.selected as string[];
          this.checkedKeys.checked=res.data.selected as string[];
          this.expandedKeys=res.data.selected;
        }
      });
  }




  public onExpand(expandedKeys:any) {

    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  }

  public OnHandleCommit() {
    MainManager.Instance()
      .RoleService.setRoleMenu(this.roleId, this.checkedKeys.checked)
      .then((res: IAjaxResult) => {
        if (res.success) {
          this.$Message.success("分配权限成功!!");
          this.IsShow=false;
          this.checkedKeys.checked=[];
        } else {
          this.$Message.error(res.message);
        }
      });
  }

 
  public onSearch()
  {


  }
}
