<template>
  <Modal v-model="isShowModal" :title="`添加菜单功能—「${name}」`" width="950">
    <header>
      <div>
        <ButtonGroup>
          <Button @click="add" type="primary">
            <Icon type="md-add" />确认添加</Button
          >
        </ButtonGroup>
      </div>
      <div class="searchdiv">
        <Input
          placeholder="根据名称或地址搜索"
          class="searchInput"
          @keyup.enter.native="loadData"
          v-model="searchText"
        />
        <Button type="primary" @click="loadData">
          <Icon type="ios-search" />搜索
        </Button>
      </div>
    </header>

    <Table
      :columns="columns"
      :data="tableData"
      border
      stripe
      @on-selection-change="CurrentRowEventArray"
      class="table"
      :loading="isLoading"
    >
      <template v-slot:isEnabled="{ row }">
        <Tag v-if="row.isEnabled === true" color="red">是</Tag>
        <Tag v-else color="blue">否</Tag>
      </template>
    </Table>
    <page-component
      ref="PageInfo"
      :total="total"
      @PageChange="pageChange"
    ></page-component>
    <template v-slot:footer>
      <div></div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  .searchdiv {
    flex: 0 0 280px;
    .searchInput {
      width: 200px;
    }
    button {
      width: 80px;
    }
  }
}
</style>
<script lang="ts">
import { Component, Mixins, Emit, Prop } from "vue-property-decorator";
import PageMixins from "@/shared/mixins/page.mixins";
import * as PageQuery from "@/shared/request";
import { ITableColumn } from "@/shared/table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";
import { IFilterCondition, IQueryFilter } from "@/shared/request";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";

import { FunctionInputDto } from "@/domain/entity/functiondto/functionDto";

@Component({
  name: "add-menu-function",
})
export default class AddMenuFunction extends Mixins(PageMixins) {
  @Prop(Boolean) isShow!: Boolean;
  @Prop(String) menuId!: String;
  @Prop(String) name!: String;

  get isShowModal() {
    return this.isShow;
  }
  set isShowModal(isShow: Boolean) {
    if (isShow === false) {
      this.ClearData();
    }
    this.$emit("update:isShow", isShow);
  }

  private searchText: string = "";

  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private mainManager: MainManager = MainManager.Instance();
  private tableData: Array<FunctionInputDto> = [];
  private CurrentArray: Array<any> = [];
  private isLoading: boolean = false;

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
      maxWidth: 280,
      width: 280,
      tooltip: true,
    },
    {
      title: "启用",
      key: "isEnabled",
      align: "center",
      maxWidth: 80,
      slot: "isEnabled",
    },
    {
      title: "地址",
      key: "linkUrl",
      align: "center",
      maxWidth: 280,
      tooltip: true,
    },
    {
      title: "说明",
      key: "description",
      align: "center",
      maxWidth: 300,
      tooltip: true,
    },
  ];

  @Emit()
  pageChange() {
    this.loadData();
  }

  private created() {
    this.$on("loadData", () => this.loadData());
  }

  private ClearData() {
    this.searchText = "";
    this.tableData = [];
  }

  private loadData() {
    this.CurrentArray = [];

    this.isLoading = true;
    this.queryfileter.filter = this.filter();
    this.mainManager.FunctionService.getFunctionPage(
      this.tranfer(this.queryfileter)
    ).then((res) => {
      if (res.success) {
        this.tableData = res.itemList;
        this.total = res.total;
        this.isLoading = false;
      }
    });
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
        field: "linkUrl",
        value: "",
        operator: EFilterOprator.Like,
      },
    ];
    return (): IQueryFilter => {
      const value: string = this.searchText;
      const dynamicQuery: any = value ? { name: value, linkUrl: value } : {};
      const newFilters: IFilterCondition[] = [];
      filters.forEach((f) => {
        const value = dynamicQuery[f.field];
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
        filterConnect: EFilterConnect.Or,
        conditions: newFilters,
      };
      return filter;
    };
  }

  private CurrentRowEventArray(_selection: Array<any>) {
    this.CurrentArray = _selection;
  }

  private add() {
    if (this.CurrentArray.length < 1) {
      this.$Message.error("请选择要添加的功能");
      return;
    }
    this.isLoading = true;
    this.mainManager.MenuService.BatchAddMenuFunctionAsync(
      this.menuId as string,
      this.CurrentArray.map((p) => p.id)
    ).then((res) => {
      if (res.success) {
        this.$Message.success(`成功添加了${this.CurrentArray.length}条功能`);
        this.isShowModal = false;
      }
      this.isLoading = false;
    });
  }
}
</script>