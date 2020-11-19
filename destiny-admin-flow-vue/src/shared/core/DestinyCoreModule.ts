import { AjaxResultType, IAjaxResult } from "../response";

import { Message as $Message } from "view-design";
import { ApplicationUserManager } from '../config/IdentityServerLogin';

export default class DestinyCoreModule {
  public static ToAjaxResult(
    res: IAjaxResult,
    successCllback?: any,
    errorCllback?: any
  ) {
    let message = res.message;
    let type = res.type;
    let $msg = $Message as any;
    switch (type) {
      case AjaxResultType.Success:
        $msg.success(message);
        if (successCllback) {
          successCllback();
        }
        break;
      case AjaxResultType.Error:
        $msg.error(message);
        if (errorCllback) {
          errorCllback();
        }
        break;
      case AjaxResultType.Uncertified:
        $msg.error("权限不足");
        break;
      case AjaxResultType.Unauthorized:
       
        $msg.error("未经授权");
        break;
    }
  }
}
