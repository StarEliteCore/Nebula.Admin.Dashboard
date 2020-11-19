import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Watch } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";
import { IFilterCondition, IQueryFilter } from "@/shared/request";
import { MenuEnum, MenuOutPageListDto } from "@/domain/entity/menudto/menuDto";

import AddMenuFunction from "./menu-function/add-menu-function.vue";
import CircleLoading from "@/components/circle-loading/circle-loading.vue";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { EOperate } from "@/shared/eoperate";
import { ITableColumn } from "@/shared/table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";
import MenuOperate from "./menu-operate/menu-operate.vue";
import PageMixins from "@/shared/mixins/page.mixins";
import RemoveMenuFunction from "./menu-function/remove-menu-function.vue";

@Component({
  name: "MenuManagerment",
  components: {
    MenuOperate,
    AddMenuFunction,
    RemoveMenuFunction,
    CircleLoading,
  },
})
export default class MenuManagerment extends Mixins(PageMixins, DeleteMixins) {
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private CurrentRow: any = {};
  private CurrentArray: Array<any> = [];
  private treeData: Array<any> = [];
  private tableData: Array<MenuOutPageListDto> = [];
  private treeSelectedId: string = "";
  private treeSelectedMenu: any = {};
  private isShowAddMenuFunDModal: boolean = false;
  private showTreeLoading: boolean = true;
  private showTableLoading: boolean = true;
  private isShowViewMenuFunDModal: boolean = false;
  private ClickCurrentRow: any = {};
  private notNestTreeData: Array<any> = [];
  private treeSearchText: string = "";

  get CurrentMenuIds() {
    return this.CurrentArray.map((p) => p.id);
  }

  private enumOptions = MenuEnum;

  private columns: ITableColumn[] = [
    {
      type: "selection",
      width: 60,
      align: "center",
    },
    {
      title: "名称",
      key: "name",
      align: "center",
      maxWidth: 180,
    },
    {
      title: "图标",
      key: "icon",
      align: "center",
      maxWidth: 150,
    },
    {
      title: "类型",
      key: "type",
      align: "center",
      maxWidth: 90,
      slot: "type",
    },
    {
      title: "层级",
      key: "depth",
      align: "center",
      maxWidth: 80,
    },
    {
      title: "模板页",
      key: "layout",
      align: "center",
      maxWidth: 80,
    },
    {
      title: "事件名",
      key: "eventName",
      align: "center",
      maxWidth: 80,
    },
    {
      title: "隐藏",
      key: "isHide",
      align: "center",
      maxWidth: 70,
      slot: "isHide",
    },
    {
      title: "描述",
      key: "description",
      align: "center",
    },
    {
      title: "操作",
      slot: "action",
      width: 150,
      align: "center",
    },
  ];

  private mainManager: MainManager = MainManager.Instance();

  @Emit()
  pageChange() {
    this.loadData(MenuEnum.Function);
  }

  private mounted() {
    this.loadData();
  }

  @Watch("treeData", { immediate: false, deep: true })
  onTreeDataChanged(val: Array<any>) {
    const datas: Array<any> = [];
    const childrenKey = "children";
    const addList = (data: Array<any>) => {
      for (const one of data) {
        const children = one[childrenKey];
        if (children === undefined || children.length < 1) {
          datas.push(one);
          continue;
        }
        const parentOne: any = {};
        for (const key of Object.keys(one)) {
          if (key === childrenKey) {
            parentOne[childrenKey] = [];
          } else {
            parentOne[key] = one[key];
          }
        }
        datas.push(parentOne);
        addList(one.children);
      }
    };
    addList(val);
    this.notNestTreeData = datas;
  }

