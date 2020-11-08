import { Component, Mixins } from "vue-property-decorator";

import { EOperate } from "@/shared/eoperate";
import { MainManager } from "@/domain/services/main/main-manager";
import OperateMixins from "@/shared/mixins/operate.mixins";
import { OrganizationInputDto } from "@/domain/entity/organization/organization";

@Component({
  name: "MenuOperates",
})
export default class Organization extends Mixins(OperateMixins) {
  /**
   * 添加修改对象
   */
  private organizationDto: OrganizationInputDto = new OrganizationInputDto();
  private treeData: Array<any> = [];

  private ruleValidate: any = {
    name: [
      { required: true, message: "名称不可为空", trigger: "OnHandleCommit" },
    ],
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
        this.title = "添加";
        this.organizationDto = new OrganizationInputDto();
        this.organizationDto.parentId = parentId;
        this.treeData = _treeData;
        break;
      case EOperate.update:
        this.disabled = false;
        this.IsShowColumn = false;
        if (typeof _rowId !== "undefined") {
          this.treeData = _treeData;
          await this.getMenuById(_rowId);
        }
        this.title = `编辑—「${this.organizationDto.name}」`;
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
            this.addOrganization();
            break;
          case EOperate.update:
            this.updateOrganization();
            this.IsShow = false;
            break;
        }
      }
    });
  }

  /**
   * @description 根据id获取菜单
   * @param {string} _id id
   */
  private async getMenuById(_id: string) {
    let res = await MainManager.Instance().MenuService.getMenuById(_id);
    if (res.success) {
      this.organizationDto = res.data;
    }
  }

  private async addOrganization() {
    let res = await MainManager.Instance().OrganizationService.createOrganizationAsync(
      this.organizationDto
    );
    this.ajaxcallback(res, true);
  }

  private async updateOrganization() {
    let res = await MainManager.Instance().OrganizationService.updateOrganizationAsync(
      this.organizationDto
    );
    this.ajaxcallback(res, true);
  }
}
