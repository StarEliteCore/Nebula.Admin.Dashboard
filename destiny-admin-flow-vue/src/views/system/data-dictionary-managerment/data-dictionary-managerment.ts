import { Component,Emit, Mixins,Ref} from 'vue-property-decorator';
import PageMixins from '../../../shared/mixins/page.mixins';
import DeleteMixins from '@/shared/mixins/delete-dialog.mixins';
import * as PageQuery from '@/shared/request';
import { ITableColumn } from '../../../shared/table/ITable';
import { MenuEnum } from '@/domain/entity/menudto/menuDto';

@Component({
    name:"DataDictionaryManagerment",
    // comments:{

    // }
})

export default class DataDictionaryManagerment extends Mixins(PageMixins,DeleteMixins){
    private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
    private CurrentRow: any = {};

    private columns: ITableColumn[] = [
        {
            title:"标题",
            key:"title",
            align: "center",
        },{
            title:"值",
            key:"value",
            align: "center",
        },{
            title:"备注",
            key:"remark",
            align: "center",
        }
    ];

    pageChange(){
        this.loadData(MenuEnum.Button);
    }

    private async getTableData(){
        
    }

    private loadData(type?:MenuEnum){
        
    }
}