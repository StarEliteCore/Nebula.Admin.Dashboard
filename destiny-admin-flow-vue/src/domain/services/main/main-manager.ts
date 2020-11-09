import DataRequest, { IDataRequest } from "@/shared/data-request";

import { ICodeGeneratorService } from "../codeGeneratorServeice/ICodeGeneratorService";
import { IDestinyCoreServeice } from "../destinycoreserveice/IDestinyCoreServeice";
import { IFunctionService } from "../functionservice/IFunctionService";
import { IMenuService } from "../menuserveice/IMenuService";
import { IOrganizationService } from '../organizationservice/IOrganizationService';
import { IRoleService } from "../roleservice/IRoleService";
import { ISystemService } from "../systemservice/ISystemService";
import { IUserService } from "../userservice/IUserService";
import { IocTypes } from "@/shared/diconfig/ioc-types";
import { MainService } from "./main-service";
import container from "@/shared/diconfig/inversify.config";
import request from "@/utils/request";
import { IDataDictionaryService } from '../dataDictionaryServeice/IDataDictionaryService';

export class MainManager {
  //#region  单例
  private static s_instance: MainManager;

  public static dataRequest: IDataRequest;
  static MainManager: MainManager;
  public static Instance(): MainManager {
    typeof this.s_instance === "undefined" &&
      (this.s_instance = new MainManager());
    typeof this.dataRequest === "undefined" &&
      (this.dataRequest = DataRequest.Inst(request));
    return this.s_instance;
  }
  private services: MainService;

  public get MenuService(): IMenuService {
    return this.services.MenuServiceApi;
  }
  public get UserService(): IUserService {
    return this.services.UserServiceApi;
  }

  public get CodeGeneratorService(): ICodeGeneratorService {
    return this.services.CodeGeneratorService;
  }

  public get RoleService(): IRoleService {
    return this.services.RoleService;
  }

  public get FunctionService(): IFunctionService {
    return this.services.FunctionService;
  }

  public get SystemService(): ISystemService {
    return this.services.SystemService;
  }
  public get OrganizationService(): IOrganizationService {
    return this.services.OrganizationService;
  }

  public get DestinyCoreServeice(): IDestinyCoreServeice {
    return this.services.DestinyCoreServeice;
  }

  public get DataDictionarySrevice():IDataDictionaryService{
    return this.services.DataDictionaryService;
  }

  constructor() {
    this.services = container.get<MainService>(IocTypes.MainService);
  }
}
