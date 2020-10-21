<template>
  <div>
    <Modal v-model="IsShow" :title="title" :mask-closable="false">
      <Form
        :model="userInput"
        :label-width="100"
        :disabled="disabled"
        ref="form"
        :rules="ruleValidate"
      >
        <FormItem label="用户名：" prop="userName">
          <Input v-model="userInput.userName" />
        </FormItem>
        <FormItem label="用户昵称：" prop="nickName">
          <Input v-model="userInput.nickName" />
        </FormItem>
        <FormItem v-if="IsShowColumn" label="密码：" prop="passwordHash">
          <Input v-model="userInput.passwordHash" />
        </FormItem>
        <FormItem label="性别：" prop="sex">
          <Select v-model="userInput.sex">
            <Option v-for="item in SexSelectOptions" :value="item.key" :key="item.key">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="选择角色：" prop="roleIds">
          <Select v-model="userInput.roleIds" multiple style="width: 260px">
          </Select>
        </FormItem>
        <FormItem label="是否是系统用户：">
          <i-switch v-model="userInput.isSystem" size="large">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="描述：" prop="description">
          <Input type="textarea" v-model="userInput.description" />
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
<style lang="scss" src="./user-operate.scss" scoped></style>
<script lang="ts" src="./user-operate.ts"></script>
