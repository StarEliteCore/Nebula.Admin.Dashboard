import { IMenuRouter } from '@/domain/entity/menu/MenuRouterDto';
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "MenuItemChild"
})
export default class MenuItemChild extends Vue {
  @Prop()
  private menuItemmessage!: IMenuRouter;
  getName(_item: IMenuRouter) {
    console.log(_item)
    return  _item.name ;
  }
}