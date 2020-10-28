import { Component, Mixins, Ref } from "vue-property-decorator";

import { MainManager } from '@/domain/services/main/main-manager';
import OperateMixins from "@/shared/mixins/operate.mixins";

@Component({
  name: "SetPermission",
})
export default class SetPermission extends Mixins() {
  @Ref("tree")
  private tree: any;

  private data2: any = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];

  private title:string="";
  private CB:any;
  private IsShow:boolean=false;

  Show(_rowId:string) {
    this.title = `分配权限`;
    this.IsShow = true;
    MainManager.Instance().MenuService.getMenuTreeByRoleId(_rowId).then((res:any)=>{
       debugger;
      console.log(res);
    });
  }
}
