import { Component,Emit, Mixins,Ref} from 'vue-property-decorator';
import PageMixins from '../../../shared/mixins/page.mixins';
import DeleteMixins from '@/shared/mixins/delete-dialog.mixins';
import * as PageQuery from '@/shared/request';

@Component({
    name:"DataDictionaryManagerment",
    // comments:{

    // }
})

export default class DataDictionaryManagerment extends Mixins(PageMixins,DeleteMixins){
    private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
    private CurrentRow: any = {};

    pageChange(){

    }

    private async getTableData(){
        
    }
}