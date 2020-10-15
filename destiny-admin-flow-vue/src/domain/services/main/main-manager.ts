import DataRequest, { IDataRequest } from '@/shared/data-request';
import container from "@/shared/diconfig/inversify.config"
import { IocTypes } from '@/shared/diconfig/ioc-types';
import { MainService } from './main-service';
import request from "@/utils/request"
import { IMenuService } from '../menuserveice/IMenuService';
import { IUserService } from "../userservice/IUserService";

export class MainManager {
    //#region  单例
    private static s_instance: MainManager;

    public static dataRequest: IDataRequest;
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
    constructor() {
        this.services = container.get<MainService>(IocTypes.MainService);
    }

}
