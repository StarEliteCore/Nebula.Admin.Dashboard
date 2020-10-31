import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import PageMixins from "@/shared/mixins/page.mixins";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";

import * as PageQuery from "@/shared/request";

import { MenuEnum, IMenuTableDto } from '@/domain/entity/menudto/menuDto';
import { ITableColumn } from '@/shared/table/ITable';

import { MainManager } from "@/domain/services/main/main-manager";


@Component({
  name: "MenuManagerment",
  components: {
    // UserOperate,
    // UserAllocationRole
  }
})

export default class MenuManagerment extends Mixins(PageMixins, DeleteMixins) {
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private CurrentRow: any = {};
  private CurrentArray: Array<IMenuTableDto> = [];

  private columns: ITableColumn[] = [
    {
      type: 'selection',
      width: 60,
      align: 'center'
    },
    {
      title: "名称",
      key: "name",
      align: "center",
      maxWidth: 150
    },
    {
      title: "图标",
      key: "icon",
      align: "center",
      maxWidth: 150
    },
    {
      title: "类型",
      key: "type",
      align: "center",
      maxWidth: 150
    },
    {
      title: "描述",
      key: "description",
      align: "center",
      maxWidth: 150
    },
  ];

  private manuTable: Array<IMenuTableDto> = [];

  private mainManager : MainManager = MainManager.Instance();

  @Emit()
  pageChange() {
    this.getTableData();
  }
  private mounted() {
    this.getTableData();
  }
  private async getTableData() {
    // await this.mainManager.MenuService.getMenuTable(this.tranfer(this.queryfileter))
    //   .then(res => {
    //     if (res.success) {
    //       this.userTable = res.itemList;
    //       this.total = res.total;
    //     }
    //   });
  }

  private data1: Array<any> = [
    {
      name: 'John Brown',
      age: 18,
      address: 'New York No. 1 Lake Park',
      date: '2016-10-03'
    },
    {
      name: 'Jim Green',
      age: 24,
      address: 'London No. 1 Lake Park',
      date: '2016-10-01'
    },
    {
      name: 'Joe Black',
      age: 30,
      address: 'Sydney No. 1 Lake Park',
      date: '2016-10-02'
    },
    {
      name: 'Jon Snow',
      age: 26,
      address: 'Ottawa No. 2 Lake Park',
      date: '2016-10-04'
    }
  ];

  private data2:Array<any> = [
    {
      title: "parent 1",
      expand: true,
      children: [
        {
          title: "parent 1-1",
          expand: true,
          children: [
            {
              title: "leaf 1-1-1",
            },
            {
              title: "leaf 1-1-2",
            },
          ],
        },
        {
          title: "parent 1-2",
          expand: true,
          children: [
            {
              title: "leaf 1-2-1",
            },
            {
              title: "leaf 1-2-1",
            },
          ],
        },
      ],
    },
  ];


}


