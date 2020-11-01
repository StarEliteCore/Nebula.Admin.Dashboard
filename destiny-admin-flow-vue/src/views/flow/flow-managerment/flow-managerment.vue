<template>
  <div>
    <i-col span="1" style="background-color: white;" >
    <Row>
      <!--引入开始组件-->
      <flow-start></flow-start>
    </Row>
    </i-col>
    <i-col span="22" id="visualcanvasparent" style="background-color: white;margin-left: 10px;height: 100%;" >
      <div><button @click="addLine">添加节点</button></div>
      <div id="visualcanvas" style="height: 100%;width:100%;">
      </div>
    </i-col>
  </div>
</template>
<script lang="ts" src="./flow-managerment.ts">
</script>