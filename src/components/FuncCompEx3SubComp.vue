<template>
  <div>
    <h1>Func Comp Ex3's Sub-Comp</h1>
    <h1>{{ guid }}</h1>
    <button @click="emit('sum')">{{ title }}</button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  guid: number;
}>()

const emit = defineEmits<{
  (e: 'sum'): void;
}>()
</script>

<style lang="">

</style>
