import { Component, Mixins } from "vue-property-decorator";

import { IDocumentTreeOutDto } from "@/domain/entity/documentType/documentTypeDto";
import { MainManager } from "@/domain/services/main/main-manager";
import PageMixins from "@/shared/mixins/page.mixins";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import DocumentTypeOperate from "./document-type-operate/document-type-operate.vue";
@Component({
  name: "DocumentTypeManagerment",
  components: {
    DocumentTypeOperate,
  },
})
export default class DocumentTypeManagerment extends Mixins(
  PageMixins,
  DeleteMixins
) {
  private treeData: Array<IDocumentTreeOutDto> = [];

  private mainManager: MainManager = MainManager.Instance();

  private mounted() {
    this.loadTreeData();
  }

  private loadTreeData() {
    this.mainManager.DocumentTypeServeice.getDocumentTypeTreeData().then(
      (res) => {
        if (res.success) {
          this.treeData = res.itemList;
        }
      }
    );
  }

  private documentType:any;

  private handleAdd() {

    this.documentType = this.$refs.documentType as Vue;
    if (!this.documentType) {
      return;
    }
   
    this.documentType.$emit("open");
  }
}
