<template>
    <div  class="menu-item-child">
         <Submenu
      :key="menuItemmessage.id"
      :name="menuItemmessage.path"
      v-if="menuItemmessage.children && menuItemmessage.children.length > 0"
    >
      <template slot="title">
        <span>{{ getName(menuItemmessage) }}</span>
      </template>
      <template v-for="children in menuItemmessage.children">
        <menu-item-child
          v-if="children.children && children.children.length > 0"
          :key="children.id"
          :menuItemmessage="children"
        ></menu-item-child>
        <MenuItem
          v-else-if="!children.children.length"
          :to="children.path"
          :key="children.id"
          :name="children.path"
        >
          <span>{{ getName(children) }}</span>
        </MenuItem>
      </template>
    </Submenu>
    <MenuItem
      v-else-if="
        !menuItemmessage.children || menuItemmessage.children.length === 0
      "
      :to="menuItemmessage.path"
      :key="menuItemmessage.id"
      :name="menuItemmessage.path"
    >
      <span>{{ getName(menuItemmessage) }}</span>
    </MenuItem>
    </div>
</template>
<style lang="scss" scoped src="./menu-item-child.scss"></style>
<script lang="ts" src="./menu-item-child.ts"></script>