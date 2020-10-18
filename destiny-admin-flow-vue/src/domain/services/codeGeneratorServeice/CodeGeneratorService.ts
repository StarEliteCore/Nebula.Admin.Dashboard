import "reflect-metadata";

import { AjaxResult } from "@/shared/response";
import { CodeGeneratorApi } from "@/domain/config/api";
import { ICodeGeneratorService } from "./ICodeGeneratorService";
import { IProjectMetadataDto } from "@/domain/entity/codeGenerator/ProjectMetadataDto";
import { MainManager } from "../main/main-manager";
import { injectable } from "inversify";

@injectable()
export class CodeGeneratorService implements ICodeGeneratorService {
  generateCode(par: IProjectMetadataDto): Promise<AjaxResult> {
    return MainManager.dataRequest.postRequest(CodeGeneratorApi.GenerateCode, par);
  }
  GetCSharpTypeToSelectItem(): Promise<any> {
    return MainManager.dataRequest.getRequest(
      CodeGeneratorApi.GetCSharpTypeToSelectItem
    );
  }
}
