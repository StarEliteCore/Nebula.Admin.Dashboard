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
                      <FormItem label="实体名称：">
                       <Input  v-model="dynamicQuery.entityAllName"   />
        
                        </FormItem>
                      </Col>
                       <Col span="6">
                      <FormItem label="实体显示名称：" >
                             <Input  v-model="dynamicQuery.entityDisplayName"   />
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
        <Table :columns="columns" :data="auditEntryTable" border stripe @on-select-cancel="CurrentRowEventCancel"    @on-select="CurrentRowEventArray" @on-row-click="CurrentRowClick">
            
            <template slot-scope="{ row }" slot="operationType">
              <Tag v-if="row.operationType===0" color="blue">
                 无
              </Tag>
              <Tag v-else-if="row.operationType===1" color="blue">
                 新增
              </Tag>
              <Tag v-else-if="row.operationType===2" color="blue">删除</Tag>
              <Tag v-else-if="row.operationType===3" color="blue">更新</Tag>
            </template>
          </Table>
      
        </Card>
      </div>
        <entry-propert-operate ref="EntryPropertyOperateInfo"></entry-propert-operate>
      <page-component
        ref="PageInfo"
        :total="total"
        @PageChange="pageChange"
      ></page-component>
    </div>
  </section>
</template>

<script lang="ts" src="./audit-entry-managerment.ts"></script>