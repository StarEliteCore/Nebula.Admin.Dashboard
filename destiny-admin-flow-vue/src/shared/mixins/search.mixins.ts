import { Component, Emit, Ref, Vue } from "vue-property-decorator";
import { IPageRequest, IQueryFilter, PageRequest } from "../request";

import { EOperate } from "../eoperate";
import MySearch from "@/shared/search/my-search.vue";
import SearchInfo from "@/shared/search/my-search";

@Component({
  name: "SearchMixins",
  components: {
    MySearch,
  },
})

export default class SearchMixins extends Vue {
  @Ref("SearchInfo")
  protected SearchInfo!: SearchInfo;
 

}
