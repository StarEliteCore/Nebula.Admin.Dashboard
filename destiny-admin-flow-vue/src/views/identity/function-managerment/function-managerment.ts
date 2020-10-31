import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";
import { IFilterCondition, IQueryFilter } from "@/shared/request";
import {
  IFunctionOutputPageList,
  IFunctionTableDto,
} from "@/domain/entity/functiondto/functionDto";

import { EOperate } from '@/shared/eoperate';
import FunctionOperate from "./function-operate/function-operate.vue";
import FunctionOperateInfo from "./function-operate/function-operate";
import { IAjaxResult } from '@/shared/response';
import { ITableColumn } from "@/shared/table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";
import OperateMixins from '@/shared/mixins/operate.mixins';
import PageMixins from "@/shared/mixins/page.mixins";

@Component({
  name: "FunctionManagerment",
  components: {
    FunctionOperate
  },
})
export default class FunctionManagerment extends Mixins(PageMixins) {
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private CurrentRow!: IFunctionTableDto;
  private CurrentArray: Array<IFunctionTableDto> = [];

  private CurrentSelectionArray: any = [];
  private delectLoading: boolean = false;

  private columns: ITableColumn[] = [
    {
      type: "selection",
      width: 60,
      align: "center",
    },

    {
      title: "功能名字",
      key: "name",
      align: "center",
      maxWidth: 300,
    },
    {
        title: "Url链接",
        key: "linkUrl",
        align: "center",
        maxWidth: 300,
      },
    {
      title: "是否可用",
      key: "isEnabled",
      align: "center",
      slot: "isEnabled",
      maxWidth: 95,
    },
    {
      title: "创建时间",
      key: "createdTime",
      align: "center",
    },
    {
      title: "最后修改时间",
      key: "lastModifionTime",
      align: "center",
    },
    {
      title: "描述",
      key: "description",
      align: "center",
    },
  ];
  private functionTable: Array<IFunctionOutputPageList> = [];

  private filters: IFilterCondition[] = [
    {
      field: "name",
      value: "",
      operator: EFilterOprator.Like,
    },
    {
      field: "linkurl",
      value: "",
      operator: EFilterOprator.Like,
    },
  ];

  private dynamicQuery: any = {};

  @Ref("FunctionOperateInfo")
  private FunctionOperateInfo!: FunctionOperateInfo;
  //查询
  private search() {
    let newFilters: IFilterCondition[] = [];

    let $this = this;

    this.filters.forEach((f) => {
      let value = $this.dynamicQuery[f.field];
      if (value != undefined && value != "") {
        let filter: IFilterCondition = {
          field: f.field,
          value: f.operator == EFilterOprator.Like ? `%${value}%` : value,
          operator: f.operator,
        };
        newFilters.push(filter);
      }
    });

    let filter: IQueryFilter = {
      filterConnect: EFilterConnect.And,
      conditions: newFilters,
    };
    this.queryfileter.filter = filter;
    this.getFunctionPageListAsync();
  }

  @Emit()
  pageChange() {
    this.getFunctionPageListAsync();
  }
  /**
   * 页面加载方法
   */
  private created() {}
  private mounted() {
    this.getFunctionPageListAsync();
  }

  private async getFunctionPageListAsync() {
    await MainManager.Instance()
      .FunctionService.getFunctionPage(this.tranfer(this.queryfileter))
      .then((res) => {
        if (res.success) {
          this.functionTable = res.itemList;
          this.total = res.total;
        }
      });
  }

  //添加
  private async handleAdd() {

    this.FunctionOperateInfo.Show(EOperate.add, async (res: boolean) => {
        await this.getFunctionPageListAsync();
      });
  }
  private CurrentRowEventArray(_selection: any, _row: any) {
    this.CurrentRow = _row;
    this.CurrentSelectionArray = _selection;
    // console.log(_row, _selection);
  }

  private CurrentRowEventCancel(_selection: any, _row: any) {
    this.CurrentRow = _row;
    this.CurrentSelectionArray = _selection;
  }

  //更新
  public async handleUpdate() {
      console.log(this.FunctionOperateInfo);
    let selecteds: any = this.CurrentSelectionArray;
    this.FunctionOperateInfo.getSingleSeletedRow( selecteds, (id: string, row: any) => {
        this.FunctionOperateInfo.Show(
          EOperate.update,
          async (res: boolean) => {
            if (res) {
              await this.getFunctionPageListAsync();
            }
          },
          id,
        );
      })
  }

  public async handleDelete(_id: string) {
    this.delectLoading = true;
    let selecteds: any = this.CurrentSelectionArray;
    this.FunctionOperateInfo.getSingleSeletedRow( selecteds, (id: string, row: any) => {
        MainManager.Instance().FunctionService.deleteFunctionAsync(id).then(async (res:IAjaxResult)=>{

            if (res.success) {
                await this.getFunctionPageListAsync();
                this.$Message.success(res.message);
              } else {
                this.$Message.error(res.message);
              }
              this.delectLoading = false;

        });
      },()=>{

        this.delectLoading = false;
      });
  }
}
