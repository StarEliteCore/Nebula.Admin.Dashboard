/**
 * 通用下拉框返回
 */
export interface ISelectListItem {
    /**
     * 值
     */
    value: string|number;
    /**
     * 显示名
     */
    label: string;
    /**
     * 是否選中
     */
    selected?: boolean;
}

export class SelectListItem implements ISelectListItem
{

    constructor(public value:string,public label:string,public selected?:boolean)
    {


    }
    
    
}