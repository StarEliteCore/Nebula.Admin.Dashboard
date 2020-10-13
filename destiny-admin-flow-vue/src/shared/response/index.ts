export interface IServerReturn<T> {
    data: T;
    success: boolean;
    message: string;
    type: number;
}
export interface IServerPageReturn<T> extends IServerReturn<T> {
    total: number;
  }