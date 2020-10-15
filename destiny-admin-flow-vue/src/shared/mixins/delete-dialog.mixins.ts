import { Vue, Component, Ref } from "vue-property-decorator";
import DeleteDialog from "@/components/delete-dialog/delete-dialog.vue"
import DeleteInfo from "@/components/delete-dialog/delete-dialog"
@Component({
    name:"deletedialog",
    components:{
        DeleteDialog
    }
})
export default class DeleteDialogMixins extends Vue{
    @Ref("DeleteInfo")
    protected DeleteInfo!:DeleteInfo;

}