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
    private dataDictionInputDto:DataDictionaryInputDto = new DataDictionaryInputDto();
    private ruleValidate:any = {
        title: [
            { required: false, message: "标题不可为空", trigger: "OnHandleCommit" },
        ],
    }

    public async Show(
        _type:EOperate,
        _treeData:Array<any>,
        parentId:string,
        callback:(res:boolean) => void,
        _rowId?:string
    ){
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
        this.IsShow = true;
    }

    private OnHandleCommit(){
        debugger
        (this.$refs.form as any).validate((valid:boolean) => {
            if(valid){
                switch (this.type) {
                    case EOperate.view:
                        this.IsShow = false;
                        this.CB(true);
                        break;
                    case EOperate.add:
                        this.addOrganization();
                        break;
                }
            }
        })
    }

    private async addOrganization() {
        debugger
        let res = await MainManager.Instance().DataDictionarySrevice.createDataDictionary(
            this.dataDictionaryDto
        );
        this.ajaxcallback(res, true);
    }
}