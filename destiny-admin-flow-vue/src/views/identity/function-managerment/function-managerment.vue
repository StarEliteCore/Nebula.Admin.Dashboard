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
          <Alert type="error" style="margin-top:38px;color:#f5222d;text-align:center;" >
            支持后台动态生成
          </Alert>
          <Table
            :columns="columns"
            :data="tableData"
            border
            stripe
            @on-select-cancel="currentRowEventCancel"
            @on-select="currentRowEventArray"
          >
            <template slot-scope="{ row }" slot="isEnabled">
              <Tag v-if="row.isEnabled" color="red">是</Tag>
              <Tag v-else color="blue">否</Tag>
            </template>
          </Table>
        </Card>
      </div>
      <function-operate
        ref="editModel"
        :editTitle="editTitle"
        :editData="editData"
        @saveEdit="saveEdit"
      ></function-operate>
      <page-component
        ref="PageInfo"
        :total="total"
        @PageChange="pageChange"
      ></page-component>
    </div>
  </section>
</template>

<script lang="ts" src="./function-managerment.ts"></script>
<style scoped>
.operatebutton {
  margin-left: 10px;
}
</style>
