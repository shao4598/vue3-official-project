<template>
  <div>
    <h1>Func Comp Ex1</h1>
    <!--最差的实现方式-->
    <!--缺少封装，代码重复-->
    <h1>{{ guid1 }}</h1>
    <button @click="sum1">sum1</button>
    <h1>{{ guid2 }}</h1>
    <button @click="sum2">sum2</button>
    <h1>{{ guid3 }}</h1>
    <button @click="sum3">sum3</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const guid1 = ref(1)
function sum1() {
  guid1.value++;
}

const guid2 = ref(1)
function sum2() {
  guid2.value++;
}

const guid3 = ref(1)
function sum3() {
  guid3.value++;
}
</script>

<style lang="">

</style>
