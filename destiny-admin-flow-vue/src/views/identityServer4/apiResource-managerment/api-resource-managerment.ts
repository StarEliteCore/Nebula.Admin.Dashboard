import { ApiResourceApi, ApiScopeApi } from "@/domain/config/api";
import { Component, Emit, Mixins } from "vue-property-decorator";

import ApiResource from "./api-resource-operate/api-resource-operate.vue";
import { ComponentMixins } from "@/shared/mixins/component.mixns";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { IAjaxResult } from "@/shared/response";
import { ISearchFilter } from "@/shared/request";

@Component({
  name: "ApiResourceManagerment",
  components: {
    ApiResource
  },
})
export default class ApiResourceManagerment extends Mixins(
  DeleteMixins,
  ComponentMixins
) {
  pageUrl: string = ApiResourceApi.getPage;
  deleteUrl: string = ApiResourceApi.delete;
  saveEditUrl: string = ApiResourceApi.createApiResource;

  GetColumn() {
    return [
      {
        type: "selection",
        width: 60,
        align: "center",
      },
      {
        title: "资源名称",
        key: "name",
        align: "center",
        maxWidth: 150,
      },
      {
        title: "显示名",
        key: "displayName",
        align: "center",
        maxWidth: 150,
      },
      {
        title: "是否启用",
        key: "enabled",
        align: "center",
        maxWidth: 150,
        slot: "enabled",
      },
      {
        title: "范围",
        key: "scope",
        align: "center",
        maxWidth: 150,
      },
      {
        title: "用户声明",
        key: "userClaim",
        align: "center",
        maxWidth: 150,
      },
      {
        title: "创建时间",
        key: "createdTime",
        align: "center",
        maxWidth: 150,
      },
      {
        title: "描述",
        key: "description",
        align: "center",
      },
    ];
  }

  GetFields(): ISearchFilter[] {
    return [
      {
        field: "name",
        value: "",
        title: "资源名称",
      },
      {
        field: "displayName",
        value: "",
        title: "显示名",
      },
    ];
  }

}
