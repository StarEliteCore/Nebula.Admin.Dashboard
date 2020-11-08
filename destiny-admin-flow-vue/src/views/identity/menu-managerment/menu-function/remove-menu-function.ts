import { Component, Mixins, Emit, Prop } from "vue-property-decorator";
import PageMixins from "@/shared/mixins/page.mixins";
import * as PageQuery from "@/shared/request";
import { ITableColumn } from "@/shared/table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";
import { IFilterCondition, IQueryFilter } from "@/shared/request";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";

import { FunctionInputDto } from "@/domain/entity/functiondto/functionDto";

@Component({
    name: "remove-menu-function",
})
export default class RemoveMenuFunction extends Mixins(PageMixins) {
    @Prop(Boolean) isShow!: boolean;
    @Prop(String) menuId!: string;
    @Prop(String) name!: string;

    get isShowModal() {
        return this.isShow;
    }
    set isShowModal(isShow: boolean) {
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
        this.$on("loadData", () => {
            this.loadData();
        });
    }

    private ClearData() {
        this.searchText = "";
        this.tableData = [];
    }

    private loadData() {
        this.CurrentArray = [];

        this.isLoading = true;
        this.queryfileter.filter = this.filter();
        var mid = this.menuId;

        this.mainManager.MenuService.GetMenuFunctionByMenuIdPageAsync(
            this.menuId,
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

    private deleteFun() {
        const currentLength = this.CurrentArray.length;
        if (currentLength < 1) {
            this.$Message.error("请选择要删除的功能");
            return;
        }

        this.$Modal.confirm({
            title: `删除「${this.name}」的菜单功能`,
            content: `<p>您选择了<strong>${currentLength}</strong>条，确认要删除么？</p>`,
            onOk: () => {
                this.isLoading = true;
                this.mainManager.MenuService.BatchDeleteMenuFunctionAsync(
                    this.menuId as string,
                    this.CurrentArray.map((p) => p.functionId)
                ).then((res) => {
                    if (res.success) {
                        this.loadData();
                        this.$Message.success(`成功删除了${currentLength}条功能`);
                    }
                    this.isLoading = false;
                });
            },
            onCancel: () => { },
        });
    }
}