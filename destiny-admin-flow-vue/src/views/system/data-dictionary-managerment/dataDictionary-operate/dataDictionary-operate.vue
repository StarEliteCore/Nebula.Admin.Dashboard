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
                    <a-tree-select
                        v-model="dataDictionInputDto.parentId"
                        :tree-data="treeData"
                        placeholder="请选择"
                        tree-default-expand-all
                        :replaceFields="{
                            children: 'children',
                            title: 'title',
                            key: 'key',
                            value: 'id',
                        }"
                        allow-clear
                    >
                    </a-tree-select>
                </FormItem>
                <FormItem label="标题" prop="title">
                    <Input v-model="dataDictionInputDto.title" />
                </FormItem>
                <FormItem label="值" prop="value">
                    <Input v-model="dataDictionInputDto.value" />
                </FormItem>
                <FormItem label="备注" prop="remark">
                    <Input v-model="dataDictionInputDto.remark" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>