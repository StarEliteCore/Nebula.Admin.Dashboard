import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from '@/shared/request/query.enum';

import * as  PageQuery   from '@/shared/request';
import { MainManager } from '@/domain/services/main/main-manager';
import PageMixins from "@/shared/mixins/page.mixins";

@Component({
    name:"UserManagerment",
    components: {}
})

export default class UserManagerment extends Mixins(PageMixins) {
    private queryfileter:PageQuery.IPageRequest = new PageQuery.PageRequest();
    private created()
    {
        console.log(this.queryfileter)
        MainManager.Instance().UserService.getUserPage(this.queryfileter)
        console.log(11)
    }
    
}