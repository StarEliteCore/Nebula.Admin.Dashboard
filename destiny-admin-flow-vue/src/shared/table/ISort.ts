import { ESort } from "../request/query.enum";

//自定义排序对象
export interface ISort {
  sort: boolean; //是否排序
  direction: ESort; //排序方式
}



//查询
export interface IQuery {}
