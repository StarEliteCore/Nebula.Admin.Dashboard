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
    private enumValidate = (rule: any, value: string | null, callback: Function) => {
        if (value === null || value === "") {
            callback(new Error("请选择类型"));
        } else {
            callback();
        }
    };

    private ruleValidate: any = {
        name: [{ required: true, message: "菜单名称不可为空", trigger: "OnHandleCommit" }],
        // sort: [{ required: true, message: "排序号不可为空", trigger: "OnHandleCommit" }],
        // path: [{ required: true, message: "组件地址不可为空", trigger: "OnHandleCommit" }],
        parentId: [{ required: true, message: "父级菜单ID不可为空", trigger: "OnHandleCommit" }],
        // component: [{ required: true, message: "组件地址不可为空", trigger: "OnHandleCommit" }],
        // icon: [{ required: true, message: "图标不可为空", trigger: "OnHandleCommit" }],
        // description: [{ required: true, message: "描述不可为空", trigger: "OnHandleCommit" }],
        // parentNumber: [{ required: true, message: "当前菜单以上所有的父级", trigger: "OnHandleCommit" }],
        // depth: [{ required: true, message: "深度不可为空", trigger: "OnHandleCommit" }],
        // functionId: [{ required: true, message: "**不可为空", trigger: "OnHandleCommit" }],
        type: [{ required: true, validator: this.enumValidate, trigger: "OnHandleCommit" }],
    };

    Show(_type: EOperate, treeData: Array<any>, parentId: string, callback: (res: boolean) => void, _rowId?: string) {
        switch (_type) {
            // case EOperate.view:
            //     this.title = `查看菜单`;
            //     this.disabled = true;
            //     typeof _rowId !== "undefined" && this.getMenuById(_rowId);
            //     break;
            case EOperate.add:
                this.title = "添加菜单";
                this.menuDto = new MenuDto();
                break;
            case EOperate.update:
                this.disabled = false;
                this.IsShowColumn = false;
                typeof _rowId !== "undefined" && this.getMenuById(_rowId);
                this.title = `编辑菜单`;
                break;
        }
        this.CB = callback;
        this.type = _type;
        this.IsShow = true;
        this.treeData = treeData;
        this.menuDto.parentId = parentId;
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
        //   let updateinfo: MenuDto = new MenuDto();
        //   updateinfo.id = this.menuDto.id;
        //   updateinfo.description = this.menuDto.description;
        //   updateinfo.
        let res = await MainManager.Instance().MenuService.updateMenu(
            this.menuDto
        );
        this.ajaxcallback(res, true);
    }

}