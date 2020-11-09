import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import {
  ControlTypeEnum,
  ISearchFilter,
} from "@/shared/request";

import { ComponentMixins } from "@/shared/mixins/component.mixns";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { EFilterOprator } from "@/shared/request/query.enum";
import { EOperate } from "@/shared/eoperate";
import { RoleApi } from "@/domain/config/api";
import RoleOperate from "./role-operate/role-operate.vue";
import RoleOperateInfo from "./role-operate/role-operate";
import SetPerOperateInfo from "./role-operate/set-permission";
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



  @Ref("RoleOperateInfo")
  private RoleOperateInfo!: RoleOperateInfo;

  @Ref("SetPerOperateInfo")
  private SetPerOperateInfo!: SetPerOperateInfo;

  //添加
  private async handleAdd() {
    this.RoleOperateInfo.Show(EOperate.add, async (res: boolean) => {
      await this.GetPage();
    });
  }

  //更新
  public async handleUpdate(row?: any, _rowId?: string) {
    if (typeof row !== "undefined" && typeof _rowId !== "undefined") {
      this.RoleOperateInfo.Show(
        EOperate.update,
        async (res: boolean) => {
          if (res) {
            await this.GetPage();
          }
        },
        _rowId,
        row
      );
    } else {
      let selecteds: any = this.currentSelectionArray;
      this.RoleOperateInfo.getSingleSeletedRow(
        selecteds,
        (id: string, row: any) => {
          this.RoleOperateInfo.Show(
            EOperate.update,
            async (res: boolean) => {
              if (res) {
                await this.GetPage();
              }
            },
            id,
            row
          );
        }
      );
    }
  }

  public handleView(row?: any) {
    this.RoleOperateInfo.Show(EOperate.view, (res: boolean) => {}, row.id, row);
  }

  //分配权限
  public handleAuth() {
    let selecteds: any = this.currentSelectionArray;
    this.RoleOperateInfo.getSingleSeletedRow(
      selecteds,
      (id: string, row: any) => {
        this.SetPerOperateInfo.Show(id);
      }
    );
  }
}
