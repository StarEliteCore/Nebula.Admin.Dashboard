import { DocumentTypeInputDto, IDocumentTreeOutDto, IDocumentTypeOutputPageList } from "@/domain/entity/documentType/documentTypeDto";
import { IPageRequest } from "@/shared/request";
import { IAjaxResult, IServerPageReturn, IServerReturn } from "@/shared/response";

export interface IDocumentTypeServeice{


     /**
     * 分页获取
     * @param _page 
     */
      getDocumentTypePage(_page: IPageRequest): Promise<IServerPageReturn<IDocumentTypeOutputPageList[]>>;
      /**
       * 添加或者文档类型
       * @param _documentType 
       */ 
      createOrUpdateDocumentType(_documentType: DocumentTypeInputDto): Promise<IAjaxResult>;
  
      /**
       * 删除文档类型
       * @param _id 
       */
      deleteDocumentTypeAsync(_id: string): Promise<IAjaxResult>;
  
  
      /**
       * 加载文档类型
       * @param _id 
       */
      getDocumentTypeById(_id: string): Promise<IAjaxResult>;

   
      /**
       * 得到树文档类型数据
       * @param _page 
       */
      getDocumentTypeTreeData(): Promise<IServerReturn<IDocumentTreeOutDto[]>>;
}