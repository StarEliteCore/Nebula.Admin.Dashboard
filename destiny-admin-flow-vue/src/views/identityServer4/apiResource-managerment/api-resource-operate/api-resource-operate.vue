<template>
  <Modal
    v-model="isOpen"
    :title="editTitle"
    :mask-closable="false"
    :scrollable="true"
    :lock-scroll="true"
    :fullscreen="true"
  >
    <Form
      :model="editData1"
      :label-width="100"
      ref="form"
      :rules="ruleValidate"
    >
      <FormItem label="资源名：" prop="name">
        <Input v-model="editData1.name" />
      </FormItem>

      <FormItem label="是否启用：">
        <i-switch v-model="editData1.enabled" size="large">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </FormItem>
      <FormItem label="资源显示名：">
        <Input v-model="editData1.displayName" />
      </FormItem>
      <FormItem label="描述：">
        <Input
          type="textarea"
          v-model="editData1.description"
          :autosize="{ minRows: 5, maxRows: 10 }"
        />
      </FormItem>
      <FormItem label="用户声明：" prop="userClaims">
        <Select v-model="editData1.userClaims" filterable multiple allow-create>
          <Option
            v-for="item in userClaimItemList"
            :value="item.value"
            :key="item.value"
            >{{ item.text }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="Api秘钥：" prop="apiSecretValue">
        <Input v-model="editData1.apiSecretValue" />
      </FormItem>
      <FormItem
        v-for="(item, index) in editData1.items"
        v-if="item.status"
        :key="index"
        :label="'资源范围 ' + item.index + ':'"
        :prop="'items.' + index + '.value'"
        :rules="{
          required: true,
          message: '资源范围 ' + item.index + ' 不能为空',
          trigger: 'blur',
        }"
      >
        <Row>
          <Col span="18">
            <Input type="text" v-model="item.value"></Input>
          </Col>
          <Col span="4" offset="1">
            <template v-if="index >= 1">
              <Button type="error" @click="handleRemove(index)" icon="md-remove">删除资源API项</Button>
            </template>
            <template v-else>
              <Button  type="dashed" @click="handleAdd" icon="md-add">添加资源API项</Button>
            </template>
          </Col>
        </Row>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button
        type="primary"
        class="dialog-btn--primary"
        @click="onHandleCommit()"
        >保存</Button
      >
      <Button class="dialog-btn" @click="close()">关闭</Button>
    </div>
  </Modal>
</template>
<script lang="ts" src="./api-resource-operate.ts"></script>
