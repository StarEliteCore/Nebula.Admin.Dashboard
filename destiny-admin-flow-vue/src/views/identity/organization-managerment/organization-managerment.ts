import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";
import { IFilterCondition, IQueryFilter } from "@/shared/request";

import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { EOperate } from "@/shared/eoperate";
import { ITableColumn } from "@/shared/table/ITable";
import { ITreeDto } from "@/shared/baseentity/itreeentity";
import { MainManager } from "@/domain/services/main/main-manager";
import OrganizationInfo from "@/views/identity/organization-managerment/organization-operate/organization-operate";
import OrganizationOperate from "@/views/identity/organization-managerment/organization-operate/organization-operate.vue";
import { OrganizationPageListDto } from "@/domain/entity/organization/OrganizationDto";
import PageMixins from "@/shared/mixins/page.mixins";

@Component({
  name: "OrganizationManagerment",
  components: {
    OrganizationOperate,
  },
})
export default class OrganizationManagerment extends Mixins(
  PageMixins,
  DeleteMixins
) {
  private treeData: Array<ITreeDto> = [];
  private tableData: Array<OrganizationPageListDto> = [];
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
      //   maxWidth: 180
    },
    {
      title: "描述",
      key: "description",
      align: "center",
    },
  ];
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private CurrentArray: Array<any> = [];
  private CurrentRow!: OrganizationPageListDto;
  private dynamicQuery: any = {};
  /**
   * 
   */
  private treeSelectedrow:ITreeDto | undefined;
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
  /**
   * 分页查询条件
   */
  private filter = this.getFilter();
  @Emit()
  pageChange() {
    this.loadTableData();
  }
  @Ref("OrganizationInfo")
  private OrganizationInfo!: OrganizationInfo;
  /**
   * 选中树形的Id
   */
  private treeSelectedId: string = "";
  mounted() {
    this.loadData();
  }
  /**
   * @param _type 操作方法
   * @param _rowId
   */
  private operateItem(_type: EOperate, _rowId?: string) {
    if (_type === EOperate.add) {
      this.OrganizationInfo.Show(
        _type,
        this.treeData,
        this.treeSelectedId,
        (res: boolean) => {
          this.loadData();
        }
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
      this.OrganizationInfo.Show(
        _type,
        this.treeData,
        this.treeSelectedId,
        (res: boolean) => {
          this.loadData();
        },
        _row.id
      );
    }
  }
  private EditTree()
  {
    if (!this.treeSelectedId) {
      this.$Message.error("请选择要编辑的组织架构");
      return;
    }
    this.OrganizationInfo.Show(
      EOperate.update,
      this.treeData,
      this.treeSelectedId,
      (res: boolean) => {
        this.loadData();
      },this.treeSelectedId
    );

  }
  private async loadTree() {
    await MainManager.Instance()
      .OrganizationService.getAllOrganizationTree()
      .then((res) => {
        if (res.success) {
          this.treeData = res.itemList;
        }
      });
  }
  private treeSelected(expandedKeys: any, expanded: any) {
    if (expanded.selected === true) {
      this.treeSelectedId = expandedKeys[0];
      this.treeSelectedrow = expanded.selectedNodes[0].data.props;
    } else {
      this.treeSelectedId = "";
    }
    this.dynamicQuery.parentId = this.treeSelectedId;
    this.loadTableData();
  }
  private loadTableData() {
    this.queryfileter.filter = this.filter();
    MainManager.Instance()
      .OrganizationService.getOrganizationPage(this.tranfer(this.queryfileter))
      .then((res) => {
        if (res.success) {
          this.tableData = res.itemList;
          this.total = res.total;
        }
      });
  }
  private loadData() {
    this.loadTree();
    this.loadTableData();
  }
  private deleteItemTree() {
    if( typeof this.treeSelectedrow === "undefined")
    {
      this.$Message.warning("请选择要删除的行！");
      return;
    }
    this.DeleteInfo.Show(
      "删除",
      this.treeSelectedrow.title,
      async () => {
        await this.deleteItemById(this.treeSelectedId);
        this.loadData();
      });
  }
  /**
   * 
   * @param _selection 表格选中行
   */
  private CurrentRowEventArray(_selection: Array<OrganizationPageListDto>) {
    this.CurrentRow = _selection[0];
    this.CurrentArray = _selection;
  }
  /**
   *
   * @param _row 删除组织架构
   */
  private deleteItem(_row: OrganizationPageListDto) {
    if( typeof this.CurrentRow === "undefined")
    {
      this.$Message.warning("请选择要删除的行！");
      return;
    }
    this.DeleteInfo.Show("删除", this.CurrentRow.name, () => {
      this.deleteItemById(this.CurrentRow.id);
    });
  }
  /**
   * 调用API接口
   * @description 根据id删除
   */
  private async deleteItemById(_id: string) {
    let res = await MainManager.Instance().OrganizationService.deleteOrganizationAsync(
      _id
    );
    res.success
      ? this.$Message.success(res.message)
      : this.$Message.error(res.message);
    this.loadData();
  }
}