  private prevSearchTreeData: Map<string, Array<any>> = new Map<
    string,
    Array<any>
  >();
  get SearchTreeData() {
    const text = this.treeSearchText;
    if (text.length === 0) return this.treeData;
    if (this.prevSearchTreeData.has(text))
      return this.prevSearchTreeData.get(text);
    const datas = this.notNestTreeData.concat();
    const searchData = datas.filter((p) => p.title.includes(text));
    let notNestData: Array<any> = [];
    const addParent = (item: any) => {
      notNestData.push(item);
      const index = datas.findIndex((p) => p.id === item.parentId);
      if (index != -1) {
        addParent(datas[index]);
      }
    };
    for (const item of searchData) {
      addParent(item);
    }
    const map = new Map();
    notNestData = notNestData.filter((p) => !map.has(p.id) && map.set(p.id, 1));
    const result = notNestData.filter(
      (p) =>
        !p.parentId || p.parentId === "00000000-0000-0000-0000-000000000000"
    );
    const generateResult = (items: Array<any>) => {
      for (const item of items) {
        item.children = notNestData.filter((p) => p.parentId === item.id);
        if (item.children.length > 0) {
          generateResult(item.children);
        }
      }
    };
    generateResult(result);
    this.prevSearchTreeData.clear();
    this.prevSearchTreeData.set(text, result);
    return result;
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
    this.CurrentRow = {};
    this.CurrentArray = [];

    this.showTableLoading = true;
    this.queryfileter.filter = this.filter();
    this.mainManager.MenuService.GetMenuPage(
      this.tranfer(this.queryfileter)
    ).then((res) => {
      this.showTableLoading = false;
      if (res.success) {
        this.tableData = res.itemList;
        this.total = res.total;
      }
    });
  }
  private loadTreeData() {
    // this.treeSelectedId = "";
    // this.treeSelectedMenu = {};

    this.showTreeLoading = true;
    this.mainManager.MenuService.GetAllMenuTree().then((res) => {
      this.showTreeLoading = false;
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
    this.loadData(MenuEnum.Function);
  }

  private CurrentRowEventArray(_selection: Array<any>) {
    this.CurrentRow = _selection.length > 0 ? _selection[0] : {};
    this.CurrentArray = _selection;
  }

  /**
   * @param _type 操作方法
   * @param _rowId
   */
  private operateItem(_type: EOperate) {
    if (_type === EOperate.add) {
      (this.$refs.MenuOperateInfo as Vue).$emit("showAdd");
    } else if (_type === EOperate.update) {
      if (this.CurrentArray.length === 0) {
        this.$Message.error("请选择要修改的项");
        return;
      } else if (this.CurrentArray.length > 1) {
        this.$Message.error("请选择一项修改");
        return;
      }
      (this.$refs.MenuOperateInfo as Vue).$emit("showEdit");
    }
  }

  private EditTreeMenu() {
    if (!this.treeSelectedId) {
      this.$Message.error("请选择要修改的菜单");
      return;
    }

    (this.$refs.MenuOperateInfo as Vue).$emit("showTreeNodeEdit");
  }

  private deleteItemTreeMenu() {
    if (!this.treeSelectedId) {
      this.$Message.error("请选择要删除的菜单");
      return;
    }
    this.DeleteInfo.Show("删除", this.treeSelectedMenu.title, async () => {
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
    res.success
      ? this.$Message.success(res.message)
      : this.$Message.error(res.message);
  }

  private loadData(type?: MenuEnum) {
    this.loadTableData();
    if (type !== MenuEnum.Function) this.loadTreeData();
  }

  private showAddMenuFunction() {
    if (this.CurrentArray.length < 1) {
      this.$Message.error("请选择一项后再点击");
      return;
    }
    // if (this.CurrentArray.length > 1) {
    //   this.$Message.error("只能选择一项分配菜单功能");
    //   return;
    // }
    this.isShowAddMenuFunDModal = true;
    (this.$refs.AddMenuFunction as Vue).$emit("loadData");
  }

  private showMenuFunctionView(row: any) {
    this.ClickCurrentRow = row;
    this.isShowViewMenuFunDModal = true;
    this.$nextTick(() =>
      (this.$refs.RemoveMenuFunction as Vue).$emit("loadData")
    );
  }
}
