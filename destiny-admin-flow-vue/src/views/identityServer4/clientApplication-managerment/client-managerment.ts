import { Component, Mixins } from "vue-property-decorator";

import { ClientApi } from "@/domain/config/api";
import { ComponentMixins } from "@/shared/mixins/component.mixns";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { ISearchFilter } from "@/shared/request";

@Component({
  name: "ClientManagerment",
  components: {
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
        title: "客户段应用Id",
        key: "clientId",
        align: "center",
      },
      {
        title: "客户应用名称",
        key: "clientName",
        align: "center",
      },
      {
        title: "协议类型",
        key: "protocolType",
        align: "center",
      },
      {
        title: "授权模式",
        key: "allowedGrantTypes",
        align: "center",
      },
      {
        title: "授权范围",
        key: "allowedScopes",
        align: "center",
      },
      {
        title: "登录重定向",
        key: "redirectUris",
        align: "center",
      },
      {
        title: "跨域地址",
        key: "allowedCorsOrigins",
        align: "center",
      },
      {
        title: "退出登录重定向",
        key: "postLogoutRedirectUris",
        align: "center",
      },
      {
        title: "是否启用",
        key: "enabled",
        align: "center",
        slot: "enabled",
      },

    ];
  }
  pageUrl: string = ClientApi.getPage;
  // deleteUrl: string = ApiResourceApi.delete;
  // saveEditUrl: string = ApiResourceApi.createApiResource;
  // created()
  // {
    
  // }
}
