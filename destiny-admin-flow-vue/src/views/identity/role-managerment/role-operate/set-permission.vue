<template>
  <Modal v-model="IsShow" :title="title" :mask-closable="false">
    <a-tree  checkable :tree-data="data2"/>
  </Modal>
</template>
<script lang="ts" src="./set-permission.ts"></script>
