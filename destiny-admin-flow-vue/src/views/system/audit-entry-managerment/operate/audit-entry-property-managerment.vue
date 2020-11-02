<template>
   <Drawer :styles="styles"  title="查看属性审计"      width="720" :closable="false"  v-model="isOpenDrawer" >

      <Table :columns="columns" :data="auditEntryPropertyTable"   border stripe @on-select-cancel="CurrentRowEventCancel"    @on-select="CurrentRowEventArray">
            
 
    </Table>
   <page-component
        ref="PageInfo"
        :total="total"
        @PageChange="pageChange"
      ></page-component>
   
  </Drawer>
</template>

<script lang="ts" src="./audit-entry-property-managerment.ts"></script>
