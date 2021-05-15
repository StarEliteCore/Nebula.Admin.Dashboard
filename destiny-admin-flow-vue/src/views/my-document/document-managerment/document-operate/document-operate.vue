<template>
  <div>
    <Modal
      v-model="isOpen"
      :title="editTitle"
      :mask-closable="false"
      :scrollable="true"
      :lock-scroll="true"
      :fullscreen="true"
    >
      <Form
        :model="editData"
        :label-width="100"
        ref="form"
        :rules="ruleValidate"
      >
        <FormItem label="标题：" prop="title">
          <Input v-model="editData.title" />
        </FormItem>
        <FormItem label="文档类型:" prop="documentTypeId">
          <a-tree-select
            style="z-index: 3000"
            v-model="editData.documentTypeId"
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

        <FormItem label="内容：" prop="content">
          <editor
            v-model="editData.content"
            api-key="no-api-key"
            :init="editConfig"
            
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          type="primary"
          class="dialog-btn--primary"
          @click="onHandleCommit()"
          >保存</Button
        >
        <Button class="dialog-btn" @click="close()">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts" src="./document-operate.ts"></script>
