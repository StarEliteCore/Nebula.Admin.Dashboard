<template>
    <div>
        <Modal v-model="IsShow" :title="title"
            :mask-closable="false"
        >
            <Form
                :method="dataDictionInputDto"
                :label-width="120"
                :bisabled="disabled"
                ref="form"
                :rules="ruleValidate"
            >

                <FormItem label="上级数据字典:"
                    prop="parentId"
                >
                <!-- tree-default-expand-all -->
                    <a-tree-select
                        v-model="dataDictionInputDto.parentId"
                        :tree-data="treeData"
                        placeholder="请选择"
                        :replaceFields="{
                            children: 'children',
                            title: 'title',
                            key: 'key',
                            value: 'id',
                        }"
                        allow-clear
                        :max-tag-count = "5"
                    >
                    </a-tree-select>
                </FormItem> 
                <FormItem label="标题" prop="title">
                    <Input  v-model="dataDictionInputDto.title"/>
                </FormItem>
                <FormItem label="值" prop="value">
                    <Input v-model="dataDictionInputDto.value" />
                </FormItem>
                <FormItem label="备注" prop="remark">
                    <Input v-model="dataDictionInputDto.remark" />
                </FormItem>
                <FormItem label="编码" prop="code">
                    <Input v-model="dataDictionInputDto.code"/>
                </FormItem> 
            </Form>
            <template v-slot:footer>
                <div>
                    <Button v-if="canEdit" class="dialog-btn" @click="OnHandleCancel">
                        取消
                    </Button>
                    <Button
                        type="primary"
                        v-if="canEdit"
                        class="dialog-btn--primary"
                        @click="OnHandleCommit"
                    >
                        保存
                    </Button>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" src="./dataDictionary-operate.ts"/>
<style lang="scss" src="./dataDictionary-operate.scss" />
