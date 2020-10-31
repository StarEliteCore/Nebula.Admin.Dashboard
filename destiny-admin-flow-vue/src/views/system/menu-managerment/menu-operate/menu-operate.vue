<template>
  <Modal v-model="IsShow" :title="title" :mask-closable="false">
    <Form
      :model="menuDto"
      :label-width="100"
      :disabled="disabled"
      ref="form"
      :rules="ruleValidate"
    >
      <FormItem label="菜单名称：" prop="name">
        <Input v-model="menuDto.name" />
      </FormItem>
      <FormItem label="排序：" prop="sort">
        <Input v-model="menuDto.sort" />
      </FormItem>
      <FormItem label="组件地址(前端)：" prop="path">
        <Input v-model="menuDto.path" />
      </FormItem>
      <FormItem label="父级菜单ID：" prop="parentId">
        <Input v-model="menuDto.parentId" />
      </FormItem>
      <FormItem label="组件地址：" prop="component">
        <Input v-model="menuDto.component" />
      </FormItem>
      <FormItem label="菜单图标：" prop="icon">
        <Input v-model="menuDto.icon" />
      </FormItem>
      <FormItem label="描述：" prop="description">
        <Input v-model="menuDto.description" />
      </FormItem>
      <FormItem label="当前菜单以上所有的父级：" prop="parentNumber">
        <Input v-model="menuDto.parentNumber" />
      </FormItem>
      <FormItem label="深度：" prop="depth">
        <Input v-model="menuDto.depth" />
      </FormItem>
      <FormItem label="类型：" prop="type">
        <Input v-model="menuDto.type" />
      </FormItem>
    </Form>
  </Modal>
</template>

<script lang="ts" src="./menu-operate.ts"></script>
<style lang="scss" src="./menu-operate.scss" scoped></style>