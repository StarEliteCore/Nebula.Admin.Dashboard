export const UserApi = {
  // 分页 + 条件获取用戶列表
  getUserPage: "api/User/GetUserPageAsync",
  /**
   * 添加用户
   */
  CreaterUser: "api/User/CreateAsync",
  /**
   * 获取一个用户
   */
  LoadUser: "api/User/LoadAsync",
  /**
       * 删除一个用户
       */
  DeleteUser: "api/User/DeleteAsync",
  /**
     * 修改用户
     */
  updateUser: "api/User/UpdateAsync",

};


//代码生成器API
export const CodeGeneratorApi = {

  //得到C#类型转成下拉项
  GetCSharpTypeToSelectItem: "api/CodeGenerator/GetCSharpTypeToSelectItem",

  //生成代码
  GenerateCode: "api/CodeGenerator/GenerateCode",
}