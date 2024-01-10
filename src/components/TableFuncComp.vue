<template>
  <div>
    <h1>Table Func Comp</h1>
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
import { Ref, ref } from 'vue';

// 关注点分离：
// 只关心设备的在线状态
// 没有关心人员 Staff
const deviceGuid = ref('');
function onlineChange() {
  getDevice(deviceGuid.value).online();
};
function offlineChange() {
  getDevice(deviceGuid.value).offline();
};

interface IDevice {
  readonly guid: string;
  readonly onlineStatus: Ref<boolean>;
  online(): void;
  offline(): void;
}

const { getDevice } = useDeviceFactory()

function useDeviceFactory() {
  const devices: Map<string, IDevice> = new Map();
  const device1: IDevice = useCreateDevice('a');
  const device2: IDevice = useCreateDevice('b');
  const device3: IDevice = useCreateDevice('c');
  const device4: IDevice = useCreateDevice('d');
  devices.set(device1.guid, device1);
  devices.set(device2.guid, device2);
  devices.set(device3.guid, device3);
  devices.set(device4.guid, device4);
  return {
    setDevice(guid: string, device: IDevice) {
      devices.set(guid, device)
    },
    getDevice(guid: string): IDevice {
      const device = devices.get(guid)
      if (device === undefined) {
        throw new Error('device not found')
      }
      return device
    }
  }
}

function useCreateDevice(guid: string): IDevice {
  const _guid = ref<string>(guid);
  const _onlineStatus = ref(false)
  return {
    get guid(){
      return _guid.value
    },
    get onlineStatus() {
      return _onlineStatus
    },
    online() {
      _onlineStatus.value = true
    },
    offline() {
      _onlineStatus.value = false
    }
  }
}


interface IStaff {
  readonly guid: string;
  readonly name: string;
  readonly device: IDevice;
}

function useCreateStaff(guid: string, name: string, device: IDevice): IStaff {
  const _guid = guid;
  const _name = name;
  const _device = device;
  return {
    get guid() {
      return _guid
    },
    get name() {
      return _name
    },
    get device() {
      return _device
    }
  }
}

const staff1: IStaff = useCreateStaff('1', 'John Brown', getDevice('a'))
const staff2: IStaff = useCreateStaff('2', 'Jim Green', getDevice('b'))
const staff3: IStaff = useCreateStaff('3', 'Joe Black', getDevice('c'))
const staff4: IStaff = useCreateStaff('4', 'Jim Red', getDevice('d'))
const data = ref<IStaff[]>([staff1, staff2, staff3, staff4]);

</script>
<style lang="">

</style>
