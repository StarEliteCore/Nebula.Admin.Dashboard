<template>
  <div>
    <Row>
      <Button type="primary">Primary</Button>
      <Button type="warning">Warning</Button>
      <Button type="error">Error</Button>
    </Row>
    <Row>
      <Table
        :columns="columns"
        :data="userTable"
        border
        stripe
        :loading="loading"
      >
      </Table>
    </Row>
    <page-component ref="PageInfo" class="page"></page-component>
    <delete-dialog ref="DeleteInfo"></delete-dialog>
  </div>
</template>
<script lang="ts" src="./user-managerment.ts"></script>
<style lang="scss" src="./user-managerment.scss" scoped></style>