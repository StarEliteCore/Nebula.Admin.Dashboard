<template>
  <section class="box">
    <nav class="nav">
      <div>
        <Input class="searchTree" placeholder="输入名称Enter搜索" />
        <br />
        <ButtonGroup class="btngroup">
          <Button>
            <Icon type="md-add" />
          </Button>
          <Button>
            <Icon type="ios-create" />
          </Button>
          <Button>
            <Icon type="ios-trash" />
          </Button>
        </ButtonGroup>
      </div>

      <a-tree
        v-if="treeData && treeData.length > 0"
        :checkable="false"
        :tree-data="treeData"
        class="menuTree"
        :autoExpandParent="true"
        :defaultExpandAll="true"
        :defaultExpandParent="true"
        @select="treeSelected"
      />
    </nav>
    <div class="body">
      <header>
        <div>
          <ButtonGroup>
            <Button @click="operateItem(operate.add)">
              <Icon type="md-add" />添加
            </Button>
            <Button @click="operateItem(operate.update)">
              <Icon type="ios-create" />编辑
            </Button>
            <Button> <Icon type="ios-trash" />删除 </Button>
          </ButtonGroup>
        </div>
        <div class="searchdiv">
          <Input
            placeholder="根据名称搜索"
            class="searchInput"
            @keyup.enter.native="loadTableData"
            v-model="dynamicQuery.name"
          />
          <Button type="primary" @click="loadTableData">
            <Icon type="ios-search" />搜索
          </Button>
        </div>
      </header>
      <article>
        <Table
          :columns="columns"
          :data="tableData"
          border
          stripe
          @on-select="CurrentRowEventArray"
          class="table"
        >
          <template v-slot:type="{ row }">
            <Tag v-if="row.type == enumOptions.Menu" color="red">菜单</Tag>
            <Tag v-else-if="row.type == enumOptions.Button" color="blue"
              >功能</Tag
            >
          </template>
        </Table>
        <page-component
          ref="PageInfo"
          :total="total"
          @PageChange="pageChange"
        ></page-component>
      </article>
    </div>
    <menu-operate ref="MenuOperateInfo"></menu-operate>
    <delete-dialog ref="DeleteInfo"></delete-dialog>
  </section>
</template>

<script lang="ts" src="./menu-managerment.ts"></script>
<style lang="scss" src="./menu-managerment.scss" scoped></style>