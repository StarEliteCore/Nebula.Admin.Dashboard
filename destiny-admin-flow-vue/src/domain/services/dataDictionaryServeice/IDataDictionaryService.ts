import { ITreeDto } from '@/shared/baseentity/itreeentity';
import { IAjaxResult, IServerPageReturn } from '../../../shared/response/index';
import { IPageRequest } from '../../../shared/request/index';
import { DataDictionaryInputDto, DataDictionaryPageListDto, DataDictionnaryLoadDto } from '../../entity/dataDictionaryDto/dataDictionaryDto';
/**
 * 数据字典服务层接口定义
 */
export interface IDataDictionaryService{
    /**
     * 根据角色ID得到菜单树
     * @param _roleId 角色ID
     */
    getDataDictionaryTree():Promise<IServerPageReturn<any>>;

    /**
     * 得到数据字典分页数据
     * @param _page 
     */
    getDataDictionaryPageListAsync(_page:IPageRequest):Promise<IServerPageReturn<Array<DataDictionaryPageListDto>>>;
    /**
     * 修改数据字典
     * @param _data 数据字典Dto
     */
    updateDataDictionary(_data:DataDictionaryInputDto):Promise<IAjaxResult>;

    /**
     * 添加数据字典
     * @param _data 数据字典Dto
     */
    createDataDictionary(_data:DataDictionaryInputDto):Promise<IAjaxResult>;

    /**
     * 删除数据字典
     * @param _id 数据字典ID
     */
    deleteDataDictionary(_id:string):Promise<IAjaxResult>;

    /**
     * 根据ID获取数据字典
     * @param _id 
     */
    getLoadDictionnnary(_id:string):Promise<IAjaxResult>;
    
}