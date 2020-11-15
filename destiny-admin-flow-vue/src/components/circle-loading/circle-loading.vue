<template>
  <Spin v-show="_isShow">
    <Icon type="ios-loading" :size="_iconSize" :class="_iconClass"></Icon>
    <div>{{ _text }}</div>
  </Spin>
</template>

<style lang="scss" scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 0.5s linear infinite;
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<script lang="ts" src="./circle-loading.ts">