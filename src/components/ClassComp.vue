<template>
  <div>
    <h1>Class Comp</h1>
    <h1>{{ device1.guid }}</h1>
    <button @click="device1.sum()">sum1</button>
    <h1>{{ device2.guid }}</h1>
    <button @click="device2.sum()">sum2</button>
    <h1>{{ device3.guid }}</h1>
    <button @click="device3.sum()">sum3</button>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';

interface IDevice {
  guid: number;
  sum(): void;
}

class Device implements IDevice {
  private _guid: Ref<number>;

  constructor() {
    this._guid = ref(1)
  }

  get guid() {
    return this._guid.value
  }

  sum() {
    this._guid.value++
  }
}

const device1: IDevice = new Device();
const device2: IDevice = new Device();
const device3: IDevice = new Device();
</script>

<style lang="">

</style>
