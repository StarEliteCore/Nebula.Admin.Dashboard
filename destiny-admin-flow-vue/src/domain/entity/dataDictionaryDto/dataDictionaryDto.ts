import { IEntity } from '@/shared/baseentity/IEntity';
import { Guid } from 'guid-typescript';

export class IDataDictionaryDto implements IEntity<string>{
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
    children:Array<IDataDictionaryDto> = []
}