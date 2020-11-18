<template>
  <section>
    <div class="body">
      <Row>
        <Collapse v-model="CollapseDefault">
          <Panel name="1">
            查询面板
           <p slot="content" >
                <Form  inline  :label-width="120" :model="dynamicQuery" ref="formInline">
                  <Row> 
                      <Col span="6">
                      <FormItem label="用户名：">
                       <Input  v-model="dynamicQuery.userName"   />
        
                        </FormItem>
                      </Col>
                         <Col span="6">
                      <FormItem label="用户昵称：">
                       <Input  v-model="dynamicQuery.nickName"   />
        
                        </FormItem>
                      </Col>
                       <Col span="6">
                      <FormItem label="是否系统用户：" >
                     <Select  style="width:200px" v-model="dynamicQuery.isSystem" >
                       <Option value="true">是</Option>
                       <Option value="false">否</Option>
                      </Select>
                        </FormItem>
                      </Col>
                   
               
                  </Row>
                    <FormItem >
                          <Button type="primary" @click="search()">查询</Button>
                    </FormItem>
                </Form>
            </p>
          </Panel>
        </Collapse>
      </Row>
      <div>
        <Card :dis-hover="true">
          <Row style="margin: 0px 0px 16px 0px; float: right">
            <Button
              class="operatebutton"
              type="success"
               v-hasPermission="'handleAdd'"

              @click="operateItem(operate.add)"
              >添加</Button
            >
            <Button class="operatebutton"
              icon="md-send"
               type="primary"
                v-hasPermission="'allocationRole'"
              @click="allocationRole()"
              >分配角色</Button
            >
            <Button
              class="operatebutton"
              type="warning"
              @click="operateItem(operate.update)"
               v-hasPermission="'handleUpdate'"
              >修改</Button
            >
            <Button class="operatebutton" type="error" @click="deleteItem()"  v-hasPermission="'handleDelete'"
              >删除</Button
            >
          </Row>
          <Table
            :columns="columns"
            :data="userTable"
            border
            stripe
            @on-select="CurrentRowEventArray"
          >
            <template slot-scope="{ row }" slot="isSystem">
              <Tag v-if="row.isSystem" color="red">是</Tag>
              <Tag v-else color="blue">否</Tag>
            </template>
            <!-- <template slot-scope="{ row }" slot="action">
              <Button
                class="table-button table-button--primary"
                type="primary"
                size="small"
                ghost
                @click="operateItem(operate.view, row.id)"
                >查看</Button
              >
              <Button
                class="table-button table-button--info"
                type="info"
                size="small"
                ghost
                @click="operateItem(operate.update, row.id)"
                >编辑</Button
              >
              <Button
                class="table-button table-button--error"
                type="error"
                size="small"
                ghost
                @click="deleteItem(row)"
                >删除</Button
              >
            </template> -->
          </Table>
        </Card>
      </div>
      <page-component
        ref="PageInfo"
        :total="total"
        @PageChange="pageChange"
      ></page-component>
    </div>
    <user-operate ref="UserOperateInfo"></user-operate>
    <user-allocation-role ref="UserAllocationRoleInfo"></user-allocation-role>
    <delete-dialog ref="DeleteInfo"></delete-dialog>
  </section>
</template>
<script lang="ts" src="./user-managerment.ts"></script>
<style lang="scss" src="./user-managerment.scss" scoped></style>