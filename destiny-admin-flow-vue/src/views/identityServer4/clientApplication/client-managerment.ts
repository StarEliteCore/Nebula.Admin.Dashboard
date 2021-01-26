import { Component, Mixins } from "vue-property-decorator";

import ApiResource from "./api-resource-operate/api-resource-operate.vue";
import { ApiResourceApi } from "@/domain/config/api";
import { ComponentMixins } from "@/shared/mixins/component.mixns";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { ISearchFilter } from "@/shared/request";

@Component({
  name: "ApiResourceManagerment",
  components: {
    ApiResource,
  },
})
export default class ClientManagerment extends Mixins(DeleteMixins,ComponentMixins) {
  GetColumn() {
    return [
      {
        type: "selection",
        width: 60,
        align: "center",
      },
      {
        title: "是否管理员",
        key: "enabled",
        align: "center",
        slot: "enabled",
      },
      {
        title: "创建时间",
        key: "createdTime",
        align: "center",
      },
      {
        title: "最后修改时间",
        key: "lastModifionTime",
        align: "center",
      },
      {
        title: "描述",
        key: "description",
        align: "center",
      },
    ];
  }
}
