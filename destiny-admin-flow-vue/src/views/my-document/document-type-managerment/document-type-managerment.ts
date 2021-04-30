import { Component, Emit, Mixins } from "vue-property-decorator";
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
  private editTitle: string = "新增！";
  private editData: any = {};
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

  refresh() {
    this.loadTreeData();
    this.loadTableData();
  }
  private handleAdd() {
    this.documentType = this.$refs.documentType as Vue;
    if (!this.documentType) {
      return;
    }
    this.treeSelectedId = "";
    if (this.treeSelectedId === "") {
      this.editTitle = "新增";
    } else {
      this.editTitle = "更新";
    }

    this.editData.Id = "";
    this.documentType.$emit("open");
  }

  private handleUpdate() {
    this.documentType = this.$refs.documentType as Vue;
    if (!this.documentType) {
      return;
    }
    if (this.treeSelectedId === "") {
      this.$Message.info("请选择一条数据!!!");
      return;
    } else {
      this.editTitle = "更新";
    }

    this.editData.Id = this.treeSelectedId;
    this.documentType.$emit("open");
  }

  private handleDelete() {
    if (this.treeSelectedId === "") {
      this.$Message.error("请选择要删除的数据!");
      return;
    } else {
      this.mainManager.DocumentTypeServeice.deleteDocumentTypeAsync(
        this.treeSelectedId
      ).then((res) => {
        if (res.success) {
          this.refresh();
          this.$Message.success("删除成功");
        } else {
          this.$Message.error({
            duration: 5,
            content: res.message,
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

  @Emit()
  pageChange() {
    this.loadTableData();
  }

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


