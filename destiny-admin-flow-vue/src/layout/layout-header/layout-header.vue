<template>
  <Header class="main-app-layout__header">
    <div>欢迎您 {{ GetUserName() }}</div>
    <Dropdown>
      <a href="javascript:void(0)">
        <img src="@/assets/user.jpg" width="35" height="35" class="img-user" alt="更多">
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <template v-slot:list>
        <DropdownMenu>
          <DropdownItem @click.native="LogOut">退出登录</DropdownItem>
        </DropdownMenu>
      </template>
    </Dropdown>
  </Header>
</template>
<style lang="scss" src="./layout-header.scss" scoped></style>
<script lang="ts" src="./layout-header.ts" ></script>