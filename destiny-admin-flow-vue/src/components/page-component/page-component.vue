<template>
  <div class="page-component" style="
    margin-top: 3px;
    text-align: right;
">
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
<style>
.ivu-page-item-active {
  background-color: #0960bd !important;
}
.ivu-page-item-active a,
.ivu-page-item-active:hover a {
  color: white;
}
.ivu-page-next{

  background-color:#f0f2f5!important;
}
.ivu-page-prev{
 background-color:#f0f2f5!important;

}
.ivu-page-item{

   background-color:#f0f2f5;
}
</style>
