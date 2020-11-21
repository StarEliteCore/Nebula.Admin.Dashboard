<template>
  <section class="box">
    <nav class="nav">
      <div>
        <div>
          <Input
            class="searchTree"
            suffix="ios-search"
            placeholder="输入名称搜索"
            v-model="treeSearchText"
          />
        </div>
        <ButtonGroup class="btngroup">
          <Button v-hasPermission="'handleAddTreeMenu'" @click="operateItem(operate.add)">
            <Icon type="md-add" />
          </Button>
          <Button v-hasPermission="'handleEditTreeMenu'" @click="EditTreeMenu">
            <Icon type="ios-create" />
          </Button>
          <Button  v-hasPermission="'handleDeleteTreeMenu'" @click="deleteItemTreeMenu">
            <Icon type="ios-trash" />
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <a-tree
          v-if="treeData && treeData.length > 0"
          :checkable="false"
          :tree-data="SearchTreeData"
          class="menuTree"
          :autoExpandParent="true"
          :defaultExpandAll="true"
          :defaultExpandParent="true"
          @select="treeSelected"
        />
        <CircleLoading :isShow="showTreeLoading"></CircleLoading>
      </div>
    </nav>
    <div class="body">
      <header>
        <div>
          <ButtonGroup>
            <Button v-hasPermission="'handleAddMenuFunction'"  @click="operateItem(operate.add)"><Icon type="md-add" />添加
            </Button>
            <Button  v-hasPermission="'handleEditMenuFunction'" @click="operateItem(operate.update)">
              <Icon type="ios-create" />编辑
            </Button>
            <Button @click="deleteItem" v-hasPermission="'handleDeleteMenuFunction'"> <Icon type="ios-trash" />删除</Button>
            <Button @click="showAddMenuFunction"  v-hasPermission="'showAddMenuFunction'">分配菜单功能</Button>
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
          @on-selection-change="CurrentRowEventArray"
          class="table"
          :loading="showTableLoading"
        >
          <template v-slot:type="{ row }">
            <Tag v-if="row.type == enumOptions.Menu" color="red">菜单</Tag>
            <Tag v-else-if="row.type == enumOptions.Function" color="blue"
              >功能</Tag
            >
          </template>
          <template v-slot:isHide="row">
            {{ row.isHide ? "是" : "否" }}
          </template>
          <template v-slot:action="{ row }">
            <Button
              type="primary"
              size="small"
              style="margin: 5px"
              @click="showMenuFunctionView(row)"
            >
              查看菜单功能
            </Button>
          </template>
        </Table>
        <page-component
          ref="PageInfo"
          :total="total"
          @PageChange="pageChange"
          class="paging"
        ></page-component>
      </article>
    </div>
    <menu-operate
      ref="MenuOperateInfo"
      :treeData="treeData"
      :currentMenu="CurrentRow"
      :currentTreeNode="treeSelectedMenu"
      @refreshAll="loadData"
      @refreshButton="loadData(enumOptions.Function)"
    ></menu-operate>
    <delete-dialog ref="DeleteInfo"></delete-dialog>
    <add-menu-function
      ref="AddMenuFunction"
      :isShow.sync="isShowAddMenuFunDModal"
      :menuIds="CurrentMenuIds"
      :name="CurrentRow.name"
    ></add-menu-function>
    <remove-menu-function
      ref="RemoveMenuFunction"
      :isShow.sync="isShowViewMenuFunDModal"
      :name="ClickCurrentRow.name"
      :menuId="ClickCurrentRow.id"
    ></remove-menu-function>
  </section>
</template>

<script lang="ts" src="./menu-managerment.ts"></script>
<style lang="scss" src="./menu-managerment.scss" scoped></style>