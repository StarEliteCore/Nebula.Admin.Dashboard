<template>
  <section class="box">
    <nav class="nav">
      <div>
        <div class="title">
          <h1><Icon type="ios-grid" /> 文档类型 <Icon type="ios-grid" /></h1>
        </div>

        <ButtonGroup class="btngroup" shape="circle">
          <Button @click="handleAdd()">
            <Icon type="md-add" />
          </Button>
          <Button>
            <Icon type="ios-create" />
          </Button>
          <Button @click="handleDelete()">
            <Icon type="ios-trash" />
          </Button>
        </ButtonGroup>
        <div>
          <Input
            class="searchTree"
            suffix="ios-search"
            placeholder="输入名称搜索"
          />
        </div>
      </div>
      <div>
        <a-tree
          class="menuTree"
          :checkable="false"
          :tree-data="treeData"
          :autoExpandParent="true"
          :defaultExpandAll="true"
          :defaultExpandParent="true"
          :replaceFields="{ children: 'children', title: 'name', key: 'id' }"
          @select="onTreeSelect"
        />
      </div>
    </nav>
    <div class="body">
      <article>
        <Table :columns="columns" border stripe class="table" :data="tableData">
        </Table>
        <page-component
          ref="PageInfo"
          :total="total"
          @PageChange="pageChange"
          class="paging"
        ></page-component>
      </article>
    </div>

    <document-type-operate
      ref="documentType"
      editTitle="新增"
      @refresh="loadTreeData"
    ></document-type-operate>
  </section>
</template>
<script lang="ts" src="./document-type-managerment.ts"></script>
<style lang="scss" scoped>
.box {
  display: flex;
  height: 100%;
  .title {
    border-bottom: 1px solid #ddd;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-family: "微软雅黑";
  }
  .nav {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    height: 100%;
    flex: 0 0 300px;
    .searchTree,
    .btngroup {
      margin: 5px;
      width: 290px;
    }
  }
  .body {
    width: calc(100% - 300px);
    header {
      height: 32px;
      display: flex;
      justify-content: space-between;
      .searchdiv {
        flex: 0 0 280px;
        .searchInput {
          width: 200px;
        }
        button {
          width: 80px;
        }
      }
    }
    article {
      height: calc(100% - 32px);
      .table {
        width: 100%;
        height: calc(100% - 26px);
      }
      .paging {
        height: 26px;
      }
    }
  }
}
</style>
