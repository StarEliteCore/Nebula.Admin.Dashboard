import { Component, Mixins } from "vue-property-decorator";
import { MenuDto, MenuEnum } from "@/domain/entity/menudto/menuDto";

import { EOperate } from "@/shared/eoperate";
import { MainManager } from "@/domain/services/main/main-manager";
import OperateMixins from "@/shared/mixins/operate.mixins";


@Component({
    name: "MenuOperates",
})
export default class UserOperate extends Mixins(OperateMixins) {
    private menuDto: MenuDto = new MenuDto();
    private treeData: Array<any> = [];
    private enumSelectOptions: Array<any> = [
        { key: MenuEnum.Menu, label: "菜单" },
        { key: MenuEnum.Button, label: "按钮" },
    ];

    private enumOptions = MenuEnum;

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

    public async Show(
        _type: EOperate,
        treeData: Array<any>,
        parentId: string,
        callback: (res: boolean) => void,
        _rowId?: string
    ) {

        switch (_type) {
            case EOperate.add:
                this.title = "添加";
                this.menuDto = new MenuDto();
                this.treeData = treeData;
                console.log(this.treeData);
                this.menuDto.parentId = parentId;
                break;
            case EOperate.update:
                this.disabled = false;
                this.IsShowColumn = false;
                if (typeof _rowId !== "undefined") {
                    this.treeData = treeData;
                    await this.getMenuById(_rowId);
                }
                this.title = `编辑—「${this.menuDto.name}」`;
                break;
        }
        this.CB = callback;
        this.type = _type;
        this.IsShow = true;
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
        let res = await MainManager.Instance().MenuService.getMenuById(_id);
        if (res.success) {
            this.menuDto = res.data;
        }
    }

    private async addMenu() {
        let res = await MainManager.Instance().MenuService.addMenu(
            this.menuDto
        );
        this.ajaxcallback(res, true);
    }

    private async updateMenu() {
        let res = await MainManager.Instance().MenuService.updateMenu(
            this.menuDto
        );
        this.ajaxcallback(res, true);
    }

}