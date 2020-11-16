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
        <Table :columns="columns" :data="tableData" border stripe>
          
              <template  v-slot:propertiesType="{row}">
                  {{row.propertiesType.indexOf("System.Nullable`1") >= 0 ? (/(?<=(\[){2}).*?(?=(,\s))/g).exec(row.propertiesType)[0]+"?":row.propertiesType}}
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

<script lang="ts" src="./audit-entry-property-managerment.ts"></script>
