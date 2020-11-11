<template>
  <Modal v-model="isOpen" :title="editTitle" :mask-closable="false"    >

      <a-tree
        v-if="treeData && treeData.length > 0"
        showLine
        v-model="checkedKeys"
        :auto-expand-parent="autoExpandParent"
        checkable
        :tree-data="treeData"
        :checkStrictly="true"
        :defaultExpandAll="true"
        :defaultExpandParent="true"
      >
        
      </a-tree>
    <div slot="footer">
      <Button type="primary" class="dialog-btn--primary" :loading="loading" @click="onHandleCommit"
        >保存</Button
      >
      <Button class="dialog-btn" @click="close">关闭</Button>
    </div>
  </Modal>
</template>
<script lang="ts" src="./set-permission.ts"></script>
