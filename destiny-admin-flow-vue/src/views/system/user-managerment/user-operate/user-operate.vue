<template>
  <div>
    <Modal v-model="IsShow" :title="title" :mask-closable="false" >
      <Form :model="userInput" :label-width="100" :disabled="disabled">
        <FormItem label="用户名：" prop="userName">
          <Input v-model="userInput.userName" />
        </FormItem>
        <FormItem label="描述：">
          <Input type="textarea" v-model="userInput.memo" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button v-show="canEdit" class="dialog-btn">取消</Button>
        <Button
          type="primary"
          v-show="canEdit"
          class="dialog-btn--primary"
          >保存</Button
        >
        <Button v-show="!canEdit" class="dialog-btn">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<style lang="scss" src="./user-operate.scss" scoped></style>
<script lang="ts" src="./user-operate.ts"></script>
