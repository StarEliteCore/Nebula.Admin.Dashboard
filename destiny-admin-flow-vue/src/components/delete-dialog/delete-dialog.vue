
<template>
  <div>
    <Modal class="delete-dialog" v-model="IsShow" :title="title">
      <div>确定要删除【{{ info }}】?</div>
      <div slot="footer">
        <Button @click="OnHandleCancel">取消</Button>
        <Button type="error" @click="OnHandleCommit">删除</Button>
      </div>
    </Modal>
  </div>
</template>
<style lang="scss" scoped src="./delete-dialog.scss"></style>
<script lang="ts" src="./delete-dialog.ts"></script>