import { MenuList } from '@/modules/static/menuindex';
import { MenuModule } from '@/store/modules/menumodule';
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "HomePage"
})
export default class HomePage extends Vue {
  private created()
{
  MenuModule.SetMenus(MenuList);
}
}
