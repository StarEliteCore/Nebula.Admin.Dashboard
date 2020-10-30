export const constansRoute = [
    /**
     * 默认路由
     */
    {
        path: "/",
        redirect: "/login"
    },
    /**
     * 登录路由
     */
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/login-page/login-page.vue"),

    },
    /**
     * 回调路由
     */
    {
        path: '/callback',
        name: 'callback',
        component: () => import("@/views/login-page/login-page.vue"),

    },
    /**
     * 退出登录
     */
    {
        path: '/logout',
        name: 'logout',
        component: () => import("@/views/login-page/login-page.vue"),

    }
    ,
    // /**
    //  * 默认主页
    //  */
    {
        path: '/home',
        name: '主页',
        component: () => import("@/layout/layout.vue"),
        children: [
            {
                path: '/home-page',
                name: '主页',
                component: () => import("@/views/home-page/home-page.vue"),
            }
        ]

    }
]