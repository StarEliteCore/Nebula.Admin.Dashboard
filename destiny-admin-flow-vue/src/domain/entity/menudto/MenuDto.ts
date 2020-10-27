import { IEntity, IDescription } from '@/shared/baseentity/IEntity';

export interface IMenu extends IEntity<string> {
    /**
     * 菜单名称
     */
    name: string,

    /**
     * 父级菜单ID
     */
    parentId: string,

    /**
     * 排序
     */
    sort: number,

    /**
     * 组件地址(前端)
     */
    path: string,

    /**
     * 菜单图标
     */
    icon: string,

    /**
     * 当前菜单以上所有的父级
     */
    parentNumber: string,

    /**
     * 组件地址
     */
    component: string,

    /**
     * 类型
     */
    type: MenuEnum,

    /**
     * 子级
     */
    children: Array<IMenu>,
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


export interface IMenuTableDto extends IMenu, IDescription{

    /**
     * 深度
     */
    depth: number,

}