import { CodeGeneratorService } from '@/domain/services/codeGeneratorServeice/CodeGeneratorService';
import { Container } from "inversify";
import FunctionService from '@/domain/services/functionservice/FunctionService';
import { ICodeGeneratorService } from '@/domain/services/codeGeneratorServeice/ICodeGeneratorService';
import { IFunctionService } from '@/domain/services/functionservice/IFunctionService';
import { IMenuService } from '@/domain/services/menuserveice/IMenuService';
import { IRoleService } from '@/domain/services/roleservice/IRoleService';
import { ISystemService } from '@/domain/services/systemservice/ISystemService';
import { IUserService } from '@/domain/services/userservice/IUserService';
import { IocTypes } from './ioc-types';
import { MainService } from '@/domain/services/main/main-service';
import MenuService from '@/domain/services/menuserveice/MenuService';
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
export default container;