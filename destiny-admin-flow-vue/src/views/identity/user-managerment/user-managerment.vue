<template>
  <section class="box">
    <div class="body">
      <Row>
        <Collapse v-model="CollapseDefault">
          <Panel name="1">
            查询面板
            <p slot="content">
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
            </p>
            <p slot="content">
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
            </p>
            <p slot="content">
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
            </p>
            <p slot="content">
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
              <Button type="primary" ghost @click="getTableData">查询</Button>
            </p>
          </Panel>
        </Collapse>
      </Row>
      <div>
        <Card :dis-hover="true">
          <Row style="margin: 0px 0px 16px 0px; float: right">
            <Button
              class="operatebutton"
              type="success"
              @click="operateItem(operate.add)"
              >添加</Button
            >
            <Button
              icon="ios-search"
               type="primary"
              @click="allocationRole()"
              >分配角色</Button
            >
            <Button
              class="operatebutton"
              type="warning"
              @click="operateItem(operate.update)"
              >修改</Button
            >
            <Button class="operatebutton" type="error" @click="deleteItem()"
              >删除</Button
            >
          </Row>
          <Table
            :columns="columns"
            :data="userTable"
            border
            stripe
            @on-select="CurrentRowEventArray"
          >
            <template slot-scope="{ row }" slot="isSystem">
              <Tag v-if="row.isSystem" color="red">是</Tag>
              <Tag v-else color="blue">否</Tag>
            </template>
            <template slot-scope="{ row }" slot="action">
              <Button
                class="table-button table-button--primary"
                type="primary"
                size="small"
                ghost
                @click="operateItem(operate.view, row.id)"
                >查看</Button
              >
              <Button
                class="table-button table-button--info"
                type="info"
                size="small"
                ghost
                @click="operateItem(operate.update, row.id)"
                >编辑</Button
              >
              <Button
                class="table-button table-button--error"
                type="error"
                size="small"
                ghost
                @click="deleteItem(row)"
                >删除</Button
              >
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
    <user-operate ref="UserOperateInfo"></user-operate>
    <user-allocation-role ref="UserAllocationRoleInfo"></user-allocation-role>
    <delete-dialog ref="DeleteInfo"></delete-dialog>
  </section>
</template>
<script lang="ts" src="./user-managerment.ts"></script>
<style lang="scss" src="./user-managerment.scss" scoped></style>