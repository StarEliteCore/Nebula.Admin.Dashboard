import { MainManager } from "@/domain/services/main/main-manager";
import { IMenuRouter } from '@/domain/entity/menudto/menuRouterDto';


// let MenuList: IMenuRouter;

// await MainManager.Instance()
//     .DestinyCoreServeice.getVueDynamicRouter()
//     .then((result) => {
//         if (result.success) {
//             MenuList = result.data.itemList[0];
//         }
//     })
//     .catch((r: any) => {
//         console.log(r);
//     });

export const GetMenuList = function () {
    return new Promise<Array<IMenuRouter>>((resolve, reject) => {
        MainManager.Instance()
            .DestinyCoreServeice.getVueDynamicRouter()
            .then((result) => {
                if (result.success) {
                    resolve(result.data);
                }
            })
            .catch((r: any) => {
                resolve(r);
            });
    });
};



// import { Guid } from 'guid-typescript';
// import { IMenuRouter } from '@/domain/entity/menudto/menuRouterDto';
// import { MenuEnum } from '@/domain/entity/menudto/menuDto';

// export const MenuList: IMenuRouter =
// {
//     id: Guid.EMPTY,
//     sort: -1,
//     type: MenuEnum.Menu,
//     path: "/",
//     redirect: "",
//     componentName: "",
//     component: "",
//     icon: "",
//     parentId: Guid.EMPTY,
//     parentNumber: "",
//     name: "根节点",
//     children: [
//         {
//             id: "da92480a-5914-a8bc-110b-aedb0457ce6c",
//             sort: -1,
//             type: MenuEnum.Menu,
//             path: "/layout",
//             redirect: "",
//             componentName: "",
//             component: "",
//             icon: "",
//             parentId: Guid.EMPTY,
//             parentNumber: "",
//             name: "系统管理",
//             children: [
//                 {
//                     id: Guid.create().toString(),
//                     sort: -1,
//                     type: MenuEnum.Menu,
//                     path: "/system/user",
//                     redirect: "",
//                     componentName: "",
//                     component: "identity/user-managerment/user-managerment",
//                     icon: "",
//                     parentId: "da92480a-5914-a8bc-110b-aedb0457ce6d",
//                     parentNumber: "",
//                     name: "用户管理",
//                     children: [],
//                 },
//                 {
//                     id: Guid.create().toString(),
//                     sort: -1,
//                     type: MenuEnum.Menu,
//                     path: "/identity/role",
//                     redirect: "",
//                     componentName: "",
//                     component: "identity/role-managerment/role-managerment",
//                     icon: "",
//                     parentId: "da92480a-5914-a8bc-110b-aedb0457ce6d",
//                     parentNumber: "",
//                     name: "角色管理",
//                     children: [],
//                 },
//                 {
//                     id: Guid.create().toString(),
//                     sort: -1,
//                     type: MenuEnum.Menu,
//                     path: "/system/codegenerator",
//                     redirect: "",
//                     componentName: "",
//                     component: "system/code-generator-managerment/code-generator",
//                     icon: "",
//                     parentId: "da92480a-5914-a8bc-110b-aedb0457ce6d",
//                     parentNumber: "",
//                     name: "代码生成器管理",
//                     children: [],
//                 },
//                 {
//                     id: Guid.create().toString(),
//                     sort: -1,
//                     type: MenuEnum.Menu,
//                     path: "/identity/menu",
//                     redirect: "",
//                     componentName: "",
//                     component: "identity/menu-managerment/menu-managerment",
//                     icon: "",
//                     parentId: "da92480a-5914-a8bc-110b-aedb0457ce6d",
//                     parentNumber: "",
//                     name: "菜单管理",
//                     children: [],
//                 }
//                 ,
//                 {
//                     id: Guid.create().toString(),
//                     sort: -1,
//                     type: MenuEnum.Menu,
//                     path: "/identity/function",
//                     redirect: "",
//                     componentName: "",
//                     component: "identity/function-managerment/function-managerment",
//                     icon: "",
//                     parentId: "da92480a-5914-a8bc-110b-aedb0457ce6d",
//                     parentNumber: "",
//                     name: "功能管理",
//                     children: [],
//                 }
//                 ,
//                 {
//                     id: Guid.create().toString(),
//                     sort: -1,
//                     type: MenuEnum.Menu,
//                     path: "/system/auditlog",
//                     redirect: "",
//                     componentName: "",
//                     component: "system/audit-log-managerment/audit-log-managerment",
//                     icon: "",
//                     parentId: "da92480a-5914-a8bc-110b-aedb0457ce6d",
//                     parentNumber: "",
//                     name: "操作审计",
//                     children: [],
//                 },
//                 {
//                     id: Guid.create().toString(),
//                     sort: -1,
//                     type: MenuEnum.Menu,
//                     path: "/system/auditentry",
//                     redirect: "",
//                     componentName: "",
//                     component: "system/audit-entry-managerment/audit-entry-managerment",
//                     icon: "",
//                     parentId: "da92480a-5914-a8bc-110b-aedb0457ce6d",
//                     parentNumber: "",
//                     name: "数据审计",
//                     children: [],
//                 },
//                 {
//                     id: Guid.create().toString(),
//                     sort: -1,
//                     type: MenuEnum.Menu,
//                     path: "/system/dictionary",
//                     redirect: "",
//                     componentName: "",
//                     component: "system/data-dictionary-managerment/data-dictionary-managerment",
//                     icon: "",
//                     parentId: "da92480a-5914-a8bc-110b-aedb0457ce6d",
//                     parentNumber: "",
//                     name: "数据字典",
//                     children: [],
//                 },
//                 {
//                     id: Guid.create().toString(),
//                     sort: -1,
//                     type: MenuEnum.Menu,
//                     path: "/identity/organization",
//                     redirect: "",
//                     componentName: "",
//                     component: "identity/organization-managerment/organization-managerment",
//                     icon: "",
//                     parentId: "da92480a-5914-a8bc-110b-aedb0457ce6d",
//                     parentNumber: "",
//                     name: "组织架构",
//                     children: [],
//                 }
//             ],
//         }
//     ],
// }

