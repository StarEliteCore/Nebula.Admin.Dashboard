import { Component, Ref, Vue } from "vue-property-decorator";

import { EOperate } from '../eoperate';
import PageComponent from "@/components/page-component/page-component.vue";
import PageInfo from "@/components/page-component/page-component";

@Component({
  name: "PageMixins",
  components: {
    PageComponent,
  }
})
export default class PageMixins extends Vue {
  protected total: number = 0;
  protected loading: boolean = false;
  private operate = EOperate;
  @Ref("PageInfo")
  protected PageInfo!: PageInfo;
}
