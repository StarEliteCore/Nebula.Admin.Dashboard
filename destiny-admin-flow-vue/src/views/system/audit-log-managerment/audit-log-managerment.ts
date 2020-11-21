import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import {
  ControlTypeEnum,
  IFilterCondition,
  IQueryFilter,
  ISearchFilter,
} from "@/shared/request";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";
import {
  IAuditLogOutputPageDto,
  IAuditLogTableDto,
} from "@/domain/entity/auditdto/auditDto";

import { AjaxResultType } from "@/shared/response";
import { AuditApi } from "@/domain/config/api";
import { ComponentMixins } from "@/shared/mixins/component.mixns";
import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { ISelectListItem } from "@/shared/response/selectDto";
import { ITableColumn } from "@/shared/table/ITable";
import { MainManager } from "@/domain/services/main/main-manager";
import TableExpandOperate from "./log-operate/audit-entry-table-expand.vue";
import { UserOutputListDto } from "@/domain/entity/userdto/userDto";

@Component({
  name: "AuditLogManagerment",
  components: {
    TableExpandOperate,
  },
})
export default class AuditLogManagerment extends Mixins(ComponentMixins) {
  pageUrl: string = AuditApi.getAuditLogPage;
  likeValueFormat: string = "{0}";
  private operationType = AjaxResultType;
  private userArray: ISelectListItem[] = [];
  Init() {
    this.request = new PageQuery.PageRequest();
    this.columns = this.GetColumn();
    this.fields = this.GetFields();
    this.mainManager = MainManager.Instance();
    this.destinyCoreServeice = this.mainManager.DestinyCoreServeice;
    this.GetPage();
    this.editModel = this.$refs.editModel as Vue;
    MainManager.Instance()
      .UserService.getSelectAllUser()
      .then((x) => {
        if (x.success)
          (x.data as Array<UserOutputListDto>).forEach(
            (e: UserOutputListDto, i: number) => {
              let item: ISelectListItem = {
                value: e.id,
                label: e.nickName,
              };
              this.userArray.push(item);
            }
          );
      });
  }

  GetColumn() {
    return [
      {
        type: "expand",
        width: 50,
        align: "center",
        render: (h: any, params: any) => {
          return h(TableExpandOperate, {
            props: {
              row: params.row,
            },
          });
        },
      },
      {
        title: "功能名",
        key: "functionName",
        align: "center",
        maxWidth: 150,
      },
      {
        title: "用户名",
        key: "userName",
        align: "center",
        maxWidth: 90,
      },
      {
        title: "昵称",
        key: "nickName",
        align: "center",
        maxWidth: 90,
      },

      {
        title: "Url",
        key: "action",
        align: "center",
      },
      {
        title: "IP地址",
        key: "ip",
        align: "center",
      },
      {
        title: "执行时长",
        key: "executionDuration",
        align: "center",
      },
      {
        title: "浏览器信息",
        key: "browserInformation",
        align: "center",
        tooltip: true,
      },
      {
        title: "类型",
        key: "operationType",
        align: "center",
        slot: "operationType",
      },
      {
        title: "消息",
        key: "message",
        align: "center",
      },
      {
        title: "审计时间",
        key: "createdTime",
        align: "center",
      },
    ];
  }

  GetFields(): ISearchFilter[] {
    return [
      {
        field: "functionName",
        value: "",
        operator: EFilterOprator.Like,
        title: "功能名：",
      },
      {
        field: "action",
        value: "",
        operator: EFilterOprator.Like,
        title: "审计URL：",
      },
      {
        field: "operationType",
        title: "类型",
        operator: EFilterOprator.Equal,
        config: {
          type: ControlTypeEnum.select,

          data: [
            {
              value: AjaxResultType.Info,
              label: "无",
            },
            {
              value: AjaxResultType.Success,
              label: "成功",
            },
            {
              value: AjaxResultType.Error,
              label: "失败",
            },
          ],
        },
      },
      {
        field: "userId",
        title: "操作用户",
        operator: EFilterOprator.Equal,
        config: {
          type: ControlTypeEnum.select,

          data: this.userArray
        },
      },
    ];
  }
}
