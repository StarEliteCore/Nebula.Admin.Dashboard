import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";
import { IFilterCondition, IQueryFilter, QueryFilter } from "@/shared/request";
import {
  IRoleTableDto,
  RoleOutputPageListDto,
} from "@/domain/entity/role/roleDto";

import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { EOperate } from "@/shared/eoperate";
import { ITableColumn } from "@/shared/table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";
import PageMixins from "@/shared/mixins/page.mixins";
import RoleOperate from "./role-operate/role-operate.vue";
import RoleOperateInfo from "./role-operate/role-operate";

@Component({
  name: "RoleManagerment",
  components: {
    RoleOperate
  },
})
export default class RoleManagerment extends Mixins(PageMixins, DeleteMixins) {
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private CurrentArray: Array<IRoleTableDto> = [];
  private columns: ITableColumn[] = [
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
    {
      title: "操作",
      slot: "action",
      align: "center",
    },
  ];
  private roleTable: Array<RoleOutputPageListDto> = [];
  private CollapseDefault: string = "1";

  private filters: IFilterCondition[] = [
    {
      field: "name",
      value: "",
      operator: EFilterOprator.Like,
    },
    {
      field: "isAdmin",
      value: "",
      operator: EFilterOprator.Equal,
    },
  ];

  private dynamicQuery: any = {};

  @Ref("RoleOperateInfo")
  private RoleOperateInfo!: RoleOperateInfo;

  //查询
  private search() {
    let newFilters: IFilterCondition[] = [];

    let $this = this;

    this.filters.forEach((f) => {
      let value = $this.dynamicQuery[f.field];
      if (value != undefined && value != "") {
        let filter: IFilterCondition = {
          field: f.field,
          value: f.operator == EFilterOprator.Like ? `%${value}%` : value,
          operator: f.operator,
        };
        newFilters.push(filter);
      }
    });

    let filter: IQueryFilter = {
      filterConnect: EFilterConnect.And,
      conditions: newFilters,
    };
    this.queryfileter.filter = filter;
    this.getRolePageListAsync();
  }

  @Emit()
  pageChange() {
    this.getRolePageListAsync();
  }
  /**
   * 页面加载方法
   */
  private created() {}
  private mounted() {
    this.getRolePageListAsync();
  }

  private async getRolePageListAsync() {
    await MainManager.Instance()
      .RoleService.getRolePage(this.tranfer(this.queryfileter))
      .then((res) => {
        if (res.success) {
          this.roleTable = res.itemList;
          this.total = res.total;
        }
      });
  }

  //添加
  private async handleAdd() {
    this.RoleOperateInfo.Show(EOperate.add, async (res: boolean) => {
       await  this.getRolePageListAsync();
    });
  }

  //更新
  public async handleUpdate() {}

  public async handleDelete(_id: string){

  }
}
