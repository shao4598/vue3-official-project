<template>
  <div>
    <h1>Table Class Comp</h1>
    <a-input v-model="deviceGuid"></a-input>
    <a-button type="primary" status="success" @click="onlineChange">Online Change</a-button>
    <a-button type="primary" status="danger" @click="offlineChange">Offline Change</a-button>
    <a-table :data="data" style="margin-top: 30px">
      <template #columns>
        <a-table-column title="guid" data-index="guid" />
        <a-table-column title="name" data-index="name" />
        <a-table-column title="device" data-index="device.guid" />
        <a-table-column title="online status">
          <template #cell="{ record }">
            <icon-check-circle-fill :style="{ color: record.device.onlineStatus ? 'green' : 'red' }" />
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';

const deviceGuid = ref('');
function onlineChange() {
  DeviceFactory.getDevice(deviceGuid.value).online();
};
function offlineChange() {
  DeviceFactory.getDevice(deviceGuid.value).offline();
};

interface IDevice {
  readonly guid: string;
  readonly onlineStatus: Ref<boolean>;
  online(): void;
  offline(): void;
}

class Device implements IDevice {
  public readonly guid: string;
  private _onlineStatus: Ref<boolean>;

  constructor(guid: string) {
    this.guid = guid;
    this._onlineStatus = ref(false)
  }

  get onlineStatus(): Ref<boolean> {
    return this._onlineStatus
  }

  online() {
    this._onlineStatus.value = true
  }

  offline() {
    this._onlineStatus.value = false
  }
}

class DeviceFactory {
  public static readonly devices: Map<string, IDevice> = new Map();

  static {
    const device1: IDevice = new Device('a');
    const device2: IDevice = new Device('b');
    const device3: IDevice = new Device('c');
    const device4: IDevice = new Device('d');
    this.devices.set(device1.guid, device1);
    this.devices.set(device2.guid, device2);
    this.devices.set(device3.guid, device3);
    this.devices.set(device4.guid, device4);
  }

  public static setDevice(guid: string, device: IDevice) {
    this.devices.set(guid, device)
  }

  public static getDevice(guid: string): IDevice {
    const device = this.devices.get(guid)
    if (device === undefined) {
      throw new Error('device not found')
    }
    return device
  }
}

interface IStaff {
  readonly guid: string;
  readonly name: string;
  readonly device: IDevice;
}

class Staff implements IStaff {
  public readonly guid: string;
  public readonly name: string;
  public readonly device: IDevice;

  constructor(guid: string, name: string, device: IDevice) {
    this.guid = guid;
    this.name = name;
    this.device = device;
  }
}

const staff1: IStaff = new Staff('1', 'John Brown', DeviceFactory.getDevice('a'))
const staff2: IStaff = new Staff('2', 'Jim Green', DeviceFactory.getDevice('b'))
const staff3: IStaff = new Staff('3', 'Joe Black', DeviceFactory.getDevice('c'))
const staff4: IStaff = new Staff('4', 'Jim Red', DeviceFactory.getDevice('d'))
const data = ref<IStaff[]>([staff1, staff2, staff3, staff4]);
</script>
<style lang="">

</style>
