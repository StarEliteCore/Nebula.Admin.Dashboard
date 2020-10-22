<template>
  <section class="box">
    <nav class="nav">
      <div>
        <Input class="searchTree" placeholder="输入内容搜索" />
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
      <Tree :data="data2" show-checkbox></Tree>
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
            <Input placeholder="根据XXX搜索" class="searchInput" /><Button type="primary"><Icon type="ios-search" />搜索</Button>
        </div>
      </header>
      <article>
        <Table border ref="selection" :columns="columns4" :data="data1"></Table>
        <Page :total="40" size="small" show-elevator show-sizer />
      </article>
    </div>
  </section>
</template>

<script lang="ts" src="./menu-managerment.ts"></script>
<style lang="scss" src="./menu-managerment.scss" scoped></style>