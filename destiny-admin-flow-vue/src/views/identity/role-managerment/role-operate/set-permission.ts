import { Component, Mixins } from "vue-property-decorator";

import { EditModalMixins } from "@/shared/mixins/edit-modal.mixins";
import { Guid } from "guid-typescript";
import { IAjaxResult } from "@/shared/response";
import { MainManager } from "@/domain/services/main/main-manager";
import { MenuTreeOutDto } from "@/domain/entity/menudto/menuDto";

@Component({
  name: "SetPermission",
})
export default class SetPermission extends Mixins(EditModalMixins) {
  private treeData: Array<MenuTreeOutDto> = [];

  private autoExpandParent: boolean = true;
  private checkedKeys: any = {
    checked: [],
  };

  loading: boolean = false;


  private roleId: string = Guid.EMPTY;

  private expandedKeys: any;

  protected MapTo(_rowId: string) {
    MainManager.Instance()
      .MenuService.getMenuTreeByRoleId(_rowId)
      .then((res: IAjaxResult) => {
        if (res.success == true) {
          let menuTreeDto = res.data.itemList as MenuTreeOutDto[];
          this.treeData = menuTreeDto;

          this.roleId = _rowId;

          this.checkedKeys.checked = res.data.selected as string[];
          this.expandedKeys = res.data.selected;
        }
      });
  }

  protected InIt() {
  
    this.MapTo(this.editData.id as string);

  }

  public onExpand(expandedKeys: any) {
    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  }

  public onHandleCommit() {
    this.loading=true;
    MainManager.Instance()
      .RoleService.setRoleMenu(this.roleId, this.checkedKeys.checked)
      .then((res: IAjaxResult) => {
        if (res.success) {
          this.$Message.success("分配权限成功!!");
          this.isOpen = false;
          this.checkedKeys.checked = [];
          this.$emit("refresh");

        } else {
          this.$Message.error(res.message);
        }
        this.loading=false;
      });
  }

  public onSearch() {}
}
