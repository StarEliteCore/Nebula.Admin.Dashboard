// IoC
import { IocTypes } from '@/shared/diconfig/ioc-types';
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IMenuService } from '../menuserveice/IMenuService';
import { IUserService } from '../userservice/IUserService';
@injectable()
export class MainService
{
    private _menuserverceApi:IMenuService;
    private _userserverceApi:IUserService;
    public get MenuServiceApi():IMenuService{
        return this._menuserverceApi;
    }
    public get UserServiceApi():IUserService{
        return this._userserverceApi;
    }
    constructor(
        @inject(IocTypes.MenuService) _menu: IMenuService,
        @inject(IocTypes.UserService) _user: IUserService){
        this._menuserverceApi=_menu;
        this._userserverceApi=_user;
    }
}