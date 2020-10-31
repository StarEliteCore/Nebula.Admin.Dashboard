<template>
  <section class="box">
    <nav class="nav">
      <div>
        <Input class="searchTree" placeholder="输入内容Enter搜索" />
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
        :checkable="true"
        :auto-expand-parent="true"
        :tree-data="treeData"
        class="menuTree"
      />
    </nav>
    <div class="body">
      <header>
        <div>
          <ButtonGroup>
            <Button> <Icon type="md-add" />添加 </Button>
            <Button> <Icon type="ios-create" />编辑 </Button>
            <Button> <Icon type="ios-trash" />删除 </Button>
          </ButtonGroup>
        </div>
        <div class="searchdiv">
          <Input placeholder="根据XXX搜索" class="searchInput" /><Button
            type="primary"
            ><Icon type="ios-search" />搜索</Button
          >
        </div>
      </header>
      <article>
        <Table
          :columns="columns"
          :data="tableData"
          border
          stripe
          @on-select="CurrentRowEventArray"
        >
        </Table>
        <page-component
          ref="PageInfo"
          :total="total"
          @PageChange="pageChange"
        ></page-component>
      </article>
    </div>
  </section>
</template>

<script lang="ts" src="./menu-managerment.ts"></script>
<style lang="scss" src="./menu-managerment.scss" scoped></style>