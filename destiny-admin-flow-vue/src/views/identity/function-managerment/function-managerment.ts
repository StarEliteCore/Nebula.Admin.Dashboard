import { Component, Mixins } from "vue-property-decorator";

import { ComponentMixins } from '@/shared/mixins/component.mixns';
import { FunctionApi } from '@/domain/config/api';
import FunctionOperate from "./function-operate/function-operate.vue";
import { ISearchFilter } from "@/shared/request";

@Component({
  name: "FunctionManagerment",
  components: {
    FunctionOperate
  },
})
export default class FunctionManagerment extends Mixins(
  ComponentMixins
  ) 
{
 
  

  pageUrl: string = FunctionApi.getFunctionPage;
  deleteUrl: string = FunctionApi.deleteFunction;
  saveEditUrl: string = FunctionApi.createrOrUpdateFunction;
  GetColumn(){
    return [
      {
        type: "selection",
        width: 60,
        align: "center",
      },
  
      {
        title: "功能名字",
        key: "name",
        align: "center",
        maxWidth: 300,
      },
      {
          title: "Url链接",
          key: "linkUrl",
          align: "center",
          maxWidth: 300,
        },
      {
        title: "是否可用",
        key: "isEnabled",
        align: "center",
        slot: "isEnabled",
        maxWidth: 95,
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

  GetFields():ISearchFilter[]{
    return  [
      {
        field: "name",
        value: "",
        title:"功能名",

      },
      {
        field: "linkurl",
        value: "",
        title:"链接",
      },
    ];
  }

}

