import { DocumentTypeApi } from "@/domain/config/api";
import {
  IDocumentTypeOutputPageList,
  DocumentTypeInputDto,
  IDocumentTreeOutDto,
} from "@/domain/entity/documentType/documentTypeDto";
import { IPageRequest } from "@/shared/request";
import { IServerPageReturn, IAjaxResult, IServerReturn } from "@/shared/response";
import { injectable } from "inversify";
import { MainManager } from "../main/main-manager";

import { IDocumentTypeServeice } from "./IDocumentTypeServeice";

@injectable()
export default class DocumentTypeServeice implements IDocumentTypeServeice {
  getDocumentTypePage(
    _page: IPageRequest
  ): Promise<IServerPageReturn<IDocumentTypeOutputPageList[]>> {
    return MainManager.dataRequest.postRequest(DocumentTypeApi.getPage, _page);
  }
  createOrUpdateDocumentType(
    _documentType: DocumentTypeInputDto
  ): Promise<IAjaxResult> {
    return MainManager.dataRequest.postRequest(
      DocumentTypeApi.createOrUpdate,
      _documentType
    );
  }
  deleteDocumentTypeAsync(_id: string): Promise<IAjaxResult> {
    return MainManager.dataRequest.deleteRequest(DocumentTypeApi.delete, _id);
  }
  getDocumentTypeById(_id: string): Promise<IAjaxResult> {
    return MainManager.dataRequest.getRequest(DocumentTypeApi.loadForm, _id);
  }

  getDocumentTypeTreeData(
  ): Promise<IServerReturn<IDocumentTreeOutDto[]>> {
    return MainManager.dataRequest.postRequest(
      DocumentTypeApi.getTreeData,null);
  }
}
