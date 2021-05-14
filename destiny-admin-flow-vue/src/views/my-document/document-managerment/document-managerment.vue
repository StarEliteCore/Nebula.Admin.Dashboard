<template>
  <section>
    <div class="body">

      <my-search :fields="fields" @click="search"></my-search>
      <div>
        <Card :dis-hover="true">
          <Row style="margin: 0px 0px 16px 0px; float: right">
            <Button
              class="operatebutton"
              type="success"
              v-hasPermission="'handleAdd'"
              @click="handleAdd()"
              >添加</Button
            >

            <Button
              class="operatebutton"
              type="warning"
              v-hasPermission="'handleUpdate'"
              @click="handleUpdate()"
              >修改</Button
            >
            <Button
              class="operatebutton"
              type="error"
              v-hasPermission="'handleDelete'"
              :loading="delectLoading"
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
          </Table>
        </Card>
      </div>
      <document-operate
        ref="editModel"
        :editTitle="editTitle"
        :editData="editData"
        @saveEdit="saveEdit"
      ></document-operate>
      <page-component
        ref="PageInfo"
        :total="total"
        @PageChange="pageChange"
      ></page-component>
    </div>
  
  </section>
</template>

<script lang="ts" src="./document-managerment.ts"></script>
<style scoped>
.operatebutton {
  margin-left: 10px;
}
.myForm {
  margin-bottom: 16px;
  background-color: #fff;
  border-radius: 2px;
  padding: 12px 10px 6px 10px;
}
</style>
