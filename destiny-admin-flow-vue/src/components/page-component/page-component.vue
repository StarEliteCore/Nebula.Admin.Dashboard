<template>
    <div class="page-component">
    <Button
      class="page--jump page--jump__left"
      size="small"
      @click="PaginationHandle.OnHandleFirst(1)"
      >首页</Button
    >
    <Page
      class-name="page-component_content"
      :total="PaginationHandle.Pagination.total"
      :page-size="PaginationHandle.Pagination.pageSize"
      :current="PaginationHandle.Pagination.pageIndex"
      size="small"
      show-elevator
      show-total
      show-sizer
      @on-change="PaginationHandle.OnCurrentChangeSelf"
      @on-page-size-change="PaginationHandle.OnHandleSizeChangeSelf"
    >
      <span>
        共{{ PaginationHandle.Pagination.pageTotal }}页,{{
          PaginationHandle.Pagination.total
        }}条
      </span>
    </Page>
    <Button
      class="page--jump page--jump__right"
      :disabled="ButtonDisable"
      size="small"
      @click="
        PaginationHandle.OnHandleLast(PaginationHandle.Pagination.pageTotal)
      "
      >尾页</Button
    >
  </div>
</template>
<script lang="ts" src="./page-component.ts"></script>
<style lang="scss" src="./page-component.scss" scoped></style>
