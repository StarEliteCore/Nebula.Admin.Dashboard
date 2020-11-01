import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import PageMixins from "@/shared/mixins/page.mixins";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";

import * as PageQuery from "@/shared/request";

import { MenuEnum, IMenuTableDto, MenuOutPageListDto } from '@/domain/entity/menudto/menuDto';
import { ITableColumn } from '@/shared/table/ITable';

import { MainManager } from "@/domain/services/main/main-manager";
import { IFilterCondition, IQueryFilter } from '@/shared/request';
import { EFilterConnect, EFilterOprator } from '@/shared/request/query.enum';

import MenuOperate from "./menu-operate/menu-operate.vue"
import MenuOperateInfo from "./menu-operate/menu-operate"

import { EOperate } from '@/shared/eoperate';


@Component({
  name: "MenuManagerment",
  components: {
    MenuOperate,
  }
})

export default class MenuManagerment extends Mixins(PageMixins, DeleteMixins) {
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private CurrentRow: any = {};
  private CurrentArray: Array<IMenuTableDto> = [];
  private treeData: Array<any> = [];
  private tableData: Array<MenuOutPageListDto> = [];

  private enumOptions = MenuEnum;


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
      maxWidth: 180
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
      maxWidth: 150,
      slot: "type"
    },
    {
      title: "层级",
      key: "depth",
      align: "center",
      maxWidth: 120
    },
    {
      title: "描述",
      key: "description",
      align: "center",
    },
  ];

  private manuTable: Array<IMenuTableDto> = [];

  private mainManager: MainManager = MainManager.Instance();

  @Emit()
  pageChange() {
    this.loadTableData();
  }

  private mounted() {
    this.loadTreeData();
    this.loadTableData();
  }


  private dynamicQuery: any = {};
  private filter = this.getFilter();
  private getFilter() {
    const filters: IFilterCondition[] = [
      {
        field: "name",
        value: "",
        operator: EFilterOprator.Like,
      },
      {
        field: "parentId",
        value: "",
        operator: EFilterOprator.Equal,
      },
    ];
    return (): IQueryFilter => {
      const newFilters: IFilterCondition[] = [];
      filters.forEach((f) => {
        const value = this.dynamicQuery[f.field];
        if (value != undefined && value != "") {
          const filter: IFilterCondition = {
            field: f.field,
            value: f.operator == EFilterOprator.Like ? `%${value}%` : value,
            operator: f.operator,
          };
          newFilters.push(filter);
        }
      });
      const filter: IQueryFilter = {
        filterConnect: EFilterConnect.And,
        conditions: newFilters,
      };
      return filter;
    };
  }


  private loadTableData() {

    this.queryfileter.filter = this.filter();
    this.mainManager.MenuService.GetMenuPage(this.tranfer(this.queryfileter))
      .then(res => {
        if (res.success) {
          this.tableData = res.itemList;
          this.total = res.total;
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

  private treeSelected(expandedKeys: any, expanded: any) {
    if (expanded.selected === true) {
      this.dynamicQuery.parentId = expandedKeys[0];
    } else {
      this.dynamicQuery.parentId = "";
    }
    this.loadTableData();
  }

  private CurrentRowEventArray(_selection: any, _row: any) {
    this.CurrentRow = _row;
    this.CurrentRowEventArray = _selection;
    // console.log(_row, _selection);
  }

  @Ref("MenuOperateInfo")
  private MenuOperateInfo!: MenuOperateInfo;

  /**
   * @param _type 操作方法
   * @param _rowId 
   */
  private operateItem(_type: EOperate, _rowId?: string) {
    if (typeof this.CurrentRow === "undefined" && (_type === EOperate.update)) {
      this.$Message.error("请选择要修改的菜单");
      return;
    }
    if (_type === EOperate.update) {
      this.MenuOperateInfo.Show(_type, this.treeData,this.dynamicQuery.parentId, (res: boolean) => {
        this.loadTreeData();
        this.loadTableData();
      }, this.CurrentRow.id)
    }
    else {
      this.MenuOperateInfo.Show(_type, this.treeData,this.dynamicQuery.parentId, (res: boolean) => {
        this.loadTreeData();
        this.loadTableData();
      })
    }

  }

}


