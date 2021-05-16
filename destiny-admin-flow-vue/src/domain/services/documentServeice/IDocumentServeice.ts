import { IAjaxResult } from "@/shared/response";

export interface IDocumentServeice{


    ///加载表单
    LoadForm(_id: string): Promise<IAjaxResult>;

}