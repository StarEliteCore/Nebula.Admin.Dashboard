import { Component, Mixins } from "vue-property-decorator";
import { ComponentMixins } from "@/shared/mixins/component.mixns";
import { DocumentTypeApi } from "@/domain/config/api";
import { IDocumentTreeOutDto } from "@/domain/entity/documentType/documentTypeDto";
import { MainManager } from "@/domain/services/main/main-manager";
@Component({
  name: "DocumentTypeManagerment",
  components: {},
})
export default class DocumentTypeManagerment extends Mixins() {
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
}
