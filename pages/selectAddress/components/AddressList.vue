<template>
  <view
    class="list-wrapper"
    :style="{ transform: `translateY(${translateY})` }"
  >
    <template v-if="type === 1">
      <my-empty
        v-if="isSupplyInit && supplyList.length === 0"
        img="/static/images/empty/address1.png"
        text="与生产企业签约后方可派车"
        showButton
        buttonText="查看生产企业"
        @confirm="supplyConfirm"
      />
      <scroll-view scroll-y v-else style="height: 100%">
        <view class="location-list">
          <view
            class="location"
            :class="{ 'my-border-bottom': index < supplyList.length - 1 }"
            v-for="(item, index) in supplyList"
            :key="item.Id"
            @click="select(item)"
          >
            <view class="name">
              <view class="icon">
                <uv-image
                  src="/static/images/location.png"
                  width="32rpx"
                  height="32rpx"
                  :duration="0"
                />
              </view>
              {{ item.Name }}
            </view>
            <view class="address"
              >{{ item.City || "" }}{{ item.Address || "" }}</view
            >
            <view
              class="dis"
              v-if="
                typeof getDis({
                  latitude: item.Latitude,
                  longitude: item.Logitude,
                }) === 'number'
              "
              >距您
              {{
                getDis({ latitude: item.Latitude, longitude: item.Logitude })
              }}
              km</view
            >
          </view>
        </view>
        <view class="manage-address" @click="supplyConfirm">
          查看全部生产企业
          <uv-icon name="/static/images/arrow/green.png" size="28rpx" />
        </view>
        <uv-safe-bottom />
        <!-- <uv-load-more status="nomore" color="#B0BECC" line-color="#B0BECC" /> -->
      </scroll-view>
    </template>
    <template v-if="type === 2">
      <my-empty
        v-if="isUnloadInit && unloadList.length === 0"
        img="/static/images/empty/address2.png"
        text="派车前需先维护卸货地址"
        showButton
        buttonText="新建卸货地址"
        @confirm="unloadConfirm"
      />
      <scroll-view scroll-y v-else style="height: 100%">
        <view class="location-list">
          <view
            class="location"
            :class="{ 'my-border-bottom': index < unloadList.length - 1 }"
            v-for="(item, index) in unloadList"
            :key="item.Id"
            @click="select(item)"
          >
            <view class="name">
              <view class="icon">
                <uv-image
                  src="/static/images/location.png"
                  width="32rpx"
                  height="32rpx"
                  :duration="0"
                />
              </view>
              {{ item.Placename }}
            </view>
            <view class="address"
              >{{ item.City || "" }}{{ item.District || ""
              }}{{ item.Address || "" }}</view
            >
            <view
              class="dis"
              v-if="
                typeof getDis({
                  latitude: item.Latitude,
                  longitude: item.Logitude,
                }) === 'number'
              "
              >距您
              {{
                getDis({ latitude: item.Latitude, longitude: item.Logitude })
              }}
              km</view
            >
          </view>
        </view>
        <view class="manage-address" @click="unloadConfirm">
          管理卸货地址
          <uv-icon name="/static/images/arrow/green.png" size="28rpx" />
        </view>
        <uv-safe-bottom />
        <!-- <uv-load-more status="nomore" color="#B0BECC" line-color="#B0BECC" /> -->
      </scroll-view>
    </template>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { GetSupplierList, GetOwnerUnloadPlace } from "@/api/index.js";
import { gcj02Distance } from "@/utils/index.js";
import { useLocationStore } from "@/stores/location.js";
const locationStore = useLocationStore();
import { onPageShow } from "@dcloudio/uni-app";

const emits = defineEmits(["change"]);

const type = ref(1);

// onPageShow(() => {
//   if (type.value === 1) {
//     getSupply();
//   }
//   if (type.value === 2) {
//     getUnload();
//   }
// });
const isSupplyInit = ref(false);
const isUnloadInit = ref(false);

function supplyConfirm() {
  uni.switchTab({
    url: "/pages/enterprise/enterprise",
  });
}
function unloadConfirm() {
  uni.navigateTo({
    url: "/pages/addAddress/addAddress",
  });
}
const supplyList = ref([]);
const unloadList = ref([]);
// 获取装货地
async function getSupply() {
  const res = await GetSupplierList();
  supplyList.value = res;
  isSupplyInit.value = true;
}
// 获取卸货地
async function getUnload() {
  const res = await GetOwnerUnloadPlace({
    useStatus: 1,
  });
  unloadList.value = res.filter((m) => m.EnabledMark === "1");
  isUnloadInit.value = true;
}

function select(record) {
  emits("change", {
    type: type.value,
    data: record,
  });
  close();
}

// 计算距离
function getDis({ latitude, longitude }) {
  if (!locationStore.location || !latitude || !longitude) return null;
  const distance = gcj02Distance({
    lat1: latitude,
    lon1: longitude,
    lat2: locationStore.location.latitude,
    lon2: locationStore.location.longitude,
  });
  return distance;
}

const translateY = ref("100%");
function open(config) {
  type.value = config.type;
  if (type.value === 1) {
    getSupply();
  }
  if (type.value === 2) {
    getUnload();
  }

  translateY.value = 0;
}
function close() {
  translateY.value = "100%";
}

defineExpose({
  open,
  close,
});
</script>

<style lang="scss" scoped>
.list-wrapper {
  height: 100vh;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 10000;
  transform: translateY(100%);
  transition: all 0.4s;
  box-sizing: border-box;
  padding: 0 24rpx;
  background-color: var(--page-bg);
  margin-bottom: 24rpx;
  .scroll-view {
    height: 100%;
  }
}

.location-list {
  padding: 0 24rpx;
  margin-top: 24rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;

  .location {
    padding: 32rpx 0;

    .name,
    .address {
      margin-bottom: 16rpx;
    }

    .name,
    .address,
    .dis {
      padding-left: 48rpx;
    }

    .name {
      position: relative;
      font-weight: bold;
      font-size: 32rpx;
      color: var(--title-color);
      line-height: 40rpx;

      .icon {
        position: absolute;
        top: 4rpx;
        left: 0;
      }
    }

    .address {
      font-size: 26rpx;
      color: var(--sub-color);
      line-height: 32rpx;
    }

    .dis {
      font-size: 26rpx;
      color: var(--main-color);
      line-height: 40rpx;
    }
  }
}

.manage-address {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  color: var(--main-color);
  margin: 28rpx 0 0;
  line-height: 1;
  font-weight: bold;
}
</style>
