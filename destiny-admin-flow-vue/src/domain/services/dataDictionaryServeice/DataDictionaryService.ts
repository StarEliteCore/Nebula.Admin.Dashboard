import { IDataDictionaryService } from './IDataDictionaryService';
import { IAjaxResult, IServerPageReturn } from '../../../shared/response/index';
import { MainManager } from '../main/main-manager';
import { DataDictionaryApi } from '../../config/api/index';
import { injectable } from 'inversify';
import { ITreeDto } from '@/shared/baseentity/itreeentity';
@injectable()
export default class DataDictionaryService implements IDataDictionaryService{
    getDataDictionaryTree():Promise<IServerPageReturn<ITreeDto>>{
        {
            return MainManager.dataRequest.getRequest(DataDictionaryApi.getDataDictionaryTreeData);
        };
    }
}