<template>
  <section class="box">
    <div class="body">
      <Row>
        <Collapse v-model="CollapseDefault">
          <Panel name="1">
            查询面板
            <p slot="content">
              史蒂夫·乔布斯（Steve
              Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
            </p>
          </Panel>
        </Collapse>
      </Row>
      <Card dis-hover="true">
        <div style="margin: 10px">
          <Button type="primary" ghost @click="getTableData">查询</Button>
          <Button type="success" @click="operateItem(operate.add)">添加</Button>
          <Button type="warning" @click="operateItem(operate.update)"
            >修改</Button
          >
          <Button type="error" @click="deleteItem()">删除</Button>
        </div>
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
      <page-component
        ref="PageInfo"
        :total="total"
        @PageChange="pageChange"
      ></page-component>
    </div>
    <user-operate ref="UserOperateInfo"></user-operate>

    <delete-dialog ref="DeleteInfo"></delete-dialog>
  </section>
</template>
<script lang="ts" src="./user-managerment.ts"></script>
<style lang="scss" src="./user-managerment.scss" scoped></style>