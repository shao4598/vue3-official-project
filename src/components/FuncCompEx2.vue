<template>
  <div>
    <h1>Func Comp Ex2</h1>
    <!--子组件同时管理UI与状态-->
    <!--UI和逻辑耦合了-->
    <FuncCompEx2SubComp/>
    <FuncCompEx2SubComp/>
    <FuncCompEx2SubComp/>
  </div>
</template>

<script lang="ts" setup>
import FuncCompEx2SubComp from './FuncCompEx2SubComp.vue';
</script>

<style lang="">

</style>
