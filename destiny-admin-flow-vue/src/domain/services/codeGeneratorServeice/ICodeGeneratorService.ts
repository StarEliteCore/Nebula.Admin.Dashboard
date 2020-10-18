import { AjaxResult } from '@/shared/response';
import { IProjectMetadataDto } from '@/domain/entity/codeGenerator/ProjectMetadataDto';

export interface ICodeGeneratorService{
    GetCSharpTypeToSelectItem():Promise<any>;
    generateCode(par:IProjectMetadataDto):Promise<AjaxResult>;
}