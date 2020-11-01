<template>
  <Modal v-model="IsShow" :title="title" :mask-closable="false">
    <Form
      :model="menuDto"
      :label-width="100"
      :disabled="disabled"
      ref="form"
      :rules="ruleValidate"
    >
      <FormItem label="上级菜单：" prop="parentId">
        <a-tree-select
          v-model="menuDto.parentId"
          :tree-data="treeData"
          placeholder="请选择"
          tree-default-expand-all
          :replaceFields="{children:'children', title:'title', key:'key', value: 'id' }"
        >
        </a-tree-select>
      </FormItem>
      <FormItem label="类型：" prop="type">
        <Select v-model="menuDto.type">
          <Option
            v-for="item in enumSelectOptions"
            :value="item.key"
            :key="item.key"
            >{{ item.label }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="菜单名称：" prop="name">
        <Input v-model="menuDto.name" />
      </FormItem>
      <FormItem label="路由地址：" prop="path">
        <Input v-model="menuDto.path" />
      </FormItem>
      <FormItem label="组件地址：" prop="component">
        <Input v-model="menuDto.component" />
      </FormItem>
      <FormItem label="菜单图标：" prop="icon">
        <Input v-model="menuDto.icon" />
      </FormItem>
      <FormItem label="排序：" prop="sort">
        <Input v-model="menuDto.sort" />
      </FormItem>
      <FormItem label="描述：" prop="description">
        <Input
          v-model="menuDto.description"
          maxlength="255"
          show-word-limit
          type="textarea"
          placeholder=""
        />
      </FormItem>
    </Form>
  </Modal>
</template>

<script lang="ts" src="./menu-operate.ts"></script>
<style lang="scss" src="./menu-operate.scss" scoped></style>