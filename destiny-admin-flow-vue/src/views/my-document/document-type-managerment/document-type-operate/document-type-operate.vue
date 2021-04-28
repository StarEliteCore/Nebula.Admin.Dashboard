<template>
  <div>
    <Modal
      v-model="visible"
      :title="editTitle"
      :mask-closable="false"
      :scrollable="true"
      :lock-scroll="true"
       @on-ok="save"
    >
      <Card title="基本信息" style="width: 100%;" :dis-hover="true">
        <Form ref="formInline" :label-width="80" :model="editModel">
          <FormItem label="上一级:">
            <a-tree-select
              style="z-index: 3000"
              v-model="editModel.parentId"
              :tree-data="treeData"
              placeholder="请选择"
              tree-default-expand-all
              :replaceFields="{
                children: 'children',
                title: 'name',
                key: 'id',
                value: 'id',
              }"
              allow-clear
            >
            </a-tree-select>
          </FormItem>
          <FormItem label="名字:"> <Input v-model="editModel.name"/></FormItem>

          <FormItem label="排序:">
            <InputNumber
              controls-outside
              size="default"
              style="width: 100%"
              :min="0"
              v-model="editModel.sort"
            />
          </FormItem>
          <FormItem label="描述:">
            <Input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10 }"
              v-model="editModel.description"
            />
          </FormItem>
        </Form>
      </Card>
    </Modal>
  </div>
</template>
<script lang="ts" src="./document-type-operate.ts"></script>
<style>
.ivu-card-head {
  background-color: #2d8cf0;
  border: 1px solid #2d8cf0 !important;
}
</style>
