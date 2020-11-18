import { Component, Vue, Emit } from "vue-property-decorator";
import LayoutHeader from "./layout-header/layout-header.vue"
import MenuTab from "@/components/menu-tab/menu-tab.vue"
import { GetMenus } from "@/store/modules/menumodule";
import { IMenuInstance, MenuInstance } from '@/domain/entity/ConfigureInfo/menuConfigure/MenuInstance';
import { IMenuRouter } from '@/domain/entity/menudto/menuRouterDto';
import { Guid } from 'guid-typescript';
import SystemTitle from "./layout-left-title/layout-left-title.vue"
import { MenuEnum } from '@/domain/entity/menudto/menuDto';
@Component({
    name: "LayoutComponent",
    components: {
        LayoutHeader,
        MenuTab, SystemTitle
    }
})
export default class LayoutComponent extends Vue {
    private menus: IMenuInstance = new MenuInstance();
    // private openNameArr: string[] = [];
    private linearMenuList: IMenuRouter[] = [];
    private defaulthomepage: IMenuRouter = {
        id: "da92480a-5914-a8bc-110b-aedb0457ce6d",
        sort: -1,
        type: MenuEnum.Menu,
        path: "/home-page",
        redirect: "",
        componentName: "",
        component: "home-page/home-page",
        icon: "",
        parentId: Guid.EMPTY,
        parentNumber: "",
        name: "主页",
        children: [],
        buttonChildren: [],
        eventName: "",
    }
    private async created() {
        const menus = GetMenus();
        this.menus.menuItemList = menus ? JSON.parse(menus) : [];
        this.menus.menuItemList.unshift(this.defaulthomepage);
    }
    get menuShow() {
        return (
            this.openNames.length > 0 ||
            !this.checkMenuShowById(this.activeName)
        );
    }
    /**
     * @description 展开的 Submenu 的 name 集合
     * @readonly
     */
    get openNames(): string[] {
        let openNameArr: string[] = [];
        this.getOpenName(this.menus.menuItemList, openNameArr);
        return openNameArr;
    }
    /**
     * @description 激活菜单的 name 值
     * @readonly
     */
    get activeName(): string {
        return this.$route.path;
    }
    private getOpenName(_list: IMenuRouter[], openNameArr: string[]) {
        _list.forEach(_menuItem => {
            if (_menuItem.children && _menuItem.children.length) {
                _menuItem.children.forEach(_child => {
                    if (_child.path === this.activeName) {
                        !openNameArr.includes(_menuItem.path) &&
                            this.findParentList(_child, openNameArr);
                        return openNameArr;
                    } else {
                        return this.getOpenName(_menuItem.children, openNameArr);
                    }
                });
            }
        });
    }
    private findParentList(_item: IMenuRouter, _list: Array<string>) {
        this.findParent(_item, _list);
    }
    private findParent(_menu: IMenuRouter, _list: Array<string>): void {
        let parent: IMenuRouter | undefined = this.findMenuById(
            _menu.parentId
        );
        if (typeof parent !== "undefined") {
            !_list.includes(parent.path) && _list.push(parent.path);
            if (parent.parentId !== Guid.EMPTY) {
                this.findParent(parent, _list);
            }
        }
    }
    private findMenuById(_id: string): IMenuRouter | undefined {
        return this.linearMenuList.find(_menu => _menu.id === _id);
    }
    private checkMenuShowById(_id: string): boolean {
        this.linearMenuList.some(_menu => {
            if (_menu.id === _id) {
                return true;
            }
        });
        return false;
    }
}