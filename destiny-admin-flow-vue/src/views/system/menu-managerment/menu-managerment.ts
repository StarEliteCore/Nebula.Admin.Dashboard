import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import PageMixins from "@/shared/mixins/page.mixins";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";

import * as PageQuery from "@/shared/request";

import { MenuEnum, IMenuTableDto, MenuOutPageListDto } from '@/domain/entity/menudto/menuDto';
import { ITableColumn } from '@/shared/table/ITable';

import { MainManager } from "@/domain/services/main/main-manager";


@Component({
  name: "MenuManagerment",
  components: {
    // UserOperate,
    // UserAllocationRole,
  }
})

export default class MenuManagerment extends Mixins(PageMixins, DeleteMixins) {
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private CurrentRow: any = {};
  private CurrentArray: Array<IMenuTableDto> = [];
  private treeData: Array<any> = [];
  private tableData: Array<MenuOutPageListDto> = [];

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

  private mainManager: MainManager = MainManager.Instance();

  @Emit()
  pageChange() {
    this.loadTreeData();
    this.loadTableData();
  }
  private created() {
    this.loadTreeData();
    this.loadTableData();
  }
  private mounted()
  {
    debugger
    console.log(this.PageInfo)

  }

  private loadTableData() {
    this.mainManager.MenuService.GetMenuPage(this.tranfer(this.queryfileter))
      .then(res => {
        if (res.success) {
          this.tableData = res.itemList;
        }
      });
  }
  private loadTreeData() {
    this.mainManager.MenuService.GetAllMenuTree()
      .then(res => {
        if (res.success) {
          this.treeData = res.itemList;
        }
      });
  }


  private CurrentRowEventArray(_selection: any, _row: any) {
    this.CurrentRow = _row;
    this.CurrentRowEventArray = _selection;
    // console.log(_row, _selection);
  }




}


