<template>
  <section>
    <div class="body">
      <Row>
        <Collapse>
          <Panel name="1">
            查询面板
            <p slot="content" >
                <Form  inline  :label-width="120" :model="dynamicQuery" ref="formInline">
                  <Row> 
                      <Col span="6">
                      <FormItem label="功能名：">
                       <Input  v-model="dynamicQuery.name"   />
        
                        </FormItem>
                      </Col>
                       <Col span="6">
                      <FormItem label="链接Url：" >
                             <Input  v-model="dynamicQuery.linkurl"   />
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

            <Button class="operatebutton" type="warning" @click="handleUpdate()">修改</Button>
            <Button class="operatebutton" type="error" :loading="delectLoading" @click="handleDelete()">删除</Button>
          </Row>
          <Table :columns="columns" :data="functionTable" border stripe @on-select-cancel="CurrentRowEventCancel"    @on-select="CurrentRowEventArray">
            <template slot-scope="{ row }" slot="isEnabled">
              <Tag v-if="row.isEnabled" color="red">是</Tag>
              <Tag v-else color="blue">否</Tag>
            </template>
        
          </Table>
        </Card>
      </div>
      <function-operate ref="FunctionOperateInfo"></function-operate>
      <page-component
        ref="PageInfo"
        :total="total"
        @PageChange="pageChange"
      ></page-component>
    </div>
  </section>
</template>

<script lang="ts" src="./function-managerment.ts"></script>