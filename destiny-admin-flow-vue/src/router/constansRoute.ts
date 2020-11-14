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
        component: () => import("@/views/callback-page/callback-page.vue"),

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
        name: '首页',
        component: () => import("@/layout/layout.vue"),
        children: [
            {
                path: '/home-page',
                name: '主页',
                component: () => import("@/views/home-page/home-page.vue"),
            }
        ]

    }
    // {
    //     path: '/system',
    //     name: '系统管理',
    //     component: () => import("@/views/layout-emprty/layout-emprty.vue"),
    //     children: [
    //         {
    //             path: '/system/user',
    //             name: '用户管理',
    //             component: () => import("@/views/system/user-managerment/user-managerment.vue"),
    //         },
    //         {
    //             path: '/system/codegenerator',
    //             name: '代码生成器管理',
    //             component: () => import("@/views/system/code-generator-managerment/code-generator.vue"),
    //         }
    //     ]
    // }
]