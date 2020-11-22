import { IDataDictionaryService } from './IDataDictionaryService';
import { IAjaxResult, IServerPageReturn } from '../../../shared/response/index';
import { MainManager } from '../main/main-manager';
import { DataDictionaryApi, OrganizationApi } from '../../config/api/index';
import { injectable } from 'inversify';
import { ITreeDto } from '@/shared/baseentity/itreeentity';
import { IPageRequest } from '../../../shared/request/index';
import { DataDictionaryInputDto, DataDictionnaryLoadDto } from '@/domain/entity/dataDictionaryDto/dataDictionaryDto';
@injectable()
export default class DataDictionaryService implements IDataDictionaryService{
    getDataDictionaryTree():Promise<IServerPageReturn<ITreeDto>>{
        {
            return MainManager.dataRequest.getRequest(DataDictionaryApi.getDataDictionaryTreeData);
        };
    }
    /**
     * 分页查询数据字典
     * @param _page 
     */
    getDataDictionaryPageListAsync(_page:IPageRequest):Promise<IServerPageReturn<any>>{
        return MainManager.dataRequest.postRequest(DataDictionaryApi.getDataDictionaryPageListAsync,_page)
    }

    updateDataDictionary(_data:DataDictionaryInputDto):Promise<IAjaxResult>{
        return MainManager.dataRequest.postRequest(DataDictionaryApi.updateDataDictionaryAsync,_data)
    }

    createDataDictionary(_data:DataDictionaryInputDto):Promise<IAjaxResult>{
        return MainManager.dataRequest.postRequest(DataDictionaryApi.createDataDictionaryAsync,_data)
    }

    deleteDataDictionary(_Id:string):Promise<IAjaxResult>{
        return MainManager.dataRequest.deleteRequest(DataDictionaryApi.deleteDataDictionaryAsync,{
            id: _Id,
        })
    }
    
    getLoadDictionnnary(_Id:string):Promise<IAjaxResult>{
        return MainManager.dataRequest.getRequest(DataDictionaryApi.getLoadDictionnnary,{
            id: _Id,
        })
    }
}