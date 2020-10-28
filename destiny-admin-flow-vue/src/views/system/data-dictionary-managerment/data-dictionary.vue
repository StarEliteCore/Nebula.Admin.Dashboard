<template>
    <div class="body">
        <!-- 布局 -->
        <Layout>
            <Sider>
                <div calss="data-title"><span>数据字典</span></div>
                <Row>
                    <Button type="" :size="buttonSize" shape="circle" iocn="md-add"></Button>
                    <Button type="" :size="buttonSize" shape="circle" iocn="md-create"></Button>
                    <Button type="" :size="buttonSize" shape="circle" iocn="ios-refresh"></Button>
                    <Button type="" :size="buttonSize" shape="circle" iocn="ios-trash"></Button>
                </Row>
                <Row>
                    <Input suffix="ios-search" placeholder="Enter text" style="width: auto" />
                </Row>
                <Row>
                    <Tree></Tree>
                </Row>
            </Sider>
            <Layout>

            </Layout>
        </Layout>
    </div>
</template>
<script lang="ts" src="./data-dictionary.ts"/>
<style lang="scss" src="./data-dictionary.scss"/>
