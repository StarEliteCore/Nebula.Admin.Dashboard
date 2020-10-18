import { IEntityMetadataDto } from './EntityMetadataDto';

/**
 * 项目元数据
 */
export interface IProjectMetadataDto
{
   /**
    * 命名空间
    */
   namespace:string,

   /**
    * 保存文件路径
    */
   saveFilePath:string,

   
   /**
    * 实体元数据
    */
   entityMetadata:IEntityMetadataDto,

    
}
 
