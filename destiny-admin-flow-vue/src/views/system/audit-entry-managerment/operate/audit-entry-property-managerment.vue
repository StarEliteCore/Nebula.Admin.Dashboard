<style scoped>
.expand-row {
  margin-bottom: 16px;
}
</style>
<template>
  <div>
    <Row class="expand-row">
      <Card :dis-hover="true">
        <p slot="title">属性变更明细</p>
        <Table :columns="columns" :data="tableData" border stripe> </Table>
        <page-component
          ref="PageInfo"
          :total="total"
          @PageChange="pageChange"
        ></page-component>
      </Card>
    </Row>
  </div>
</template>

<script lang="ts" src="./audit-entry-property-managerment.ts"></script>
