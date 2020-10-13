import * as MenuconfigEnum from './enums/MenuconfigEnum';

/**
 * 菜单样式配置
 */
export interface IMenuConfigureInfo {
    /**
     * 菜单类型（水平  OR 垂直 ）
     */
    mode: MenuconfigEnum.EMenuMode;
    /**
     * 是否开启手风琴
     */
    accordion: boolean;
    /**
     * 
     */
    theme: MenuconfigEnum.EMenuTheme;
}

export class MenuConfigureInfo implements IMenuConfigureInfo {
    mode: MenuconfigEnum.EMenuMode = MenuconfigEnum.EMenuMode.vertical;
    accordion = true;
    theme: MenuconfigEnum.EMenuTheme = MenuconfigEnum.EMenuTheme.dark;
}