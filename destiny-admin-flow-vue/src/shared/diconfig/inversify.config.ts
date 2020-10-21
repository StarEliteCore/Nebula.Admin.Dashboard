import { CodeGeneratorService } from '@/domain/services/codeGeneratorServeice/CodeGeneratorService';
import { Container } from "inversify";
import { ICodeGeneratorService } from '@/domain/services/codeGeneratorServeice/ICodeGeneratorService';
import { IMenuService } from '@/domain/services/menuserveice/IMenuService';
import { IRoleService } from '@/domain/services/roleservice/IRoleService';
import { IUserService } from '@/domain/services/userservice/IUserService';
import { IocTypes } from './ioc-types';
import { MainService } from '@/domain/services/main/main-service';
import MenuService from '@/domain/services/menuserveice/MenuService';
import RoleService from '@/domain/services/roleservice/RoleService';
import UserService from '@/domain/services/userservice/UserService';

const container = new Container();
container.bind<MainService>(IocTypes.MainService).to(MainService)
container.bind<IMenuService>(IocTypes.MenuService).to(MenuService)
container.bind<IUserService>(IocTypes.UserService).to(UserService)
container.bind<ICodeGeneratorService>(IocTypes.CodeGeneratorService).to(CodeGeneratorService)
container.bind<IRoleService>(IocTypes.RoleService).to(RoleService)
export default container;