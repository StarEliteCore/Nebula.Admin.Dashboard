export interface IServerReturn<T> {
    data: T;
    success: boolean;
    message: string;
    type: number;
}
export interface IServerPageReturn<T> extends IServerReturn<T> {
    total: number;
  }


  export interface IAjaxResult{

 
    data: any;
    success: boolean|false;
    message: string|"";
    
  }

  
  export class AjaxResult implements IAjaxResult{

    constructor(public  data: any,public success: boolean,public message: string) {
		// ...
	}


    
  }