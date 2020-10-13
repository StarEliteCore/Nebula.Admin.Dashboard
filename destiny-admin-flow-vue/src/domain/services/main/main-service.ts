// IoC
import { IocTypes } from '@/shared/diconfig/ioc-types';
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IMenuService } from '../menuserveice/IMenuService';
export class MainService
{
    private _menuserverceApi:IMenuService
    public get MenuServiceApi():IMenuService{
        return this._menuserverceApi;
    }
    constructor(@inject(IocTypes.MenuService) _menu: IMenuService){
        this._menuserverceApi=_menu;
    }
}