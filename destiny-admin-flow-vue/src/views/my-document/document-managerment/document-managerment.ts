import { Component, Mixins } from "vue-property-decorator";

import { ComponentMixins } from "@/shared/mixins/component.mixns";
import { DocumentApi } from "@/domain/config/api";

import {
  IFilterCondition,
  IOrderCondition,
  ISearchFilter,
} from "@/shared/request";
import DocumentOperate from "./document-operate/document-operate.vue";
import { ESort } from "@/shared/request/query.enum";

@Component({
  name: "DocumentManagerment",
  components: {
    DocumentOperate,
  },
})
export default class DocumentManagerment extends Mixins(ComponentMixins) {
  pageUrl: string = DocumentApi.getPage;
  deleteUrl: string = DocumentApi.delete;
  saveEditUrl: string = DocumentApi.createOrUpdate;
  GetColumn() {
    return [
      {
        type: "selection",
        width: 60,
        align: "center",
      },

      {
        title: "标题",
        key: "title",
        align: "center",
        maxWidth: 300,
      },
      {
        title: "内容",
        key: "content",
        align: "center",
        maxWidth: 300,
      },
      {
        title: "文档类型",
        key: "documentTypeName",
        align: "center",
        maxWidth: 95,
      },
      {
        title: "用户昵称",
        key: "nickName",
        align: "center",
        maxWidth: 95,
      },
      {
        title: "创建时间",
        key: "createdTime",
        align: "center",
        sort: ESort.Descending,
      },
      {
        title: "最后修改时间",
        key: "lastModifionTime",
        align: "center",
      },
    ];
  }

  GetFields(): ISearchFilter[] {
    return [
      {
        field: "title",
        value: "",
        title: "标题",
      },
      {
        field: "content",
        value: "",
        title: "内容",
      },
    ];
  }

  // //排序
  // GetOrders(): IOrderCondition[] {
  //   return [
  //     {
  //       sortDirection: ESort.Descending,
  //       sortField: "CreatedTime",
  //     },
  //   ];
  // }
}
