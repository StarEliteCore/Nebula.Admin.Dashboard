<template>

    <Card style="width: 100%" :dis-hover="true">
   
       <Row style="padding: 5px">
        <Card :bordered="true" :dis-hover="true">
          <p slot="title">实体信息</p>
        <Form  :model="entityFormItem" ref="entityFormItem" :rules="entityRuleValidate" :label-width="150"  >
          <Row> 
            <Col span="12">
              <FormItem label="实体名：" prop="entityName" >
                  <Input v-model="entityFormItem.entityName"  />
        
              </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="显示名：" prop="displayName" >
                <Input v-model="entityFormItem.displayName" />
              </FormItem>
            </Col>
          </Row>
           
          <Row>
            <Col span="12">
              <FormItem label="是否生成Dto：">
                <i-switch size="large" v-model="entityFormItem.isGeneratorDto" >
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="是否自动映射Dto："  >
                <i-switch size="large" v-model="entityFormItem.isAutoMap">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="是否创建：" >
                <i-switch size="large" v-model="entityFormItem.isCreation">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="是否修改：">
                <i-switch size="large" v-model="entityFormItem.isModification">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="是否软删除：">
                <i-switch size="large" v-model="entityFormItem.isSoftDelete">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col span="12">
            
              <FormItem label="审核用户键类型："  prop="auditedUserKeyType"  :rules="{required: (entityFormItem.isModification||entityFormItem.isCreation?true:false), message:'请选择审核用户键类型！！！', trigger: 'blur'}">
                <Select style="width: 260px" v-model="entityFormItem.auditedUserKeyType">
                  <Option value="Guid">Guid</Option>
                  <Option value="string">String</Option>
                  <Option value="int">Int</Option>
                </Select>
              </FormItem>
          
             </Col>
         
          </Row>
          <Row>
             <Col span="12">
              <FormItem label="主键类型："  prop="primaryKeyType">
                <Select style="width: 260px" v-model="entityFormItem.primaryKeyType">
                  <Option value="Guid">Guid</Option>
                  <Option value="string">String</Option>
                  <Option value="int">Int</Option>
                </Select>
              </FormItem>
          
             </Col>
          </Row>
         </Form>
        </Card>
      </Row>
 
      <Row style="padding: 5px;">
        <Card :bordered="true" :dis-hover="true">
          <p slot="title">实体属性</p>
          <Button type="primary" long slot="extra" @click="AddProperty" icon="md-add">添加</Button>
          <Table border stripe max-height="210" :columns="columns" :data="PropertyArr">
         <template slot-scope="{ row }" slot="isNullable">
            <strong>{{ (row.isNullable?"是":"否") }}</strong>
          </template>
          <template slot-scope="{ row }" slot="isInputDto">
            <strong>{{ (row.isInputDto?"是":"否") }}</strong>
          </template>
           <template slot-scope="{ row }" slot="isOutputDto">
            <strong>{{ (row.isOutputDto?"是":"否") }}</strong>
          </template>
           <template slot-scope="{ row }" slot="isPageDto">
            <strong>{{ (row.isPageDto?"是":"否") }}</strong>
          </template>
           <template slot-scope="{ row, index }" slot="op">
               <Button type="error" @click="remove(row, index)">删除</Button>
          </template>

          </Table>
          <!-- <Table border stripe max-height="500" :columns="columns" :data="PropertyArr">
             <template slot-scope="{ row, index }" slot="PropertyName">
                   <Input v-model="row.propertyName" @on-change="updatePropertyName(row, index)"/>       
            </template>
             <template slot-scope="{ row, index }" slot="DisplayName">
                   <Input v-model="row.displayName" @on-change="updateDisplayName(row, index)" />     
            </template>
            <template slot-scope="{ row, index }" slot="IsNullable">
                 <i-switch v-model="row.isNullable" @on-change="updateIsNullable(row, index)">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
            </template>
            <template slot-scope="{ row, index }" slot="CSharpType">
            <Select  @on-change="updateCSharpType(row, index)">
                  <Option v-for="item in cSharpTypeList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                
                </Select>
            </template>
            <template slot-scope="{ row, index }" slot="IsInputDto">
                <i-switch v-model="row.isInputDto" @on-change="updateIsInputDto(row, index)">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
                 
            </template>
             <template slot-scope="{ row, index }" slot="IsOutputDto">

                <i-switch v-model="row.isOutputDto" @on-change="updateIsOutputDto(row, index)">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
                
            </template>
            <template slot-scope="{ row, index }" slot="IsPageDto">
               <i-switch v-model="row.isPageDto" @on-change="updateIsPageDto(row, index)">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
            </template>

             <template slot-scope="{ row, index }" slot="Op">
                 <Button type="error" @click="remove(row, index)">删除</Button>
             </template>
          </Table> -->

      
        </Card>
      </Row>
      
     <Row style="padding: 5px;">
         <Card :bordered="true" :dis-hover="true">
              <p slot="title">项目信息</p>
              <Form :model="projectFormItem"   :label-width="120" ref="projectFormItem" :rules="projectRuleValidate">
                <FormItem label="命名空间" prop="namespace">
                  <Input v-model="projectFormItem.namespace" />
                 </FormItem>
                 <FormItem label="保存文件路径" prop="saveFilePath">
                  <Input v-model="projectFormItem.saveFilePath" />
                 </FormItem>
                 <FormItem >
                    <Button type="primary" v-hasPermission="'save'" @click="save()">保存</Button>
                 </FormItem>
              </Form>
      
        </Card>

      </Row>
     <Modal v-model="IsAddPropertyModal" fullscreen title="实体属性"  footer-hide>
    
     <Form :model="formItem"  :label-width="80" :rules="ruleValidate" ref="formItem">
        <FormItem label="属性名:"  prop="propertyName">
            <Input v-model="formItem.propertyName" />
        </FormItem>
       <FormItem label="显示名:" prop="displayName">
            <Input v-model="formItem.displayName" />
       </FormItem>
      <FormItem label="是否可空:">
             <i-switch v-model="formItem.isNullable">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
               </i-switch>
       </FormItem>
       <FormItem label="C#类型:" prop="cSharpType">
          <Select filterable   v-model="formItem.cSharpType" >
          <Option v-for="item in cSharpTypeList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
          </Select>
       </FormItem>
        <FormItem label="是否生成输入DTO:">
            <i-switch v-model="formItem.isInputDto">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
             </i-switch>
       </FormItem>
       <FormItem label="是否生成输出DTO:">
            <i-switch v-model="formItem.isOutputDto">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
             </i-switch>
       </FormItem>
         <FormItem label="是否生成分页DTO:">
            <i-switch v-model="formItem.isPageDto">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
             </i-switch>
       </FormItem>
        <FormItem label="复杂类型:">
            <Select v-model="formItem.aggregateType">
              <Option value="[]">数组[]</Option>
              <Option value="List">集合List</Option>
              <Option value="ICollection">集合ICollection</Option>
              <Option value="IEnumerable">枚举IEnumerable</Option>
              
           </Select>
       </FormItem>
        <FormItem>
            <Button type="primary" @click="ok">提交</Button>
            <Button style="margin-left: 8px" @click="cancel">取消</Button>
        </FormItem>
    </Form>
    </Modal>
  
    </Card>



</template>
 
<script lang="ts" src="./code-generator.ts"></script>