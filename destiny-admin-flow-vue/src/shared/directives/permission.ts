import router from "@/router";
import { DirectiveOptions } from 'vue/types/options';
import { IMenuRouter } from '@/domain/entity/menudto/menuRouterDto';
import { GetUserInfo } from '@/store/modules/userinfomodule';

/**
 * 获取权限
 */
function GetFunctions(): IMenuRouter[] {
    const { menuInfo } = router.currentRoute.meta;
    const functions = menuInfo.buttonChildren;
    return functions || [];
}

/**
 * 获取是否管理员
 */
function GetIsAdmin(): boolean {
    const isAdmin = JSON.parse(GetUserInfo()).isAdmin === "1";
    return isAdmin;
}

/**
 * 权限指令。支持Array<string>和string，如果无法匹配到权限则会删除或隐藏元素。
 */
export const hasPermission: DirectiveOptions = {
    bind(el, binding) {
        const attributeValue = binding.value;
        if (!attributeValue) return;
        if (GetIsAdmin()) return;
        const functions = GetFunctions().map(p => p.eventName);

        const hideEl = () => {
            if (!el.parentNode) {
                el.style.display = 'none';
            } else {
                el.parentNode.removeChild(el);
            }
        };

        if (typeof attributeValue === "string") {
            if (!functions.includes(attributeValue)) hideEl();
        } else if (attributeValue.constructor === Array) {
            const values = attributeValue as Array<any>;
            const { length } = values;
            let countNumber: number = 0;
            for (const item of values) {
                if (typeof item !== "string") {
                    throw new Error(`Only 'string' and 'array<string>' are supported, but '${typeof item}' is received`);
                };
                if (functions.includes(item)) ++countNumber;
            }
            if (countNumber !== length) hideEl();
        } else {
            throw new Error(`Only 'string' and 'array<string>' are supported, but '${attributeValue.constructor.name}' is received`);
        }

    }
}