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
                       <Input  v-model="dynamicQuery.functionName"   />
        
                        </FormItem>
                      </Col>
                       <Col span="6">
                      <FormItem label="审计Url：" >
                             <Input  v-model="dynamicQuery.action"   />
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
        <Table :columns="columns" :data="auditLogTable" border stripe @on-select-cancel="CurrentRowEventCancel"    @on-select="CurrentRowEventArray">
            <!-- <template slot-scope="{ row }" slot="expand">
              <table-expand-operate :row="row"></table-expand-operate>
            </template> -->
        
          </Table>
      
        </Card>
      </div>
        <!-- <table-expand-operate ref="TableExpandOperateInfo"></table-expand-operate> -->
      <page-component
        ref="PageInfo"
        :total="total"
        @PageChange="pageChange"
      ></page-component>
    </div>
  </section>
</template>

<script lang="ts" src="./audit-log-managerment.ts"></script>