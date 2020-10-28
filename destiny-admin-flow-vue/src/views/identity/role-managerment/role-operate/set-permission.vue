<template>
    <Modal v-model="IsShow" :title="title" :mask-closable="false">
         <Tree :data="data2" show-checkbox></Tree>
    </Modal>
</template>
<script lang="ts" src="./set-permission.ts"></script>