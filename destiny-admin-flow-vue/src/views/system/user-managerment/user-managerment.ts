import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from '@/shared/request/query.enum';

import { IPageRequest } from '@/shared/request';
import { MainManager } from '@/domain/services/main/main-manager';
import PageMixins from "@/shared/mixins/page.mixins";

@Component({
    name:"UserManagerment",
    components: {}
})

export default class UserManagerment extends Mixins(PageMixins) {

    private _page:IPageRequest={
        pageIndex:1,
        pageRow:10,
        orderConditions:[],
        queryFilter:{
            filterConnect:EFilterConnect.And,
            filters:[]
        }
    }

    private created()
    {

        // console.log(this.PageInfo)
        MainManager.Instance().MenuService.getMenuTable(this._page)
        console.log(11)
    }
    
}