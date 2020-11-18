import OperateMixins from '@/shared/mixins/operate.mixins';
import { Component, Mixins } from 'vue-property-decorator';
import { DataDictionaryInputDto } from '@/domain/entity/dataDictionaryDto/dataDictionaryDto';
import { EOperate } from '../../../../shared/eoperate/index';
import { MainManager } from '../../../../domain/services/main/main-manager';

@Component({
    name:"DataDictionaryOperate",
})
export default class DataDictionaryOperate extends Mixins(OperateMixins){
    /**
     * 添加修改对象
     */
    private dataDictionaryDto:DataDictionaryInputDto = new DataDictionaryInputDto();
    private treeData:Array<any> = [];

    public async Show(
        _type:EOperate,
        _treeData:Array<any>,
        parentId:string,
        callback:(res:boolean) => void,
        _rowId?:string
    ){
        debugger
        switch(_type){
            case EOperate.add:
                this.title="添加";
                this.dataDictionaryDto = new DataDictionaryInputDto();
                this.dataDictionaryDto.parentId = parentId;
                this.treeData = _treeData;
                break;
        }
        this.CB = callback;
        this.type = _type;
        debugger
        this.IsShow = true;
    }
}