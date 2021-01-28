<template>
  <Modal
    v-model="IsShow"
    :title="title"
    :mask-closable="false"
    :scrollable="true"
    :lock-scroll="true"
    :fullscreen="true"
  >
  <Form
        :model="client"
        :label-width="100"
        :disabled="disabled"
        ref="form"
        :rules="ruleValidate"
      >
        <FormItem label="客户端Id：" prop="clientId">
          <Input v-model="client.clientId" />
        </FormItem>
        <FormItem label="客户端名称：" prop="clientName">
          <Input v-model="client.clientName" />
        </FormItem>
        <FormItem label="选择授权类型：" prop="allowedGrantTypes">
          <Select v-model="client.allowedGrantTypes" multiple style="width: 260px">
          <Option :value="item.value" :key="item.value" v-for=" item in grantTypes">{{item.text}}</Option>
          </Select>
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
</template>

<script lang="ts" src="./client-operate.ts"></script>