<template>
  <Layout id="main-app-layout" class="layout">
    <!-- <router-view class="component child-demo" v-show="$route.name" /> -->
    <Sider hide-trigger class="main-app-layout__sider">
      <system-title></system-title>
      <transition name="fade">
        <menu-tab
          v-if="menuShow"
          :menus="menus"
          :activeName="activeName"
          :openNames="openNames"
        ></menu-tab>
      </transition>
    </Sider>
    <Layout class="main-app-layout--right">
      <layout-header class="main-app-layout__header"></layout-header>
      <Content class="main-app-layout__content">
        <router-view class="admin-layout_content"></router-view>
        <!-- <router-view class="component child-demo" v-show="$route.name" /> -->
        <footer>
          © Now
          <a target="_blank" href="https://github.com/DestinyCore">
            DestinyCore
          </a>
        </footer>
      </Content>
    </Layout>
  </Layout>
</template>
<style lang="scss" src="./layout.scss" scoped></style>
<script lang="ts" src="./layout.ts"></script>
<style lang="scss">
@import "~@/assets/styles/index.scss";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>