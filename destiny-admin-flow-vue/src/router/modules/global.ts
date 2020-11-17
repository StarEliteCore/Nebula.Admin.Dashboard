import { Route as VueRoute } from "vue-router";
import { IMenuRouter } from '@/domain/entity/menudto/menuRouterDto';

declare global {
    // 配置每个路由的单独属性title, keepalive, main, desc, icon, hidden, auth等
    interface RouterMeta {
        title: string;
        nextPath: string;
        requireAuth?: boolean;
        processEnv?: number;
        noLogin: boolean;
        menuInfo?: IMenuRouter;
    }
    type RouterMode = "hash" | "history" | "abstract";
    interface Route {
        path: string,
        component?: any,
        name?: string, // 命名路由
        components?: { [name: string]: any }, // 命名视图组件
        redirect?: string | Location | Function,
        props?: boolean | Object | Function,
        alias?: string | Array<string>,
        children?: Array<Route>, // 嵌套路由
        beforeEnter?: (to: VueRoute, from: VueRoute, next: Function) => void,
        meta?: RouterMeta,

        // 2.6.0+
        caseSensitive?: boolean, // 匹配规则是否大小写敏感？(默认值：false)
        pathToRegexpOptions?: Object // 编译正则的选项
    }
    interface System {
        import(request: string): Promise<any>;
    }
    var System: System;
}