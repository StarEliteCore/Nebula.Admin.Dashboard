import { IEntity } from '@/shared/baseentity/IEntity';

export interface IMenu extends IEntity<string> {
    /**
     * 排序
     */
    sort: number;
    /**
     * 图标
     */
    icon: string;
    /**
     * 父级Id
     */
    parentId: string;
    /**
     * 所有父级Id
     */
    parentNumber: string;
    /**
     * 菜单类型
     */
    type: MenuEnum ;
    /**
     * 菜单名称
     */
    name: string;
}

export enum MenuEnum {
    /**
     * 菜单
     */
    Menu = 0,
    /**
     * 按钮
     */
    Button = 5,
}
