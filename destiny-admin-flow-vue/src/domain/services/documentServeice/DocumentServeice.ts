import { DocumentApi } from "@/domain/config/api";
import { IAjaxResult } from "@/shared/response";
import { injectable } from "inversify";
import { MainManager } from "../main/main-manager";
import { IDocumentServeice } from "./IDocumentServeice";

@injectable()
export default class DocumentServeice implements IDocumentServeice
{
    LoadForm(_id: string): Promise<IAjaxResult> {
       
        return MainManager.dataRequest.getRequest(DocumentApi.loadForm,{
            id:_id,
        });

    }



}
