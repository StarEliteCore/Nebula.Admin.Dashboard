<template>
    <section class="box">
        <nav class="nav">
            <div>
                <Input class="searchTree" placeholder="输入名称搜索"/>
                <br/>
                <ButtonGroup class="btngroup">
                    <Button>
                        <Icon type="md-add" />
                    </Button>
                    <Button>
                        <Icon type="ios-create" />
                    </Button>
                    <Button>
                        <Icon type="ios-refresh" />
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
                        <Button >
                            <Icon type="md-add" />添加
                        </Button>
                        <Button >
                            <Icon type="ios-create" />编辑
                        </Button>
                        <Button> 
                            <Icon type="ios-trash" />删除 
                        </Button>
                    </ButtonGroup>
                </div>
                <div class="searchdiv">
                    <Input
                        placeholder="根据名称搜索"
                        class="searchInput"
                    />
                    <Button type="primary">
                        <Icon type="ios-search" />搜索
                    </Button>
                    </div>
            </header>
            <article>
                <Table
                    :columns="columns"
                    
                    border
                    tripe
                    
                    class="table"
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
<script lang="ts" src="./data-dictionary-managerment.ts"/>
<style lang="scss" src="./data-dictionary-managerment.scss"/>
