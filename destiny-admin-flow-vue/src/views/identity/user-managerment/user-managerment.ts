import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";
import { ESex, IUserTableDto } from '@/domain/entity/userdto/userDto';
import { IFilterCondition, IQueryFilter } from '@/shared/request';

import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { EOperate } from '@/shared/eoperate';
import { ITableColumn } from '@/shared/table/ITable';
import { MainManager } from "@/domain/services/main/main-manager";
import PageMixins from "@/shared/mixins/page.mixins";
import UserAllocationRole from "./user-operate/allocation-role.vue"
import UserAllocationRoleInfo from "./user-operate/allocation-role"
import UserOperate from "./user-operate/user-operate.vue"
import UserOperateInfo from "./user-operate/user-operate"

@Component({
  name: "UserManagerment",
  components: {
    UserOperate,
    UserAllocationRole
  }
})
export default class UserManagerment extends Mixins(PageMixins, DeleteMixins) {
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private CurrentRow!: IUserTableDto;
  private CurrentArray: Array<IUserTableDto> = [];
  private columns: ITableColumn[] = [
    {
      type: 'selection',
      width: 60,
      align: 'center'
    },
    // {
    //   type: "index",
    //   title: "序号",
    //   width: 70,
    //   align: "center",
    //   maxWidth: 30,
    // },
    {
      title: "用户名",
      key: "userName",
      align: "center",
      maxWidth: 150
    },
    {
      title: "用户昵称",
      key: "nickName",
      align: "center",
    },
    {
      title: "创建时间",
      key: "createdTime",
      align: "center",
    },
    {
      title: "是否系统用户",
      key: "isSystem",
      align: "center",
      slot: "isSystem"
    },
    {
      title: "性别",
      key: "sex",
      align: "center",
      render: (h: any, params: any) => {
        const row = params.row;
        const color = row.sex == ESex.Man ? "md-man" : "md-woman";
        const text = "男"
        return h(
          "Icon",
          {
            props: {
              type: color,
            }
          }
        );
      }
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
    }
  ];
  private userTable: Array<IUserTableDto> = [];
  private CollapseDefault: string = "1";
  private filters: IFilterCondition[] = [
    {
      field: "userName",
      value: "",
      operator: EFilterOprator.Like,
    },
    {
      field: "nickName",
      value: "",
      operator: EFilterOprator.Like,
    },
    {
      field: "isSystem",
      value: "",
      operator: EFilterOprator.Equal,
    },
  ];

  private dynamicQuery: any = {};

  @Emit()
  pageChange() {
    this.getTableData();
  }
  /**
   * 页面加载方法
   */
  private created() {

    // this.PageInfo.total=100;
  }
  private mounted() {
    // let res = MainManager.Instance().MenuService.getVueDynamicRouterTreeAsync();
    // console.log(res)
    this.getTableData();
  }
  @Ref("UserOperateInfo")
  private UserOperateInfo!: UserOperateInfo;
  @Ref("UserAllocationRoleInfo")
  private UserAllocationRoleInfo!: UserAllocationRoleInfo;
  /**
   * 
   * @param _type 操作方法
   * @param _rowId 
   */
  private operateItem(_type: EOperate, _rowId?: string) {
    if (typeof this.CurrentRow === "undefined" && (_type === EOperate.update || _type === EOperate.view)) {
      this.$Message.error("请选择要修改的用户");
      return "";
    }
    if (_type === EOperate.update || _type === EOperate.view) {
      this.UserOperateInfo.Show(_type, (res: boolean) => {
        this.getTableData();
      }, this.CurrentRow.id)
    }
    else {
      this.UserOperateInfo.Show(_type, (res: boolean) => {
        this.getTableData();
      })
    }

  }
  private async getTableData() {
    await MainManager.Instance().UserService.getUserPage(this.tranfer(this.queryfileter))
      .then(res => {
        if (res.success) {
          this.userTable = res.itemList;
          this.total = res.total;
        }
      });
  }
  // private CurrentRowEvent(_row:any)
  // {
  //   // @on-current-change="CurrentRowEvent" 表格可以使用 此事件
  //   console.log(_row);
  // }
  private CurrentRowEventArray(_selection: any, _row: any) {
    this.CurrentRow = _row;
    this.CurrentRowEventArray = _selection;
    // console.log(_row, _selection);
  }
  private deleteItem(_row: IUserTableDto) {
    this.DeleteInfo.Show("删除", _row.userName, () => {
      this.deleteItemById(_row.id)
    });
  }
  /**
   * 调用API接口
   * @description 根据id删除
   */
  private async deleteItemById(_id: string) {
    let res = await MainManager.Instance().UserService.deleteUserById(_id);
    res.success ? this.$Message.success(res.message) : this.$Message.error(res.message);
    this.getTableData();
  }
  /**
   * 
   * @param _rowId 
   */
  private allocationRole(_rowId?: string) {
    if (typeof this.CurrentRow === "undefined") {
      this.$Message.error("请选择要分配的用户");
      return "";
    }

    this.UserAllocationRoleInfo.Show(this.CurrentRow.id, (res: boolean) => {
      this.getTableData();
    })
  }

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
      this.getTableData();
    }
}
