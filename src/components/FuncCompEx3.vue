<template>
  <div>
    <h1>Func Comp Ex3</h1>
    <!--无状态组件-->
    <!--UI 与逻辑的解耦-->
    <FuncCompEx3SubComp title="sum1" :guid="device1.guid" @sum="device1.sum"/>
    <FuncCompEx3SubComp title="sum2" :guid="device2.guid" @sum="device2.sum"/>
    <FuncCompEx3SubComp title="sum3" :guid="device3.guid" @sum="device3.sum"/>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref } from 'vue';
import FuncCompEx3SubComp from './FuncCompEx3SubComp.vue';

type SumFunc = (val: Ref<number>) => void;

interface IDevice {
  readonly guid: number;
  sum(): void;
}

function sum(val: Ref<number>) {
  val.value++;
}

function useCreateDevice(sumFunc: SumFunc): IDevice {
  // hooks api的精髓：
  // 1. 闭包
  // 2. _guid 改变后，会自动触发该_guid相关联的组件重新渲染
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
