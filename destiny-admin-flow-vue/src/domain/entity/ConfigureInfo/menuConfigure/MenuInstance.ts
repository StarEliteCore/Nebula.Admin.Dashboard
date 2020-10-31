import { IMenuRouter } from '@/domain/entity/menudto/menuRouterDto';
import * as MenuConfigureEnum from "../../menudto/enums/MenuconfigEnum"
import { IMenuConfigureInfo, MenuConfigureInfo } from '../../menudto/MenuConfigureInfo';


/**
 * 全局菜单接口
 */
export interface IMenuInstance {
    /**
     * 菜单样式配置项
     */
    menuStyle: IMenuConfigureInfo;
    /**
     * 菜单子项列表
     */
    menuItemList: IMenuRouter[];
}
export class MenuInstance implements IMenuInstance {
    /**
     * 实例化菜单配置项
     */
    menuStyle: IMenuConfigureInfo = new MenuConfigureInfo();
    /**
     * 菜单子项列表
     */
    menuItemList: IMenuRouter[] = [];
    /**
     * 构造函数
     * @param _mode 
     * @param _accordion 
     * @param _theme 
     */
    constructor(_mode?: MenuConfigureEnum.EMenuMode, _accordion?: boolean, _theme?: MenuConfigureEnum.EMenuTheme) {
        typeof _mode !== "undefined" && (this.menuStyle.mode = _mode);
        typeof _accordion !== "undefined" && (this.menuStyle.accordion = _accordion);
        typeof _theme !== "undefined" && (this.menuStyle.theme = _theme);
    }

}

