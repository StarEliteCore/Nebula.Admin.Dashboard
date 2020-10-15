import { Container } from "inversify";
import { IMenuService } from '@/domain/services/menuserveice/IMenuService';
import { IocTypes } from './ioc-types';
import { MainService } from '@/domain/services/main/main-service';
import MenuService from '@/domain/services/menuserveice/MenuService';
import { IUserService } from '@/domain/services/userservice/IUserService';
import UserService from '@/domain/services/userservice/UserService';

const container = new Container();
container.bind<MainService>(IocTypes.MainService).to(MainService)
container.bind<IMenuService>(IocTypes.MenuService).to(MenuService)
container.bind<IUserService>(IocTypes.UserService).to(UserService)

export default container;