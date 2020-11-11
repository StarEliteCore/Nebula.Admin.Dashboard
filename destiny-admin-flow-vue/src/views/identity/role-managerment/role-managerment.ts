import { Component, Mixins } from "vue-property-decorator";
import { ControlTypeEnum, ISearchFilter } from "@/shared/request";

import { ComponentMixins } from "@/shared/mixins/component.mixns";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { EFilterOprator } from "@/shared/request/query.enum";
import { RoleApi } from "@/domain/config/api";
import RoleOperate from "./role-operate/role-operate.vue";
import SetPermission from "./role-operate/set-permission.vue";

@Component({
  name: "RoleManagerment",
  components: {
    RoleOperate,
    SetPermission,
  },
})
export default class RoleManagerment extends Mixins(
  DeleteMixins,
  ComponentMixins
) {
  pageUrl: string = RoleApi.getRolePage;
  deleteUrl: string = RoleApi.deleteRole;
  saveEditUrl: string = RoleApi.createrOrUpdateRole;
  GetColumn() {
    return [
      {
        type: "selection",
        width: 60,
        align: "center",
      },

      {
        title: "角色名称",
        key: "name",
        align: "center",
        maxWidth: 150,
      },
      {
        title: "是否管理员",
        key: "isAdmin",
        align: "center",
        slot: "isAdmin",
      },
      {
        title: "创建时间",
        key: "createdTime",
        align: "center",
      },
      {
        title: "最后修改时间",
        key: "lastModifionTime",
        align: "center",
      },
      {
        title: "描述",
        key: "description",
        align: "center",
      },
    ];
  }

  private CollapseDefault: string = "1";

  GetFields(): ISearchFilter[] {
    return [
      {
        field: "name",

        title: "角色名",
      },
      {
        field: "description",
        title: "描述",
      },
      {
        field: "isAdmin",
        title: "是否管理员",
        operator: EFilterOprator.Equal,
        config: {
          type: ControlTypeEnum.select,

          data: [
            {
              value: "true",
              label: "是",
            },
            {
              value: "false",
              label: "否",
            },
          ],
        },
      },
    ];
  }



  permissionTitle = "分配权限";
  role?:any={};
  //分配权限
  public handleAuth() {
    let permissionModel = this.$refs["setPermissionModel"] as Vue;
    if (permissionModel) {
      this.getSeletedRow((id: string, row: any) => {
     
        this.role=row;
       
        this.$nextTick(() =>  permissionModel.$emit("open"));
        // this.$nextTick(() => );
      });
     
    }
  }

 
}
