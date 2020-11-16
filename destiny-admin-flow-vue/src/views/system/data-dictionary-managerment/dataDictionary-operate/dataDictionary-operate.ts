import OperateMixins from '@/shared/mixins/operate.mixins';
import { Component, Mixins } from 'vue-property-decorator';
import { DataDictionaryInputDto } from '@/domain/entity/dataDictionaryDto/dataDictionaryDto';

@Component({
    name:"MenuOperates",
})
export default class DdataDictionOperate extends Mixins(OperateMixins){
    /**
     * 添加修改对象
     */
    private dataDictionaryDto:DataDictionaryInputDto = new DataDictionaryInputDto();

    private treeData:Array<any> = [];

    
}