import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "../request/query.enum";
import { IFilterCondition, IQueryFilter, ISearchFilter } from "../request";

@Component({
  name: "MySearch",
  components: {},
})
export default class MySearch extends Vue {
  @Prop()
  fields!: ISearchFilter[];

  @Prop({ default: "%{0}%" })
  likeValueFormat!: string;
  
  private searchForm: any;
  public filters!: IQueryFilter;
  public onSearch = (): void => {
    let newFilters: IFilterCondition[] = [];
    let $this = this;

    this.fields.forEach((f, index) => {
      let value = f.value;
      if (value != undefined && value != "") {
        let operator =
          f.operator == undefined ? EFilterOprator.Like : f.operator;
        let filter: IFilterCondition = {
          field: f.field,
          value:
            operator == EFilterOprator.Like
              ? `${this.likeValueFormat.replaceAll("{0}", value as string)}`
              : value,
          operator: operator,
        };
        newFilters.push(filter);
      }
    });

    let filter: IQueryFilter = {
      filterConnect: EFilterConnect.And,
      conditions: newFilters,
    };
    this.filters = filter;
    this.$emit("click", filter);
  };

  private setEmptyValue = (): void => {
    this.fields.forEach((e, i) => {
      e.value = undefined;
    });
  };

  public handleReset = (): void => {
    this.setEmptyValue();
  };
}
