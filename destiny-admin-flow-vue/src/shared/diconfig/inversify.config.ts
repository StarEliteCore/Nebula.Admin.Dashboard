import { CodeGeneratorService } from '@/domain/services/codeGeneratorServeice/CodeGeneratorService';
import { Container } from "inversify";
import DataDictionaryService from '@/domain/services/dataDictionaryServeice/DataDictionaryService';
import DestinyCoreServeice from '@/domain/services/destinycoreserveice/DestinyCoreServeice';
import FunctionService from '@/domain/services/functionservice/FunctionService';
import { ICodeGeneratorService } from '@/domain/services/codeGeneratorServeice/ICodeGeneratorService';
import { IDataDictionaryService } from '../../domain/services/dataDictionaryServeice/IDataDictionaryService';
import { IDestinyCoreServeice } from '@/domain/services/destinycoreserveice/IDestinyCoreServeice';
import { IFunctionService } from '@/domain/services/functionservice/IFunctionService';
import { IMenuService } from '@/domain/services/menuserveice/IMenuService';
import { IOrganizationService } from '@/domain/services/organizationservice/IOrganizationService';
import { IRoleService } from '@/domain/services/roleservice/IRoleService';
import { ISystemService } from '@/domain/services/systemservice/ISystemService';
import { IUserService } from '@/domain/services/userservice/IUserService';
import { IocTypes } from './ioc-types';
import { MainService } from '@/domain/services/main/main-service';
import MenuService from '@/domain/services/menuserveice/MenuService';
import OrganizationService from '@/domain/services/organizationservice/OrganizationService';
import RoleService from '@/domain/services/roleservice/RoleService';
import SystemService from '@/domain/services/systemservice/SystemService';
import UserService from '@/domain/services/userservice/UserService';

const container = new Container();
container.bind<MainService>(IocTypes.MainService).to(MainService)
container.bind<IMenuService>(IocTypes.MenuService).to(MenuService)
container.bind<IUserService>(IocTypes.UserService).to(UserService)
container.bind<ICodeGeneratorService>(IocTypes.CodeGeneratorService).to(CodeGeneratorService)
container.bind<IRoleService>(IocTypes.RoleService).to(RoleService)
container.bind<IFunctionService>(IocTypes.FunctionService).to(FunctionService)
container.bind<ISystemService>(IocTypes.SystemService).to(SystemService);
container.bind<IDataDictionaryService>(IocTypes.DataDictionaryService).to(DataDictionaryService)
container.bind<IOrganizationService>(IocTypes.OrganizationService).to(OrganizationService);
container.bind<IDestinyCoreServeice>(IocTypes.DestinyCoreServeice).to(DestinyCoreServeice)
export default container;