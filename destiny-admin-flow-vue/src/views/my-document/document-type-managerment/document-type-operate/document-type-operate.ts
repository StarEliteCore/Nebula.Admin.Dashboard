import {
  DocumentTypeInputDto,
  IDocumentTreeOutDto,
  IDocumentTypeInputDto,
} from "@/domain/entity/documentType/documentTypeDto";
import { MainManager } from "@/domain/services/main/main-manager";
import DestinyCoreModule from "@/shared/core/DestinyCoreModule";
import { AjaxResult } from "@/shared/response";
import { Component, Mixins, Prop } from "vue-property-decorator";

@Component({
  name: "DocumentTypeOperate",
})
export default class DocumentTypeOperate extends Mixins() {
  @Prop(String)
  private editTitle: string | undefined;

  public visible = false;

  private editModel: IDocumentTypeInputDto = new DocumentTypeInputDto();
  private treeData: Array<IDocumentTreeOutDto> = [];
  private mainManager: MainManager = MainManager.Instance();
  //页面初始化
  private InIt() {}

  private Load() {
    this.mainManager.DocumentTypeServeice.getDocumentTypeTreeData().then(
      (res) => {
        if (res.success) {
          this.treeData = res.itemList;
        }
      }
    );
  }

  open() {
    this.visible = true;
    this.Load();
  }

  colse() {
    this.visible = false;
  }

  private created() {
    this.$on("open", this.open);
    this.$on("colse", this.colse);
  }

  save() {
    this.mainManager.DocumentTypeServeice.createOrUpdateDocumentType(
      this.editModel
    ).then((res) => {
      DestinyCoreModule.ToAjaxResult(res, () => {
        this.colse();
      });
    });
  }
}
