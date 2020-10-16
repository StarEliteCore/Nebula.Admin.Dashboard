import VueRouter from "vue-router";
declare global {
    // 配置每个路由的单独属性title, keepalive, main, desc, icon, hidden, auth等
    interface RouterMeta {
        title: string;
        nextPath: string;
        requireAuth?: boolean;
        processEnv?: number;
        noLogin: boolean;
    }
    type RouterMode = "hash" | "history" | "abstract";
    interface Route {
        Id?: string;
        path: string;
        name: string;
        icon?: string;
        permission?: string;
        meta: RouterMeta;
        sort?: number;
        parentid?: string;
        component: any;
        children?: Route[];
        Tabs?: Route[];
        redirect?: string;
    }
    interface System {
        import(request: string): Promise<any>;
    }
    var System: System;
}