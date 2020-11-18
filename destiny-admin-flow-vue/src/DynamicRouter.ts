// import { Login, loginCallbackFunc } from './oidc-login/IdentityServerLogin';

import ApplicationUserManager from './shared/config/IdentityServerLogin';
import { GetMenuList } from './modules/static/menuindex';
import { MenuModule, GetMenus } from './store/modules/menumodule';
import { GetToken } from './store/modules/tokenmodule';
import router from "@/router/index";
import { IMenuRouter } from '@/domain/entity/menudto/menuRouterDto';
import { RouteConfig } from "vue-router";


/**
 * 在以下页面中，不需要加载后端返回的路由（只需要默认内置写死的路由足以）。
 */
const ignoreRouteGoAsPaths: Array<string> = ['/callback', '/logout', '/login'];

let getRouter: IMenuRouter[];
let isAddRouter: boolean = false;

router.beforeEach(async (to: any, from, next) => {

    const token = GetToken();

    /* 不存在token，并且不在回调页面。 */
    if (!token && to.path !== "/callback") {
        ApplicationUserManager.Login();
        return;
    }

    /* 拦截掉已经有token还提示登录的请求。 */
    if (token && (to.fullPath as string).includes("#error=login_required")) {
        next(false);
        return;
    }

    /* 有菜单就存 */
    const menus = GetMenus();
    if (!getRouter && menus && isAddRouter) {
        getRouter = JSON.parse(menus);
    }

    /* 过滤掉不需要处理的路由 */
    const isIgnore: boolean = ignoreRouteGoAsPaths.includes(to.path);
    if (isIgnore) {
        next();
        return;
    }

    /**
     * 存在token，但是getRouter不存在则后端获取出的路由。
     */
    if (token && !getRouter) {
        /**
         * 如果本地缓存中没有存储菜单去获取菜单
         */

        if (menus) {
            getRouter = JSON.parse(menus);
        } else {
            const menuList = await GetMenuList();
            if (menuList) {
                MenuModule.SetMenus(menuList);
                getRouter = menuList;
            }
        }

        routeGo(to, from, next);
        return;
    }

    /* 默认执行跳转 */
    next();
    return;
});

// /**
//  * 跳转登录
//  * @param to 
//  * @param from 
//  * @param next 
//  */
// export const ToLogin = (to: any, from: any, next: any) => {
//     const IdentityServer4 = true; /**是否启用IdentityServer4 */
//     if (IdentityServer4) {
//         if (to.path === "/callback") {
//             next()
//         }
//         else {
//             Login();
//         }
//     }
//     else {
//         console.log("暂未实现非IdentityServer4登录")
//     }
// }


/**
 * DynamicRouter跳转
 * @param to 
 * @param from 
 * @param next 
 */
function routeGo(to: any, from: any, next: any) {
    // console.log(_import(getRouter[0].component));
    // router.addRoutes(NotFoundRouterMap);
    if (isAddRouter === false) {
        _addRoutes(getRouter);
        next({ ...to, replace: true });
        return;
    }

    if (to.matched.length === 0) {
        from.name
            ? next({
                name: from.name
            })
            : next("/404");
        return;
    }
    next({ ...to, replace: true });
}



/**
 * 获取路由对象集合
 * @param menuRouters 从后端返回的菜单路由对象集合
 */
function GetRoutes(menuRouters: IMenuRouter[]): RouteConfig[] {

    const generateVueRouters = (sonMenuRouters: IMenuRouter[]) => {
        const vueRouters: Route[] = [];
        const menuRouterToRoute = (menuRouter: IMenuRouter): Route => {
            const { buttonChildren, component, icon, id, name, parentId, parentNumber, path, redirect, sort, type, componentName, eventName } = menuRouter;
            const pushData: Route = {
                path,
                component,
                name,
                components: undefined,
                redirect,
                props: undefined,
                alias: undefined,
                children: undefined,
                beforeEnter: undefined,
            };
            pushData.meta = { title: name, nextPath: "", requireAuth: true, processEnv: process.env.NODE_ENV, noLogin: true };
            pushData.meta.menuInfo = {
                buttonChildren,
                children: [],
                component,
                icon,
                id,
                name,
                parentId,
                parentNumber,
                path,
                redirect,
                sort,
                type,
                componentName,
                eventName,
            };
            return pushData;
        };

        const generateChildren = (menuRouter: Route, children: IMenuRouter[]) => {
            if (!children || !children?.length) return;
            if (!menuRouter.children) menuRouter.children = [];
            for (const item of children) {
                const route: Route = menuRouterToRoute(item);
                menuRouter.children.push(route);
                generateChildren(route, item.children);
            }
        };

        for (const menuRouter of sonMenuRouters) {
            const route: Route = menuRouterToRoute(menuRouter);
            vueRouters.push(route);
            generateChildren(route, menuRouter.children);
        }

        return vueRouters;
    };


    const filterAsyncRouter = (asyncRouterMap: Route[]): Route[] => {
        const accessedRouters = asyncRouterMap.filter(route => {
            try {
                if (route.path === "/layout-empty") {
                    route.component = () => import("@/views/layout-emprty/layout-emprty.vue");
                }
                else if (route.path === "/layout") {
                    route.component = () => import("@/layout/layout.vue");
                }
                else {
                    const request: string = route.component;
                    route.component = () => import(/* webpackChunkName: "[request]" */`@/views/${request}.vue`);
                }
            } catch (_) {
                console.error(`${route.path}对应的组件不存在，无法导入组件。请检查接口数据和组件是否匹配，并重新登录和清空缓存!`);
            }
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children);
            }
            return true;
        });
        return accessedRouters;
    };

    return filterAsyncRouter(generateVueRouters(menuRouters)) as RouteConfig[];
}


function _addRoutes(routers: IMenuRouter[]) {
    const routes = GetRoutes(routers);
    router.addRoutes(routes);
    isAddRouter = true;
};

//添加路由
Object.getPrototypeOf(router).$addRoutes = _addRoutes;