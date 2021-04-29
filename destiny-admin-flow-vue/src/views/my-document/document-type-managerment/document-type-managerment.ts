import { Component, Mixins } from "vue-property-decorator";
import * as PageQuery from "@/shared/request";
import {
  DocumentTypeOutputDto,
  IDocumentTreeOutDto,
  IDocumentTypeOutputPageList,
} from "@/domain/entity/documentType/documentTypeDto";
import { MainManager } from "@/domain/services/main/main-manager";
import PageMixins from "@/shared/mixins/page.mixins";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import DocumentTypeOperate from "./document-type-operate/document-type-operate.vue";
import { ITableColumn } from "@/shared/table/ITable";
import { IQueryFilter } from "@/shared/request";
import * as QueryEnum from "@/shared/request/query.enum";
@Component({
  name: "DocumentTypeManagerment",
  components: {
    DocumentTypeOperate,
  },
})
export default class DocumentTypeManagerment extends Mixins(
  PageMixins,
  DeleteMixins
) {
  private treeData: Array<IDocumentTreeOutDto> = [];

  private mainManager: MainManager = MainManager.Instance();

  private tableData: Array<IDocumentTypeOutputPageList> = [];

  private mounted() {
    this.loadTreeData();
    this.loadTableData();
  }

  private loadTreeData() {
    this.mainManager.DocumentTypeServeice.getDocumentTypeTreeData().then(
      (res) => {
        if (res.success) {
          this.treeData = res.itemList;
        }
      }
    );
  }

  private documentType: any;

  private handleAdd() {
    this.documentType = this.$refs.documentType as Vue;
    if (!this.documentType) {
      return;
    }

    this.$nextTick(() => this.documentType.$emit("open"));
  }

  private handleDelete() {
    console.log(this.treeSelectedId);
    if (this.treeSelectedId === "") {
      this.$Message.error("请选择要删除的数据!");
      return;
    } else {
      this.mainManager.DocumentTypeServeice.deleteDocumentTypeAsync(
        this.treeSelectedId
      ).then((res) => {
        if (res.success) {
          this.$Message.success("删除成功");
          this.loadTreeData();
          this.loadTableData();
        } else {
          this.$Message.error({
            duration: 5,
            content:res.message

          });
        }
      });
    }
  }

  private columns: ITableColumn[] = [
    {
      type: "selection",
      width: 60,
      align: "center",
    },
    {
      title: "名称",
      key: "name",
      align: "center",
      maxWidth: 180,
    },
    {
      title: "描述",
      key: "description",
      align: "center",
    },
  ];
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private loadTableData() {
    this.mainManager.DocumentTypeServeice.getDocumentTypePage(
      this.tranfer(this.queryfileter)
    ).then((res) => {
      if (res.success) {
        this.tableData = res.itemList;
        this.total = res.total;
      }
    });
  }

  private treeSelectedId: string = "";
  private treeSelectedNode: any;

  private onTreeSelect(expandedKeys: any, expanded: any) {
    if (expanded.selected === true) {
      this.treeSelectedId = expandedKeys[0];
      this.treeSelectedNode = expanded.selectedNodes[0].data.props;
      // let filter: IQueryFilter = {
      //   filterConnect: QueryEnum.EFilterConnect.And,
      //   conditions: [
      //     {
      //       value: this.treeSelectedId,
      //       field: "parentId",
      //       operator: QueryEnum.EFilterOprator.Equal,
      //     },
      //   ],
      // };
      // this.queryfileter.filter = filter;
      // this.loadTableData();
    } else {
      this.treeSelectedId = "";
      this.treeSelectedNode = null;
    }
  }
}
