import { Component, Mixins } from "vue-property-decorator";

import { EditModalMixins } from "@/shared/mixins/edit-modal.mixins";
import { MainManager } from "@/domain/services/main/main-manager";
import { TreeChild } from "view-design";

import {
  IDocumentTreeOutDto,
  IDocumentTypeOutputPageList,
} from "@/domain/entity/documentType/documentTypeDto";
@Component({
  name: "DocumentOperate",
  components: {
    
  }
})
export default class DocumentOperate extends Mixins(EditModalMixins) {
  private treeData: Array<IDocumentTreeOutDto> = [];

  private ruleValidate = {
    /**
     *
     */
    title: [
      { required: true, message: "标题不能为空", trigger: "onHandleCommit" },
    ],
    documentTypeId: [
      { required: true, message: "请选择文档类型", trigger: "onHandleCommit" },
    ],
    content: [
      { required: true, message: "内容不能为空", trigger: "onHandleCommit" },
    ],
  };

  protected MapTo(_rowId: string) {
    if (_rowId === undefined) {
      return;
    }
  }

  protected InIt() {
    this.MapTo(this.editData.id as string);
    this.GetFormRef();
    this.LoadDocumentType();

  }
  private mainManager: MainManager = MainManager.Instance();

  LoadDocumentType() {
    this.mainManager.DocumentTypeServeice.getDocumentTypeTreeData().then(
      (res) => {
        if (res.success) {
          this.treeData = res.itemList;
        }
      }
    );
  }
}
