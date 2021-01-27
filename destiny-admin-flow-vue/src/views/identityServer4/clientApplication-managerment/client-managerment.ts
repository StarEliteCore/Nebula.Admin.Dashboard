import { Component, Mixins, Ref } from "vue-property-decorator";

import { ClientApi } from "@/domain/config/api";
import ClientOperate from "./client-operate/client-operate.vue"
import ClientOperateInfo from "./client-operate/client-operate"
import { ComponentMixins } from "@/shared/mixins/component.mixns";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { EOperate } from "@/shared/eoperate";
import { ISearchFilter } from "@/shared/request";
import PageMixins from "@/shared/mixins/page.mixins";

@Component({
  name: "ClientManagerment",
  components: {
    ClientOperate
  },
})
export default class ClientManagerment extends Mixins(PageMixins,DeleteMixins,ComponentMixins) {
  @Ref("ClientOperateInfo")
  private ClientOperateInfo!: ClientOperateInfo;
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
  // protected Ma
  // deleteUrl: string = ApiResourceApi.delete;
  // saveEditUrl: string = ApiResourceApi.createApiResource;
  created()
  {
   
  }
  mounted(){
    console.log(this.ClientOperateInfo) 
  }
  private operateItem(_type: EOperate, _rowId?: string) {
    // if (typeof this.CurrentRow === "undefined" && (_type === EOperate.update || _type === EOperate.view)) {
    //   this.$Message.error("请选择要修改的用户");
    //   return "";
    // }
    if (_type === EOperate.update || _type === EOperate.view) {
      this.ClientOperateInfo.Show(_type, (res: boolean) => {
        console.log("asdasdas");
      })
    }
    else {
      this.ClientOperateInfo.Show(_type, (res: boolean) => {
        console.log("asdasdas");
      })
    }

  }
}
