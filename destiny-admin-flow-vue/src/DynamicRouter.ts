import { Login, loginCallbackFunc } from './oidc-login/IdentityServerLogin';

import EmptyView from "@/views/layout-emprty/layout-emprty.vue";
import LayoutView from "@/layout/layout.vue";
import { MenuList } from './modules/static/menuindex';
import { MenuModule } from './store/modules/menumodule';
import { TokenModule } from './store/modules/tokenmodule';
import router from "@/router/index";

const _import = require("./router/import/_import_" + process.env.NODE_ENV);

console.log(process.env.NODE_ENV)
let first = true;//第一次获取菜单
var getRouter: Route[];
router.beforeEach(async (to: any, from, next) => {
    /**
     * 判断是否存在token
     */
    if (TokenModule.token) {
        /**
         * 存在token并且路由指定的是登录路由 
         */
        if (to.path === "/login") {
            ToLogin(to, from, next);
        }
        /**
         * 否则
         */
        else {
            /**
             * getRouter不存在后台获取出的路由
             */
            if (!getRouter) {
                /**
                 * 如果本地缓存中没有存储菜单去获取菜单
                 */
                if (!MenuModule.menus) {
                    MenuModule.SetMenus(MenuList.children);
                    if (MenuModule.menus) {
                        const routerarr = JSON.parse(MenuModule.menus);
                        if (routerarr) {
                            getRouter = routerarr;
                        }
                    }
                    else {
                        const arr = JSON.parse((JSON.stringify(MenuList.children)));
                        getRouter = arr;
                    }
                    routeGo(to, from, next);
                }
                else {
                    var routerarr = JSON.parse(MenuModule.menus);
                    if (routerarr) {
                        getRouter = routerarr;
                    }
                    routeGo(to, from, next);
                }
            }
            /**
             * getRouter存在菜单
             */
            else {
                next()
            }
        }
    }
    else {
        /**
         * 判断是否是回调回来的页面
         */
        if (to.path === "/callback") {
            // loginCallbackFunc();
            next();
        }
        else {
            Login();
        }
    }
})
/**
 * 跳转登录
 * @param to 
 * @param from 
 * @param next 
 */
export const ToLogin = (to: any, from: any, next: any) => {
    const IdentityServer4 = true; /**是否启用IdentityServer4 */
    if (IdentityServer4) {
        if (to.path === "/callback") {
            next()
        }
        else {
            Login();
        }
    }
    else {
        console.log("暂未实现非IdentityServer4登录")
    }
}


/**
 * DynamicRouter跳转
 * @param to 
 * @param from 
 * @param next 
 */
function routeGo(to: any, from: any, next: any) {
    // console.log(_import(getRouter[0].component));
    getRouter = filterAsyncRouter(getRouter);
    router.addRoutes(getRouter);
    // router.addRoutes(NotFoundRouterMap);
    if (to.matched.length === 0) {
        from.name
            ? next({
                name: from.name
            })
            : next("/404");
    }
    next({ ...to, replace: true });
}
/**
 * 动态路由构建方法
 * @param asyncRouterMap 
 */
function filterAsyncRouter(asyncRouterMap: Route[]) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (route.path === "/layout") {
            route.component = LayoutView;
        }
        else {
            try {
                route.component = _import(route.component);
            } catch (error) {
                console.error('当前路由 '+route.path+'.vue 不存在，因此如法导入组件，请检查接口数据和组件是否匹配，并重新登录，清空缓存!')
            }

        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children);
        }
        return true;
    });
    return accessedRouters;
}
