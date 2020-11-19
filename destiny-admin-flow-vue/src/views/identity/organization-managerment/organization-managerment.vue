<template>
  <div class="box">
    <nav class="nav">
        <div>
        <Input class="searchTree" placeholder="输入名称搜索" />
        <ButtonGroup class="btngroup">
          <Button v-hasPermission="'handleAddTree'" @click="operateItem(operate.add)">
            <Icon type="md-add"  />
          </Button>
          <Button @click="EditTree"  v-hasPermission="'handleEditTree'">
            <Icon type="ios-create" />
          </Button>
          <Button @click="deleteItemTree" v-hasPermission="'handleDeleteTree'">
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
              <Button  v-hasPermission="'handleAdd'" @click="operateItem(operate.add)"> <Icon type="md-add"/>添加 </Button>
              <Button  v-hasPermission="'handleUpdate'" @click="operateItem(operate.update)"> <Icon type="ios-create"/>编辑 </Button>
              <Button @click="deleteItem" v-hasPermission="'handleDelete'"> <Icon type="ios-trash"  />删除 </Button>
            </ButtonGroup>
          </div>
          <div class="searchdiv">
            <Input placeholder="根据名称搜索" class="searchInput" />
            <Button type="primary"> <Icon type="ios-search" @click="loadTableData"/>搜索 </Button>
          </div>
        </header>
        <article>
          <Table :columns="columns" :data="tableData" border stripe @on-selection-change="CurrentRowEventArray">
            <!-- <template v-slot:type="{ row }">
            <Tag v-if="row.type == enumOptions.Menu" color="red">菜单</Tag>
            <Tag v-else-if="row.type == enumOptions.Button" color="blue"
              >功能</Tag
            >
          </template> -->
          </Table>
          <page-component
            ref="PageInfo"
            :total="total"
            @PageChange="pageChange"
          ></page-component>
        </article>
      </Col>
    </div>
    <organization-operate ref="OrganizationInfo"></organization-operate>
    <delete-dialog ref="DeleteInfo"></delete-dialog>
  </div>
</template>
<style lang="scss" src="./organization-managerment.scss" scoped></style>
<script lang="ts" src="./organization-managerment.ts">
</script>