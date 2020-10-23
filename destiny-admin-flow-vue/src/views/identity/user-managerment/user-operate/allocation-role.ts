import { Component, Mixins } from "vue-property-decorator";
import OperateMixins from "@/shared/mixins/operate.mixins";
@Component({
    name: "AllocationRoles",
})

export default class AllocationRole extends Mixins(OperateMixins) {
    private aaa:any="";
    Show( _rowId?: string){
        this.IsShow=true;
    }
}