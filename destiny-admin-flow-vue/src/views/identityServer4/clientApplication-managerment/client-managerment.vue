<template>
    <section>
    <div class="body">
   <div>
        <Card :dis-hover="true">
          <Row style="margin: 0px 0px 16px 0px; float: right">
           <Button
              class="operatebutton"
              type="success"
               v-hasPermission="'handleAdd'"
              @click="operateItem(operate.add)"
              >添加</Button
            >
          <Button
              class="operatebutton"
              type="error"
              :loading="delectLoading" v-hasPermission="'handleDelete'"
              @click="handleDelete()"
              >删除</Button
            >
          </Row>
          <Table
            :columns="columns"
            :data="tableData"
            border
            stripe
            @on-select-cancel="currentRowEventCancel"
            @on-select="currentRowEventArray"
          >
           <template  v-slot:enabled="{ row }">
              <Tag v-if="row.enabled" color="red">是</Tag>
              <Tag v-else color="blue">否</Tag>
            </template>
          </Table>
        </Card>
      </div>
      <page-component
        ref="PageInfo"
        :total="total"
        @PageChange="pageChange"
      ></page-component>
    </div>
          <client-operate     
        ref="ClientOperateInfo"></client-operate>
  </section>
</template>
<script lang="ts" src="./client-managerment.ts"></script>
<style scoped>
.operatebutton {
  margin-left: 10px;
}
</style>