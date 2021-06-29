<template>
  <section>
    <div class="body">
      <my-search :fields="fields" @click="search"></my-search>
      <Card :bordered="false">
        <div>
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
              v-hasPermission="'handleUpdate'"
              type="warning"
              @click="handleUpdate()"
              >修改</Button
            >
            <Button
              class="operatebutton"
              type="error"
              :loading="delectLoading"
              v-hasPermission="'handleDelete'"
              @click="handleDelete()"
              >删除</Button
            >
            <Button
              class="operatebutton"
              type="primary"
              v-hasPermission="'handleAuth'"
              @click="handleAuth()"
              icon="md-send"
              >分配权限</Button
            >
          </Row>
          <Table
            height="425"
            :columns="columns"
            :data="tableData"
            border
            stripe
            @on-select-cancel="currentRowEventCancel"
            @on-select="currentRowEventArray"
          >
            <template slot-scope="{ row }" slot="isAdmin">
              <Tag v-if="row.isAdmin" color="red">是</Tag>
              <Tag v-else color="blue">否</Tag>
            </template>
          </Table>

          <page-component
            ref="PageInfo"
            :total="total"
            @PageChange="pageChange"
          ></page-component>
        </div>
        <set-permission
          ref="setPermissionModel"
          :editData="role"
          :editTitle="permissionTitle"
        ></set-permission>
      </Card>

      <role-operate
        ref="editModel"
        :editTitle="editTitle"
        :editData="editData"
        @saveEdit="saveEdit"
      ></role-operate>
      <!-- <edit-modal ref="editModel" :editTitle="editTitle">
        <template v-slot:content>
      
        </template>
      </edit-modal> -->
    </div>
  </section>
</template>

<script lang="ts" src="./role-managerment.ts"></script>
<style scoped>
.operatebutton {
  margin-left: 10px;
}
.my-search {
  background-color: #fff;
  padding: 25px 10px 6px 10px;
  border-radius: 2px;
  margin-bottom: 12px;
}
</style>
