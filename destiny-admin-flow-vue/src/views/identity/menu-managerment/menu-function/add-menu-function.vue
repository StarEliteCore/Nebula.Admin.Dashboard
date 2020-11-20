<template>
  <Modal v-model="isShowModal" :title="`添加菜单功能—「${Name}」`" width="950">
    <header>
      <div>
        <ButtonGroup>
          <Button @click="add" type="primary">
            <Icon type="md-add" />确认添加</Button
          >
        </ButtonGroup>
      </div>
      <div class="searchdiv">
        <Input
          placeholder="根据名称或地址搜索"
          class="searchInput"
          @keyup.enter.native="loadData"
          v-model="searchText"
        />
        <Button type="primary" @click="loadData">
          <Icon type="ios-search" />搜索
        </Button>
      </div>
    </header>

    <Table
      :columns="columns"
      :data="tableData"
      border
      stripe
      @on-selection-change="CurrentRowEventArray"
      class="table"
      :loading="isLoading"
    >
      <template v-slot:isEnabled="{ row }">
        <Tag v-if="row.isEnabled === true" color="red">是</Tag>
        <Tag v-else color="blue">否</Tag>
      </template>
    </Table>
    <page-component
      ref="PageInfo"
      :total="total"
      @PageChange="pageChange"
    ></page-component>
    <template v-slot:footer>
      <div></div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  .searchdiv {
    flex: 0 0 280px;
    .searchInput {
      width: 200px;
    }
    button {
      width: 80px;
    }
  }
}
</style>

<script lang="ts" src="./add-menu-function.ts"></script>