import { Vue, Component, Ref } from "vue-property-decorator";
import PageComponent from "@/components/page-component/page-component.vue";
import { EOperate } from '../eoperate';

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
//   @Ref("PageInfo")
//   protected PageInfo!: PageInfo;
//   @Ref("DeleteInfo")
//   protected DeleteInfo!: DeleteInfo;
}
