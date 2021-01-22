<template>
  <div>
    <Modal
      v-model="isOpen"
      :title="editTitle"
      :mask-closable="false"
      :lock-scroll="true"
      :fullscreen="true"
      :scrollable="true"
      :footer-hide="true"
    >
      <Tabs value="name1">
        <TabPane name="name1" label="基本信息">
          <Form :model="editData" ref="form" :label-width="100">
            <FormItem label="实体名：">
              <label>{{ editData.entityAllName }}</label>
            </FormItem>
            <FormItem label="显示名：">
              <label>{{ editData.entityDisplayName }}</label>
            </FormItem>
            <FormItem label="实体编号：">
              <label>{{ editData.keyValues }}</label>
            </FormItem>
            <FormItem label="操作类型：">
              <label>{{ getOerationType(editData.operationType) }}</label>
            </FormItem>
            <FormItem label="昵称：">
              <label>{{ editData.nickName }}</label>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane  id="aa" name="name2" label="属性变更明细">
         <Table border 
              :columns="propertyTableColumn"
              :data="auditPropertyList"
             
            
            >
            </Table>
          <!--        
         <Table 
              :columns="propertyTableColumn"
              :data="auditPropertyList"
              border
              stripe
            
            >
            </Table> -->
          <!-- <div id="ddd">
           <Table
              :columns="propertyTableColumn"
              :data="auditPropertyList"
              border
              stripe
            
            >
            </Table>
        </div> -->

          <!-- <Card style="height: 100%;" :dis-hover="true">
           
          </Card> -->
        </TabPane>
      </Tabs>

      <!-- <div slot="footer">
        <Button class="dialog-btn" @click="close()">关闭</Button>
      </div> -->
    </Modal>
  </div>
</template>

<script lang="ts" src="./audit-entry-view.ts"></script>
<style>
.ivu-modal-fullscreen .ivu-modal-body {
  overflow: hidden !important;
}
</style>
