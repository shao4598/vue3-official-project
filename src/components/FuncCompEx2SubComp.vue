<template>
  <div>
    <h1>Func Comp Ex2's Sub-Comp</h1>
    <h1>{{ guid }}</h1>
    <button @click="sum">sum1</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const guid = ref(1)
function sum() {
  guid.value++;
}
</script>

<style lang="">

</style>
