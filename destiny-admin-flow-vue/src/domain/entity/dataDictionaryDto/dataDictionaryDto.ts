import { IEntity } from '@/shared/baseentity/IEntity';
import { Guid } from 'guid-typescript';

export class DataDictionaryDto implements IEntity<string>{
    /**
     * id
     */
    id:string = ""
    /**
     * 数据字典标题
     */
    title:string = ""
    /**
     * key
     */
    key:string =""
    /**
     * 父级ID
     */
    parentId:string = ""
    /**
     * 子集
     */
    children:Array<DataDictionaryDto> = []
}

/**
 * 数据字典分页查询
 */
export class DataDictionaryPageListDto implements IEntity<string>{
    /**
     * id
     */
    id:string = ""

    /**
     * 数据字典标题
     */
    title:string = ""

    /**
     * 数据字典值
     */
    value:string = ""

    /**
     * 数据字典备注
     */
    remark:string = ""

    /**
     * 数据字典父级
     */
    parentId:string = ""

    /**
     * 排序
     */
    sort:number = 0
}

export class DataDictionaryInputDto implements IEntity<string>{
    /**
     * id
     */
    id:string = ""
    /**
     * 数据字典标题
     */
    title:string = ""

    /**
     * 数据字典值
     */
    value:string = ""

    /**
     * 数据字典备注
     */
    remark:string = ""

    /**
     * 数据字典父级
     */
    parentId:string = ""

    /**
     * 排序
     */
    sort:number = 0
    /**
     * 编码
     */
    code:string = ""
}
export class DataDictionnaryLoadDto implements IEntity<string>{
    /**
     * id
     */
    id:string = ""
    /**
     * 数据字典标题
     */
    title:string = ""

    /**
     * 数据字典值
     */
    value:string = ""

    /**
     * 数据字典备注
     */
    remark:string = ""

    /**
     * 数据字典父级
     */
    parentId:string = ""

    /**
     * 排序
     */
    sort:number = 0
    /**
     * 编码
     */
    code:string = ""
}