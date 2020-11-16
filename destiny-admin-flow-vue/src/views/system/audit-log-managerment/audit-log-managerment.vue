<template>
  <section>
    <div class="body">
      <my-search :fields="fields" @click="search" :likeValueFormat="likeValueFormat"></my-search>
      <div>
        <Card :dis-hover="true">
          <Table
            :columns="columns"
            :data="tableData"
            border
            stripe
            @on-select-cancel="currentRowEventCancel"
            @on-select="currentRowEventArray"
          >
            <!-- <template slot-scope="{ row }" slot="expand">
              <table-expand-operate :row="row"></table-expand-operate>
            </template> -->
            <template slot-scope="{ row }" slot="operationType">
              <Tag
                v-if="row.operationType == operationType.Success"
                color="primary"
              >
                成功
              </Tag>
              <Tag
                v-else-if="row.operationType == operationType.Error"
                color="error"
              >
                失败
              </Tag>
              <Tag v-else color="warning">
                无
              </Tag>
            </template>
          </Table>
        </Card>
      </div>
      <!-- <table-expand-operate ref="TableExpandOperateInfo"></table-expand-operate> -->
      <page-component
        ref="PageInfo"
        :total="total"
        @PageChange="pageChange"
      ></page-component>
    </div>
  </section>
</template>

<script lang="ts" src="./audit-log-managerment.ts"></script>
