<template>
  <div>
    <h1>Func Comp</h1>
    <h1>{{ device1.guid }}</h1>
    <button @click="device1.sum">sum1</button>
    <h1>{{ device2.guid }}</h1>
    <button @click="device2.sum">sum2</button>
    <h1>{{ device3.guid }}</h1>
    <button @click="device3.sum">sum3</button>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref } from 'vue';

type SumFunc = (val: Ref<number>) => void;

interface IDevice {
  readonly guid: number;
  sum(): void;
}

function sum(val: Ref<number>) {
  val.value++;
}

function useCreateDevice(sumFunc: SumFunc): IDevice {
  const _guid: Ref<number> = ref(1);//guid 变量变成了闭包

  return {
    get guid(){
      return _guid.value
    },
    sum() {
      sumFunc(_guid)
    }
  }
}

const device1: IDevice = useCreateDevice(sum);
const device2: IDevice = useCreateDevice(sum);
const device3: IDevice = useCreateDevice(sum);
</script>

<style lang="">

</style>
