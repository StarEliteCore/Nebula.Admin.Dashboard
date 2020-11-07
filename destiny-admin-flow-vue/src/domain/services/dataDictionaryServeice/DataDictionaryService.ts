import { IDataDictionaryService } from './IDataDictionaryService';
import { IAjaxResult } from '../../../shared/response/index';
import { MainManager } from '../main/main-manager';
import { DataDictionaryApi } from '../../config/api/index';
import { injectable } from 'inversify';
@injectable()
export default class DataDictionaryService implements IDataDictionaryService{
    getDataDictionaryTree():Promise<IAjaxResult>{
        return MainManager.dataRequest.getRequest(DataDictionaryApi.getDataDictionaryTreeData)
    }
}