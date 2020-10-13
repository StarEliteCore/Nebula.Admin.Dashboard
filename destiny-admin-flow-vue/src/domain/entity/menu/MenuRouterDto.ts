import { IMenu } from './MenuDto';

export interface IRouter{
    /**
     * 路径
     */
    path: string;
    /**
     * 对应组件
     */
    component: string;
    /**
     * 组件名
     */
    componentName: string;
    /**
     * 重定向
     */
    redirect: string;
}

export interface IMenuRouter extends IRouter,IMenu {
    children: IMenuRouter[];
}