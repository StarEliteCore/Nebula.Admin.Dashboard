<template>
  <section class="box">
    <div class="body">
     
      <Row>
        <Collapse>
          <Panel name="1">
            查询面板
            <p slot="content" >
                <Form  inline  :label-width="120" :model="dynamicQuery" ref="formInline">
                  <Row> 
                      <Col span="6">
                      <FormItem label="角色名：">
                       <Input  v-model="dynamicQuery.name"   />
        
                        </FormItem>
                      </Col>
                       <Col span="6">
                      <FormItem label="是否管理员：" >
                     <Select  style="width:200px" v-model="dynamicQuery.isAdmin" >
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
            <Button class="operatebutton" type="success" @click="handleAdd()">添加</Button>

            <Button class="operatebutton" type="warning">修改</Button>
            <Button class="operatebutton" type="error">删除</Button>
          </Row>
          <Table :columns="columns" :data="roleTable" border stripe>
            <template slot-scope="{ row }" slot="isAdmin">
              <Tag v-if="row.isAdmin" color="red">是</Tag>
              <Tag v-else color="blue">否</Tag>
            </template>
            <template  slot="action">
              <Button
                class="table-button table-button--primary"
                type="primary"
                size="small"
                ghost
                >查看</Button
              >
              <Button
                class="table-button table-button--info"
                type="info"
                size="small"
                ghost
                >编辑</Button
              >
              <Button
                class="table-button table-button--error"
                type="error"
                size="small"
                ghost
                >删除</Button
              >
            </template>
          </Table>
        </Card>
      </div>
      <role-operate ref="RoleOperateInfo"></role-operate>
      <page-component
        ref="PageInfo"
        :total="total"
        @PageChange="pageChange"
      ></page-component>
    </div>
  </section>
</template>

<script lang="ts" src="./role-managerment.ts"></script>
