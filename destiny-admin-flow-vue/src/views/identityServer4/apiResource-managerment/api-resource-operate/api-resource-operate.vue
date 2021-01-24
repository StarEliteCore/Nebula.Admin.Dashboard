<template>
  <Modal
    v-model="isOpen"
    :title="editTitle"
    :mask-closable="false"
    :scrollable="true"
    :lock-scroll="true"
    :fullscreen="true"
  >
    <Form :model="editData" :label-width="100" ref="form">
      <FormItem label="资源名：" prop="name">
        <Input v-model="editData.name" />
      </FormItem>

      <FormItem label="是否启用：">
        <i-switch v-model="editData.enabled" size="large">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </FormItem>
      <FormItem label="资源显示名：">
        <Input v-model="editData.displayName" />
      </FormItem>
      <FormItem label="描述：" prop="description">
        <Input
          type="textarea"
          v-model="editData.description"
          :autosize="{ minRows: 5, maxRows: 10 }"
        />
      </FormItem>
      <FormItem label="用户声明：">
      
      </FormItem>
    </Form>
    <div slot="footer">
      <Button
        type="primary"
        class="dialog-btn--primary"
        @click="onHandleCommit()"
        >保存</Button
      >
      <Button class="dialog-btn" @click="close()">关闭</Button>
    </div>
  </Modal>
</template>
<script lang="ts" src="./api-resource-operate.ts"></script>
