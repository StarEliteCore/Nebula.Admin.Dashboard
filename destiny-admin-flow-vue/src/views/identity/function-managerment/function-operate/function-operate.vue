<template>
  <div>
    <Modal v-model="IsShow" :title="title" :mask-closable="false">
      <Form
        :model="functionInput"
        :label-width="100"
        :disabled="disabled"
        ref="form"
        :rules="ruleValidate"
      >
        <FormItem label="功能名：" prop="name">
          <Input v-model="functionInput.name" />
        </FormItem>
      <FormItem label="链接Url：" prop="linkUrl">
          <Input v-model="functionInput.linkUrl" />
        </FormItem>
        <FormItem label="是否可用：">
          <i-switch v-model="functionInput.isEnabled" size="large">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
 
        <FormItem label="描述：" prop="description">
          <Input type="textarea" v-model="functionInput.description"  :autosize="{minRows: 5,maxRows: 10}"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button v-if="canEdit" class="dialog-btn" @click="OnHandleCancel"
          >取消</Button
        >
        <Button
          type="primary"
          v-if="canEdit"
          class="dialog-btn--primary"
          @click="OnHandleCommit"
          >保存</Button
        >
        <Button v-if="!canEdit" class="dialog-btn" @click="OnHandleCancel"
          >关闭</Button
        >
      </div>
    </Modal>
  </div>
</template>
<script lang="ts" src="./function-operate.ts"></script>