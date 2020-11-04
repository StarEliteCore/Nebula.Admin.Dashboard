<style scoped>
.expand-row {
  margin-bottom: 16px;
}
</style>
<template>
  <div>
    <Row class="expand-row">
      <Card :dis-hover="true">
        <p slot="title">数据审计</p>
        <Table
          :columns="columns"
          :data="auditEntryTable"
          border
          stripe
          size="small"
        >
          <template v-slot:operationType="{ row, index }">
            <Tag v-if="row.operationType === 0" color="blue">无</Tag>
            <Tag v-else-if="row.operationType === 1" color="blue">新增</Tag>
            <Tag v-else-if="row.operationType === 2" color="blue">删除</Tag>
            <Tag v-else-if="row.operationType === 3" color="blue">更新</Tag>
          </template>

          <template v-slot:keyValues="{ row, index }">
            {{ row.keyValues.id }}
          </template>
        </Table>
        <page-component
          ref="PageInfo"
          :total="total"
          @PageChange="pageChange"
        ></page-component>
      </Card>
    </Row>
  </div>
</template>

<script lang="ts" src="./table-expand.ts"></script>
