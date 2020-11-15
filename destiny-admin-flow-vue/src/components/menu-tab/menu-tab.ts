import { IMenuInstance } from '@/domain/entity/ConfigureInfo/menuConfigure/MenuInstance';
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import MenuItemChild from "./menu-item-child/menu-item-child.vue"
@Component({
  name: "MenuTab",
  components: {
    MenuItemChild
  }
})
export default class MenuTab extends Vue {
  @Prop()
  private menus!: IMenuInstance;
  @Prop()
  private activeName!: string;
  @Prop()
  private openNames!: Array<string>;
  get MenuList() {
    return this.menus.menuItemList.length > 1 ? this.menus.menuItemList : [];
  }
  @Prop()
  private isCollapsed!: boolean;
  @Watch("isCollapsed")
  WatchIsCollapsed(isCollapsed: boolean) {
    isCollapsed &&
      this.$nextTick(() => {
        (this.$refs.menu as any).updateOpened();
      });
  }
  OpenChange(_nameArr: string[]) {
    if (this.isCollapsed) {
      this.$emit("OpenChange", []);
      this.$nextTick(() => {
        (this.$refs.menuRef as any).updateOpened();
      });
    } else {
      this.$emit("OpenChange", _nameArr);
    }
  }
  private changeSelect(_name:string){
    // console.log(_name);
    // console.log(this.$route);
    // console.log(this.menus);
  }
}