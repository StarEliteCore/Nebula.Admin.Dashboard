import { IDestinyCoreServeice } from "@/domain/services/destinycoreserveice/IDestinyCoreServeice";
import { IUserService } from "@/domain/services/userservice/IUserService";
import { inject } from "inversify";
import { IocTypes } from "../diconfig/ioc-types";

export class DestinyCoreBase {
  constructor(
    @inject(IocTypes.DestinyCoreServeice) _destiny: IDestinyCoreServeice
  ) {

  }
}
