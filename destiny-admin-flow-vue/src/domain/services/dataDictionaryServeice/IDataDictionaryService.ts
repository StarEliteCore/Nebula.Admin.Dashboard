import { IAjaxResult } from '../../../shared/response/index';
/**
 * 数据字典服务层接口定义
 */
export interface IDataDictionaryService{
    /**
     * 根据角色ID得到菜单树
     * @param _roleId 角色ID
     */
    getDataDictionaryTree():Promise<IAjaxResult>;
}