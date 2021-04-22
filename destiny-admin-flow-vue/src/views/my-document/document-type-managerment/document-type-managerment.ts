import { Component, Mixins } from "vue-property-decorator";
import { ComponentMixins } from "@/shared/mixins/component.mixns";
import { DocumentTypeApi } from "@/domain/config/api";
@Component({
    name: "DocumentTypeManagerment",
    components: {
    
    },
  })
  export default class  DocumentTypeManagerment extends Mixins(
    ComponentMixins
  ){

    pageUrl: string = DocumentTypeApi.getPage;
    deleteUrl: string = DocumentTypeApi.delete;
    saveEditUrl: string = DocumentTypeApi.createOrUpdate;
 

  }