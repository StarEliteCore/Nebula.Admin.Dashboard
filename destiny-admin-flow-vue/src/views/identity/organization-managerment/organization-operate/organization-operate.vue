<template>
  <div>
    <Modal v-model="IsShow" :title="title" :mask-closable="false">
      <Form
        :model="organizationDto"
        :label-width="120"
        :disabled="disabled"
        ref="form"
        :rules="ruleValidate"
      >
        <FormItem label="上级组织架构：" prop="parentId">
          <a-tree-select
            v-model="organizationDto.parentId"
            :tree-data="treeData"
            placeholder="请选择"
            tree-default-expand-all
            :replaceFields="{
              children: 'children',
              title: 'title',
              key: 'key',
              value: 'id',
            }"
            allow-clear
          >
          </a-tree-select>
        </FormItem>
        <FormItem label="名称：" prop="name">
          <Input v-model="organizationDto.name" />
        </FormItem>
        <FormItem label="主管领导：" prop="ladingCadre">
          <Select v-model="organizationDto.ladingCadre">
            <Option :key="item.id" :value="item.id" v-for="item in userArray">{{
              item.userName
            }}</Option>
          </Select>
        </FormItem>
        <FormItem label="分管领导：" prop="firstLeader">
          <Select v-model="organizationDto.firstLeader">
            <Option :key="item.id" :value="item.id" v-for="item in userArray">{{
              item.userName
            }}</Option>
          </Select>
        </FormItem>
      </Form>
      <template v-slot:footer>
        <div>
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
        </div>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts" src="./organization-operate.ts"></script>
<style lang="scss" src="./organization-operate.scss"></style>