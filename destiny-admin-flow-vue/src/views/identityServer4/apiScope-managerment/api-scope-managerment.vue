<template>
  <section>
    <div class="body">
      <my-search :fields="fields" @click="search"></my-search>
      <div>
        <Card :dis-hover="true">
          <Row style="margin: 0px 0px 16px 0px; float: right">
            <Button
              class="operatebutton"
              v-hasPermission="'handleAdd'"
              type="success"
              @click="handleAdd()"
              >添加</Button
            >

          
        <Button
              class="operatebutton"
              type="error"
              :loading="delectLoading"
              v-hasPermission="'handleDelete'"
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
            <template v-slot:enabled="{ row }">
              <Tag v-if="row.enabled" color="red">是</Tag>
              <Tag v-else color="blue">否</Tag>
            </template>
          </Table>
        </Card>
      </div>
     
      <api-scope
        ref="editModel"
        :editTitle="editTitle"
        :editData="editData"
        @saveEdit="saveEdit"
      ></api-scope>
      <page-component
        ref="PageInfo"
        :total="total"
        @PageChange="pageChange"
      ></page-component>
    </div>
  </section>
</template>
<script lang="ts" src="./api-scope-managerment.ts"></script>
<style scoped>
.operatebutton {
  margin-left: 10px;
}
</style>