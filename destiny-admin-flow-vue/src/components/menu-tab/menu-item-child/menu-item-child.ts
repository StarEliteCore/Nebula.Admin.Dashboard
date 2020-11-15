import { IMenuRouter } from '@/domain/entity/menudto/menuRouterDto';
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "MenuItemChild"
})
export default class MenuItemChild extends Vue {
  @Prop()
  private menuItemmessage!: IMenuRouter;
  getName(_item: IMenuRouter) {
    return _item.name;
  }
}