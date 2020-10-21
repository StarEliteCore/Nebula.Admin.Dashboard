import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";

import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { EOperate } from '@/shared/eoperate';
import { ITableColumn } from '@/shared/table/ITable';
import { ESex, IUserTableDto } from '@/domain/entity/userdto/userDto';
import { MainManager } from "@/domain/services/main/main-manager";
import PageMixins from "@/shared/mixins/page.mixins";
import UserOperate from "@/views/system/user-managerment/user-operate/user-operate.vue"
import UserOperateInfo from "@/views/system/user-managerment/user-operate/user-operate"

@Component({
  name: "UserManagerment",
  components: {
    UserOperate
  }
})
export default class UserManagerment extends Mixins(PageMixins, DeleteMixins) {
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private CurrentRow: any = {};
  private CurrentArray: Array<IUserTableDto> = [];
  private columns: ITableColumn[] = [
    // {
    //   type: 'selection',
    //   width: 60,
    //   align: 'center'
    // },
    {
      type: "index",
      title: "序号",
      width: 70,
      align: "center",
      maxWidth: 30,
    },
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
    },
    {
      title: "操作",
      slot: "action",
      align: "center",
    }
  ];
  private userTable: Array<IUserTableDto> = [];
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
    this.getTableData();
  }
  @Ref("UserOperateInfo")
  private UserOperateInfo!: UserOperateInfo;
  /**
   * 
   * @param _type 操作方法
   * @param _rowId 
   */
  private operateItem(_type: EOperate, _rowId?: string) {
    // console.log(this.CurrentRow)
    this.UserOperateInfo.Show(_type, (res: boolean) => {
      this.getTableData();
    }, _rowId)
  }
  private async getTableData() {
    this.total = 100;
    await MainManager.Instance().UserService.getUserPage(this.tranfer(this.queryfileter))
      .then(res => {
        if (res.success) {
          console.log(res)
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
    console.log(_row, _selection);
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
}
