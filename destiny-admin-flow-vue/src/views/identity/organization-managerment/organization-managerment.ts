import { Component, Emit, Mixins, Ref } from "vue-property-decorator";

import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { ITableColumn } from '@/shared/table/ITable';
import PageMixins from '@/shared/mixins/page.mixins';

@Component({
    name: "OrganizationManagerment",
    components: {
    }
  })
  export default class MenuManagerment extends Mixins(PageMixins, DeleteMixins) {
    private treeData: Array<any> = [];
    private tableData: Array<any> = [];
    private columns: ITableColumn[] = [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: "名称",
          key: "name",
          align: "center",
        //   maxWidth: 180
        },
        {
          title: "图标",
          key: "icon",
          align: "center",
        //   maxWidth: 150
        },
        {
          title: "类型",
          key: "type",
          align: "center",
        //   maxWidth: 150,
          slot: "type"
        },
        {
          title: "层级",
          key: "depth",
          align: "center",
        //   maxWidth: 120
        },
        {
          title: "描述",
          key: "description",
          align: "center",
        },
      ];
      @Emit()
      pageChange() {
        // this.loadData(MenuEnum.Button);
      }
  }
