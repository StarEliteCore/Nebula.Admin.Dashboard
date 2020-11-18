import { Component,Emit, Mixins,Ref} from 'vue-property-decorator';
import PageMixins from '../../../shared/mixins/page.mixins';
import DeleteMixins from '@/shared/mixins/delete-dialog.mixins';
import * as PageQuery from '@/shared/request';
import { ITableColumn } from '../../../shared/table/ITable';
import { MenuEnum } from '@/domain/entity/menudto/menuDto';
import { DataDictionaryDto } from '@/domain/entity/dataDictionaryDto/dataDictionaryDto';
import { MainManager } from '../../../domain/services/main/main-manager';
import { ITreeDto } from '@/shared/baseentity/itreeentity';
import { IFilterCondition, IQueryFilter } from '../../../shared/request/index';
import { EFilterConnect, EFilterOprator } from '@/shared/request/query.enum';
import { ComponentMixins } from '@/shared/mixins/component.mixns';
import { DataDictionaryApi } from '../../../domain/config/api/index';
import { DataDictionaryInputDto, DataDictionaryPageListDto } from '../../../domain/entity/dataDictionaryDto/dataDictionaryDto';
import DataDictionaryOperate from './dataDictionary-operate/dataDictionary-operate.vue';
import { EOperate } from '../../../shared/eoperate/index';
import DataDictionaryInfo from "./dataDictionary-operate/dataDictionary-operate"

@Component({
    name: "DataDictionaryManagerment",
    components: {
        DataDictionaryOperate
    },
})

export default class DataDictionaryManagerment extends Mixins(PageMixins,DeleteMixins){
    private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
    private CurrentRow: any = {};
    private treeData:Array<ITreeDto> = [];
    private treeSelectedId:string = "";
    private treeSelectedMenu:any = {};
    private dymaicQuery:any = {};
    private currentArray = [];

    private tableData:Array<DataDictionaryPageListDto> = [];

    pageUrl:string = DataDictionaryApi.getDataDictionaryPageListAsync

    /**
     * table加载状态
     */
    private showTableLoading:boolean = true;

    private filter = this.getFilter();

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

    private mainManager : MainManager = MainManager.Instance();

    @Emit()
    pageChange(){
        this.loadData(MenuEnum.Function);
    }

    private mounted() {
        this.loadData();
    }

    private loadTreeData(){
        this.mainManager.DataDictionarySrevice.getDataDictionaryTree()
        .then(res => {
            if(res.success){
                this.treeData = res.itemList
            }
        })
    }

    private treeSelected(selectedKeys:any,e:any){
        if(e.selected){
            this.treeSelectedId = selectedKeys[0];
            this.treeSelectedMenu = e.selectedNodes[0].data.props;
        }else{
            this.treeSelectedId = "";
            this.treeSelectedMenu = {};
        }
        this.dymaicQuery.parentId = this.treeSelectedId;
        this.loadData(MenuEnum.Function);
    }

    private async getTableData(){
        this.CurrentRow = {};
        this.currentArray = [];

        this.showTableLoading = true;
        this.queryfileter.filter = this.filter();
        // this.mainManager.DataDictionarySrevice.getDataDictionaryPageListAsync(this.tranfer(this.queryfileter))
        MainManager.Instance().DataDictionarySrevice.getDataDictionaryPageListAsync(this.tranfer(this.queryfileter))
        .then(res => {
            if(res.success){
                this.tableData = res.itemList;
                this.total = res.total;
            }
        })
    }

    getFilter(){
        const filters:IFilterCondition[] = [
            {
                field: "name",
                value: "",
                operator: EFilterOprator.Like,
            },
            {
                field: "parentId",
                value: "",
                operator: EFilterOprator.Equal,
            },
        ]
        return ():IQueryFilter => {
            const newFilters: IFilterCondition[] = [];
            filters.forEach(p => {
                const value = this.dymaicQuery[p.field];
                if(value != undefined && value != ""){
                    const filter: IFilterCondition = {
                        field: p.field,
                        value: p.operator == EFilterOprator.Like ? `%${value}%` : value,
                        operator: p.operator,
                    }; 
                    newFilters.push(filter);
                }
            });
            const filter: IQueryFilter = {
                filterConnect: EFilterConnect.And,
                conditions: newFilters,
            };
            return filter;
        }
    }

    @Ref("DataDictionaryInfo")
    private DataDictionaryInfo!: DataDictionaryInfo;

    /**
     * 操作方法
     * @param _type 
     * @param _rowId 
     */
    private operateItem(_type:EOperate,_rowId?:string){
        debugger
        switch(_type){
            case EOperate.add:
                this.DataDictionaryInfo.Show(
                    _type,
                    this.treeData,
                    this.treeSelectedId,
                    (res:boolean) => {
                        this.loadData();
                    }
                );
            break
        }
    }


    private loadData(type?:MenuEnum){
        this.getTableData();
        if (type !== MenuEnum.Function) this.loadTreeData();
    }
}