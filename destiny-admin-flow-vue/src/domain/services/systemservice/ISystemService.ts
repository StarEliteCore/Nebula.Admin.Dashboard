import { IAjaxResult, IServerPageReturn } from '@/shared/response';
import { IAuditEntryOutputPageDto, IAuditEntryPropertyOutputPageDto, IAuditLogOutputPageDto } from '@/domain/entity/auditdto/auditDto';

import { IPageRequest } from '@/shared/request';

/**
 * 审计服务层接口定义(因为AuditService报错，所以无法使用这个名字。)
 */
export interface ISystemService {
    /**
     * 分页获取
     * @param _page 
     */
    getAuditLogPage(_page: IPageRequest): Promise<IServerPageReturn<IAuditLogOutputPageDto[]>>;

     /**
     * 得到数据审计分页
     * @param _page 
     */
    getAuditEntryPage(_page:IPageRequest):Promise<IServerPageReturn<IAuditEntryOutputPageDto[]>>;

    
     /**
     * 得到数据属性分页
     * @param _page 
     */
    getAuditEntryPropertyPage(_page:IPageRequest):Promise<IServerPageReturn<IAuditEntryPropertyOutputPageDto[]>>;
}