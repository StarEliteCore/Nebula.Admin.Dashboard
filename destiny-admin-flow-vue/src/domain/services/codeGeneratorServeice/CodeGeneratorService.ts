import "reflect-metadata";

import { CodeGeneratorApi } from "@/domain/config/api";
import { ICodeGeneratorService } from "./ICodeGeneratorService";
import { MainManager } from "../main/main-manager";
import { injectable } from "inversify";

@injectable()
export class CodeGeneratorService implements ICodeGeneratorService {
  GetCSharpTypeToSelectItem(): Promise<any> {
    return MainManager.dataRequest.getRequest(
      CodeGeneratorApi.GetCSharpTypeToSelectItem
    );
  }
}
