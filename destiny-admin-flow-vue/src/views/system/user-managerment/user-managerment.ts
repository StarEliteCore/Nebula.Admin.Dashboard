import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from '@/shared/request/query.enum';

import * as  PageQuery from '@/shared/request';
import { MainManager } from '@/domain/services/main/main-manager';
import PageMixins from "@/shared/mixins/page.mixins";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";

@Component({
    name: "UserManagerment"
})

export default class UserManagerment extends Mixins(PageMixins, DeleteMixins) {
    private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
    /**
     * 页面加载方法
     */
    private created() {
        // console.log(this.queryfileter)
        // console.log(this.total)
        
        // this.Show("删除", "王爸爸", () => {
        //     console.log("wangbaba")
        // });
        MainManager.Instance().UserService.getUserPage(this.queryfileter)
    }
    private mounted()
    {
        this.DeleteInfo.Show("删除", "王爸爸", () => {
                this.deleteItemById(";");
            });
    }
    /**
     * @description 根据id删除
     */
    private async deleteItemById(_id: string) {
        console.log("15212a1d")
    }

}