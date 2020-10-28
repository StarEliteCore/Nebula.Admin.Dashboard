import { Component, Mixins, Ref } from "vue-property-decorator";

import OperateMixins from "@/shared/mixins/operate.mixins";

@Component({
  name: "SetPermission",
})
export default class SetPermission extends Mixins() {
  @Ref("tree")
  private tree: any;

  private data2: any = [
    {
      title: "parent 1",
      expand: true,
      children: [
        {
          title: "parent 1-1",
          expand: true,
          children: [
            {
              title: "leaf 1-1-1",
            },
            {
              title: "leaf 1-1-2",
            },
          ],
        },
        {
          title: "parent 1-2",
          expand: true,
          children: [
            {
              title: "leaf 1-2-1",
            },
            {
              title: "leaf 1-2-1",
            },
          ],
        },
      ],
    },
  ];

  private title:string="";
  private CB:any;
  private IsShow:boolean=false;

  Show() {
    this.title = `分配权限`;
    this.IsShow = true;
  }
}
