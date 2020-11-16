<template>
  <section>
    <div class="body">
     
     <my-search :fields="fields" @click="search" :likeValueFormat="likeValueFormat"></my-search>
      <div>
        <Card :dis-hover="true">
        <Table :columns="columns" :data="tableData" border stripe>
            
            <template  v-slot:operationType="{row}" >
              <Tag v-if="row.operationType===0" color="blue">
                 无
              </Tag>
              <Tag v-else-if="row.operationType===1" color="blue">
                 新增
              </Tag>
              <Tag v-else-if="row.operationType===2" color="blue">删除</Tag>
              <Tag v-else-if="row.operationType===3" color="blue">更新</Tag>
            </template>
          
             <template  v-slot:keyValues="{row}">
                  {{row.keyValues.id}}
              </template>
          </Table>
   
        </Card>
      </div>
        <!-- <entry-propert-operate ref="EntryPropertyOperateInfo"></entry-propert-operate> -->
      <page-component
        ref="PageInfo"
        :total="total"
        @PageChange="pageChange"
      ></page-component>
    </div>
  </section>
</template>

<script lang="ts" src="./audit-entry-managerment.ts"></script>