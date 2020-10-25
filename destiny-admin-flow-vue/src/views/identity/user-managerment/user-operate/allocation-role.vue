<template>
  <Modal v-model="IsShow" :title="title" :mask-closable="false">
    <Row>
      <CheckboxGroup @on-change="CheckGroupChange" v-model="checkedArray">
        <span v-for="item in checkboxArray">
          <Checkbox :key="item.value" :label="item.value">
            <span>{{item.text}}</span>
          </Checkbox>
        </span>
      </CheckboxGroup>
    </Row>
    <div slot="footer">
      <Button v-if="canEdit" class="dialog-btn" @click="OnHandleCancelNotform"
        >取消</Button
      >
      <Button
        type="primary"
        v-if="canEdit"
        class="dialog-btn--primary"
        @click="OnHandleCommit"
        >保存</Button
      >
      <Button v-if="!canEdit" class="dialog-btn" @click="OnHandleCancelNotform"
        >关闭</Button
      >
    </div>
  </Modal>
</template>
<script lang="ts" src="./allocation-role.ts"></script>