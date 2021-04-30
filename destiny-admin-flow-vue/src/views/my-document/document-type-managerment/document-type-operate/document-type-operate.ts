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
  @Prop()
  private editTitle!: string;

  @Prop()
  private editData!: any;

  public visible = false;

  private editModel: IDocumentTypeInputDto = new DocumentTypeInputDto();
  @Prop()
  private treeData!: any;
  private treeData1: any = [];
  private mainManager: MainManager = MainManager.Instance();
  //页面初始化
  private InIt() {}

  // private Load() {
  //   this.mainManager.DocumentTypeServeice.getDocumentTypeTreeData().then(
  //     (res) => {
  //       if (res.success) {
  //         this.treeData = res.itemList;
  //       }
  //     }
  //   );
  // }

  open() {
    this.$nextTick(() => {
      this.treeData1 = this.treeData;
      this.editModel=new DocumentTypeInputDto();
      this.visible = true;
      this.LoadForm();
    });
  }

  LoadForm() {
    if (this.editData === undefined) {
      return;
    }

    if (this.editData.Id !== "") {
      this.mainManager.DocumentTypeServeice.getDocumentTypeById(
        this.editData.Id
      ).then((res) => {
        if (res.success) {
          this.editModel = res.data;
        } else {
          this.$Message.error(res.message);
        }
      });
    }
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
        this.$emit("refresh");
        this.colse();
      });
    });
  }
}
