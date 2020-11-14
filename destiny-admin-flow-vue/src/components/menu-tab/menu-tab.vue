<template>
    <Menu
    style="width:100%;background-color:transparent"
    ref="menuRef"
    :mode="menus.menuStyle.mode"
    :accordion="menus.menuStyle.accordion"
    :theme="menus.menuStyle.theme"
    :Menu="menus"
    :active-name="activeName"
    :open-names="openNames"
    @on-open-change="OpenChange"
    @on-select="changeSelect"
    class="menu-component"
  >
    <menu-item-child
      v-for="item in MenuList"
      :key="item.id"
      :menuItemmessage="item"
    ></menu-item-child>
  </Menu>
</template>
<script lang="ts" src="./menu-tab.ts"></script>
<style lang="scss" src="./menu-tab.scss" scoped></style>
<style lang="scss">
.menu-component {
  color: rgba(205, 218, 254, 1) !important;
}
</style>