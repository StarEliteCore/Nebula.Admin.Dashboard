import { Component, Mixins, Prop } from "vue-property-decorator";
import { MenuDto, MenuEnum } from "@/domain/entity/menudto/menuDto";

import { EOperate } from "@/shared/eoperate";
import { MainManager } from "@/domain/services/main/main-manager";
import OperateMixins from "@/shared/mixins/operate.mixins";


@Component({
    name: "MenuOperate",
})
export default class MenuOperate extends Mixins(OperateMixins) {
    @Prop(Array) treeData!: Array<any>;
    @Prop(Object) currentMenu!: any;
    @Prop(Object) currentTreeNode!: any;

    private menuDto: MenuDto = new MenuDto();

    private enumSelectOptions: Array<any> = [
        { key: MenuEnum.Menu, label: "菜单" },
        { key: MenuEnum.Function, label: "功能" },
    ];

    private enumOptions = MenuEnum;

    private created() {
        this.$on("showAdd", this.showAdd);
        this.$on("showEdit", () => { this.showEdit(this.currentMenu.id) });
        this.$on("showTreeNodeEdit", () => { this.showEdit(this.currentTreeNode.id) })
    }

    private enumValidate = (rule: any, value: string | null, callback: Function) => {
        if (value === null || value === "") {
            callback(new Error("请选择类型"));
        } else {
            callback();
        }
    };

    private ruleValidate: any = {
        name: [{ required: true, message: "名称不可为空", trigger: "OnHandleCommit" }],
        type: [{ required: true, validator: this.enumValidate, trigger: "OnHandleCommit" }],
    };

    private showAdd() {
        this.title = "添加";
        this.menuDto = new MenuDto();
        this.menuDto.parentId = this.currentTreeNode.id;
        this.CB = () => { this.callbackRefresh(this.menuDto.type) };
        this.type = EOperate.add;
        this.IsShow = true;
    }

    private async showEdit(id: string) {
        this.disabled = false;
        this.IsShowColumn = false;
        await this.getMenuById(id);
        this.title = `编辑—「${this.menuDto.name}」`;
        this.CB = this.callbackRefresh;
        this.type = EOperate.update;
        this.IsShow = true;
    }

    private callbackRefresh(type?: MenuEnum) {
        if (type === MenuEnum.Function) {
            this.$emit('refreshButton');
        } else {
            this.$emit('refreshAll');
        }
    }

    private OnHandleCommit() {
        (this.$refs.form as any).validate((valid: boolean) => {
            if (valid) {
                switch (this.type) {
                    case EOperate.view:
                        this.IsShow = false;
                        this.CB(true);
                        break;
                    case EOperate.add:
                        this.addMenu();
                        break;
                    case EOperate.update:
                        this.updateMenu();
                        this.IsShow = false;
                        break;
                }
            }
        });
    }


    /**
     * @description 根据id获取菜单
     * @param {string} _id id
     */
    private async getMenuById(_id: string) {
        const closeLoading = this.$Message.loading({
            content: 'Loading...',
            duration: 0
        }) as any;
        let res = await MainManager.Instance().MenuService.getMenuById(_id);
        if (res.success) {
            this.menuDto = res.data;
        }
        closeLoading();
    }

    private async addMenu() {
        const closeLoading = this.$Message.loading({
            content: 'Loading...',
            duration: 0
        }) as any;
        let res = await MainManager.Instance().MenuService.addMenu(
            this.menuDto
        );
        this.ajaxcallback(res, true);
        closeLoading();
    }

    private async updateMenu() {
        const closeLoading = this.$Message.loading({
            content: 'Loading...',
            duration: 0
        }) as any;
        let res = await MainManager.Instance().MenuService.updateMenu(
            this.menuDto
        );
        this.ajaxcallback(res, true);
        closeLoading();
    }

}