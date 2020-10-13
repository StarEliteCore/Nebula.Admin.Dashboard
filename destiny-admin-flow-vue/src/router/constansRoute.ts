export const constansRoute = [
    {
        path: "/",
        redirect: "/home-page"
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
            }
        ]
    }
]