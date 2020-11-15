<template>
  <div>
    <Modal v-model="isOpen" :title="editTitle" :mask-closable="false">
      <Form
        :model="editData"
        :label-width="100"
    
        ref="form"
        :rules="ruleValidate"
      >
        <FormItem label="角色名：" prop="name">
          <Input v-model="editData.name" />
        </FormItem>

        <FormItem label="是否管理员：">
          <i-switch v-model="editData.isAdmin" size="large">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="描述：" prop="description">
          <Input
            type="textarea"
            v-model="editData.description"
            :autosize="{ minRows: 5, maxRows: 10 }"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" class="dialog-btn--primary" @click="onHandleCommit()" >保存</Button
        >
        <Button class="dialog-btn" @click="close()" >关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts" src="./role-operate.ts"></script>
<style scoped>
   .operatebutton{
     margin-right: 5px;
    
   }
</style>
