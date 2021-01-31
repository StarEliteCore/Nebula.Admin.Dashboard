import { Component, Emit, Mixins } from "vue-property-decorator";

import ApiScope from "./apiScope-operate/api-scope-operate.vue";
import {ApiScopeApi} from "@/domain/config/api";
import { ComponentMixins } from "@/shared/mixins/component.mixns";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { IAjaxResult } from "@/shared/response";
import { ISearchFilter } from "@/shared/request";

@Component({
  name: "ApiScopeManagerment",
  components: {
    ApiScope
  },
})
export default class ApiScopeManagerment extends Mixins(
  DeleteMixins,
  ComponentMixins
) {
  pageUrl: string = ApiScopeApi.getPage;

  saveEditUrl: string = ApiScopeApi.createApiScope;
  deleteUrl: string =ApiScopeApi.delete;
  GetColumn() {
    return [
      {
        type: "selection",
        width: 60,
        align: "center",
      },
      {
        title: "范围名字",
        key: "name",
        align: "center",
        maxWidth: 150,
      },
      {
        title: "范围显示名",
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
        title: "范围名字",
      },
      {
        field: "displayName",
        value: "",
        title: "范围显示名",
      },
    ];
  }


}
