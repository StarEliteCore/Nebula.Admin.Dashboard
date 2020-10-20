<template>
  <div>
    <Row>
      <Button type="primary" ghost @click="getTableData">查询</Button>
      <Button type="success" @click="operateItem(operate.add)">添加</Button>
      <!-- <Button type="warning" @click="operateItem(operate.update)">修改</Button>
      <Button type="error" @click="deleteItem()">删除</Button> -->
    </Row>
    <Row>
      <Table
        :columns="columns"
        :data="userTable"
        border
        stripe
        @on-select="CurrentRowEventArray"
      >
        <template slot-scope="{ row }" slot="isSystem">
          <Tag v-if="row.isSystem" color="red">是</Tag>
          <Tag v-else color="blue">否</Tag>
        </template>
        <template slot-scope="{ row }" slot="action">
        <Button
          class="table-button table-button--primary"
          type="primary"
          size="small"
          ghost
          @click="operateItem(operate.view, row.id)"
          >查看</Button
        >
        <Button
          class="table-button table-button--info"
          type="info"
          size="small"
          ghost
          @click="operateItem(operate.update, row.id)"
          >编辑</Button
        >
        <Button
          class="table-button table-button--error"
          type="error"
          size="small"
          ghost
          @click="deleteItem(row)"
          >删除</Button
        >
      </template>
      </Table>
    </Row>
    <user-operate ref="UserOperateInfo"></user-operate>
    <page-component ref="PageInfo" class="page"></page-component>
    <delete-dialog ref="DeleteInfo"></delete-dialog>
  </div>
</template>
<script lang="ts" src="./user-managerment.ts"></script>
<style lang="scss" src="./user-managerment.scss" scoped></style>