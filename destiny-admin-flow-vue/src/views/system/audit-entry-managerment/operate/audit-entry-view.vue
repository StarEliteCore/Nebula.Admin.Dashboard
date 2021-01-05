<template>
  <div>
    <Modal
      v-model="isOpen"
      :title="editTitle"
      :mask-closable="false"
      :lock-scroll="true"
      :fullscreen="true"
    >
      <Tabs value="name1">
        <TabPane name="name1" label="基本信息">
          <Form :model="editData" ref="form" :label-width="100" >
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
          </Form></TabPane
        >
         <TabPane name="name2" label="属性变更明细">
      
      
        </TabPane>
      </Tabs>
      <!-- <Form :model="editData" ref="form" :label-width="100" >
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
      </Form> -->
      <div slot="footer">
        <Button class="dialog-btn" @click="close()">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts" src="./audit-entry-view.ts"></script>
