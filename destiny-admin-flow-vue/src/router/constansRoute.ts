export const constansRoute = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/login-page/login-page.vue"),

    },
    {
        path: '/callback',
        name: 'callback',
        component: () => import("@/views/login-page/login-page.vue"),

    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import("@/views/login-page/login-page.vue"),

    },
    {
        path: '/home-page',
        name: '主页',
        component: () => import("@/views/home-page/home-page.vue"),

    },
    {
        path: '/system',
        name: '系统管理',
        component: () => import("@/views/layout-emprty/layout-emprty.vue"),
        children: [
            {
                path: '/system/user',
                name: '用户管理',
                component: () => import("@/views/system/user-managerment/user-managerment.vue"),
            },
            {
                path: '/system/codegenerator',
                name: '代码生成器管理',
                component: () => import("@/views/system/code-generator-managerment/code-generator.vue"),
            }
        ]
    }
]