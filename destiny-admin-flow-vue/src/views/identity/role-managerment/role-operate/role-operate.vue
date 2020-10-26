<template>
  <div>
    <Modal v-model="IsShow" :title="title" :mask-closable="false">
      <Form
        :model="roleInput"
        :label-width="100"
        :disabled="disabled"
        ref="form"
        :rules="ruleValidate"
      >
        <FormItem label="角色名：" prop="name">
          <Input v-model="roleInput.name" />
        </FormItem>

        <FormItem label="是否管理员：">
          <i-switch v-model="roleInput.isAdmin" size="large">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="描述：" prop="description">
          <Input type="textarea" v-model="roleInput.description" />
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
<script lang="ts" src="./role-operate.ts"></script>