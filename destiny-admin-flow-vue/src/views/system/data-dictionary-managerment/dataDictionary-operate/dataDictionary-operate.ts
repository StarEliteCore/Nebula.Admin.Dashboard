import OperateMixins from "@/shared/mixins/operate.mixins";
import { Component, Mixins } from "vue-property-decorator";
import { DataDictionaryInputDto } from "@/domain/entity/dataDictionaryDto/dataDictionaryDto";
import { EOperate } from "../../../../shared/eoperate/index";
import { MainManager } from "../../../../domain/services/main/main-manager";
import { Guid } from "guid-typescript";

@Component({
  name: "DataDictionaryOperate",
})
export default class DataDictionaryOperate extends Mixins(OperateMixins) {
  /**
   * 添加修改对象
   */
  private dataDictionaryDto: DataDictionaryInputDto = new DataDictionaryInputDto();
  private treeData: Array<any> = [];
  private dataDictionInputDto: DataDictionaryInputDto = new DataDictionaryInputDto();
  private ruleValidate: any = {
    title: [
      { required: true, message: "标题不可为空", trigger: "OnHandleCommit" },
    ],
    value: [
      { required: true, message: "值不可为空", trigger: "OnHandleCommit" },
    ],
    code: [
      { required: true, message: "编码不可为空", trigger: "OnHandleCommit" },
    ]
  };

  public async Show(
    _type: EOperate,
    _treeData: Array<any>,
    parentId: string,
    callback: (res: boolean) => void,
    _rowId?: string
  ) {
    switch (_type) {
      case EOperate.add:
        //写成方法，然后状态写成字典中，什么状态读执行什么方法就可以了，就不用写那么多方法。待优化 todo by 大黄瓜
        this.title = "添加";
        this.dataDictionInputDto = new DataDictionaryInputDto();
        this.dataDictionInputDto.parentId = parentId;
        this.dataDictionInputDto.id = Guid.EMPTY;
        this.treeData = _treeData;
        break;
      case EOperate.update:
        this.disabled = false;
        this.IsShowColumn = false;
        debugger;
        if (typeof _rowId !== "undefined") {
          this.treeData = _treeData;
          await this.getDataDictionaryById(_rowId);
        }
        this.title = `编辑—「${this.dataDictionInputDto.title}」`;
        break;
    }
    this.CB = callback;
    this.type = _type;
    this.IsShow = true;
  }

  private OnHandleCommit() {
    (this.$refs.form as any).validate((valid: boolean) => {
      if (valid) {
        switch (this.type) {
          case EOperate.view:
            this.IsShow = false;
            this.CB(true);
            break;
          case EOperate.add:
            this.addDataDictionary();
            break;
          case EOperate.update:
            this.updateDataDictionary();
            this.IsShow = false;
            break;
        }
      }
    });
  }

  private async addDataDictionary() {
    let res = await MainManager.Instance().DataDictionarySrevice.createDataDictionary(
      this.dataDictionInputDto
    );

    this.ajaxcallback(res, true);
  }

  private async updateDataDictionary() {
    let res = await MainManager.Instance().DataDictionarySrevice.updateDataDictionary(
      this.dataDictionInputDto
    );
    this.ajaxcallback(res, true);
  }

  private async getDataDictionaryById(_id: string) {
    let res = await MainManager.Instance().DataDictionarySrevice.getLoadDictionnnary(
      _id
    );
    if (res.success) {
      this.dataDictionInputDto = res.data;
    }
  }
}
