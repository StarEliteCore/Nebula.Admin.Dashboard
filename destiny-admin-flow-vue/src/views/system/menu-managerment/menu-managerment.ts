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
  private CurrentArray: Array<any> = [];
  private treeData: Array<any> = [];
  private tableData: Array<MenuOutPageListDto> = [];
  private treeSelectedId: string = "";
  private treeSelectedMenu: any = {};

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

  private mainManager: MainManager = MainManager.Instance();

  @Emit()
  pageChange() {
    this.loadData(MenuEnum.Button);
  }

  private mounted() {
    this.loadData();
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
      this.treeSelectedId = expandedKeys[0];
      this.treeSelectedMenu = expanded.selectedNodes[0].data.props;
    } else {
      this.treeSelectedId = "";
      this.treeSelectedMenu = {};
    }
    this.dynamicQuery.parentId = this.treeSelectedId;
    this.loadData(MenuEnum.Button);
  }

  private CurrentRowEventArray(_selection: Array<any>) {
    this.CurrentRow = _selection.length > 0 ? _selection[0] : undefined;
    this.CurrentArray = _selection;
  }

  @Ref("MenuOperateInfo")
  private MenuOperateInfo!: MenuOperateInfo;

  /**
   * @param _type 操作方法
   * @param _rowId 
   */
  private operateItem(_type: EOperate, _rowId?: string) {
    if (_type === EOperate.add) {
      this.MenuOperateInfo.Show(
        _type,
        this.treeData,
        this.treeSelectedId,
        (res: boolean) => { this.loadData(); }
      );
    } else if (_type === EOperate.update) {
      if (this.CurrentArray.length === 0) {
        this.$Message.error("请选择要修改的项");
        return;
      } else if (this.CurrentArray.length > 1) {
        this.$Message.error("请选择一项修改");
        return;
      }
      const _row = this.CurrentRow;
      this.MenuOperateInfo.Show(
        _type,
        this.treeData,
        this.treeSelectedId,
        (res: boolean) => { this.loadData(_row.type); },
        _row.id
      );
    }

  }

  private EditTreeMenu() {
    if (!this.treeSelectedId) {
      this.$Message.error("请选择要修改的菜单");
      return;
    }

    this.MenuOperateInfo.Show(
      EOperate.update,
      this.treeData,
      "",
      (res: boolean) => { this.loadData(); },
      this.treeSelectedId
    );
  }

  private deleteItemTreeMenu() {
    if (!this.treeSelectedId) {
      this.$Message.error("请选择要删除的菜单");
      return;
    }
    this.DeleteInfo.Show(
      "删除",
      this.treeSelectedMenu.title,
      async () => {
        await this.deleteItemById(this.treeSelectedId);
        this.loadData();
      });
  }

  private deleteItem() {
    if (this.CurrentArray.length === 0) {
      this.$Message.error("请选择要删除的项");
      return;
    } else if (this.CurrentArray.length > 1) {
      this.$Message.error("请选择一项删除");
      return;
    }
    const _row = this.CurrentRow;
    this.DeleteInfo.Show("删除", _row.name, async () => {
      await this.deleteItemById(_row.id);
      this.loadData(_row.type);
    });
  }

  /**
   * 调用API接口
   * @description 根据id删除
   */
  private async deleteItemById(_id: string) {
    let res = await MainManager.Instance().MenuService.delete(_id);
    res.success ? this.$Message.success(res.message) : this.$Message.error(res.message);
  }

  private loadData(type?: MenuEnum) {
    this.loadTableData();
    if (type !== MenuEnum.Button) this.loadTreeData();
  }

}


