import {
  ICreatedTime,
  IDescription,
  IEntity,
  ILastModifionTime,
} from "@/shared/baseentity/IEntity";
import { Guid } from "guid-typescript";

/**
 * 文档类型DTO
 */
export interface IDocumentTypeBaseDto extends IEntity<string>, IDescription {
  name: string;
  /**
   * 父级菜单ID
   */
  parentId: string;

  sort: number;
}

export interface IDocumentTypeInputDto extends IDocumentTypeBaseDto {}

export class DocumentTypeInputDto implements IDocumentTypeInputDto {
  sort = 0;
  parentId = "";
  description = "";

  id = Guid.EMPTY;
  name = "";
}

export interface IDocumentTypeOutputDto extends IDocumentTypeBaseDto {}

export class DocumentTypeOutputDto extends DocumentTypeInputDto {}

export interface IDocumentTypeOutputPageList
  extends IDocumentTypeBaseDto,
    ICreatedTime,
    ILastModifionTime {}

export interface IDocumentTypeTableDto extends IDocumentTypeOutputPageList {}

export interface IDocumentTreeOutDto extends IEntity<string> {
  name: string;
  /**
   * 父级菜单ID
   */
  parentId: string;

  /**
   * 排序
   */
  sort: number;
}
