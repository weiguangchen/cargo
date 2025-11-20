<template>
  <view class="map-wrapper">
    <map
      longitude="116.4039069"
      latitude="39.9164916"
      style="width: 100%; height: 1000rpx"
      id="map"
      :markers="markers"
      show-location
    >
      <cover-view slot="callout">
        <cover-view class="customCallout" :marker-id="123">
          <cover-view class="content"
            >在这里{{ type === 1 ? "装货" : "卸货" }}</cover-view
          >
        </cover-view>
      </cover-view>
    </map>
  </view>

  <view class="page-footer">
    <view class="footer-top">
      <view class="location-wrapper" v-if="type === 1 && data">
        <view class="tag zhuang">装货地</view>
        <view class="name">{{ data.Name }}</view>
        <view class="address"
          >{{ data.City || "" }}{{ data.Address || "" }}</view
        >
        <uv-line color="#E3E9EF" margin="28rpx 0 32rpx" />
        <view class="person">
          <text style="margin-right: 24rpx">{{ data.Linker }}</text>
          <text>{{ data.LinkerMobile }}</text>
        </view>
      </view>
      <view class="location-wrapper" v-if="type === 2 && data">
        <view class="tag xie">卸货地</view>
        <view class="name">{{ data.Placename }}</view>
        <view class="address"
          >{{ data.City || "" }}{{ data.District || ""
          }}{{ data.Address || "" }}</view
        >
        <uv-line color="#E3E9EF" margin="28rpx 0 32rpx" />
        <view class="person">
          <text style="margin-right: 24rpx">{{ data.Nickname }}</text>
          <text>{{ data.Mobile }}</text>
        </view>
      </view>
    </view>

    <view class="btns">
      <uv class="left">
        <uv-button
          text="更改地址"
          color="var(--page-bg)"
          :custom-style="{
            color: 'var(--sub-color)',
            borderRadius: '16rpx',
            height: '96rpx',
          }"
          :custom-text-style="{ fontWeight: 'bold' }"
          @click="openList"
        />
      </uv>
      <view class="right">
        <uv-button
          :text="type === 1 ? '确认装货地' : '确认卸货地'"
          color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
          :custom-style="{ borderRadius: '16rpx', height: '96rpx' }"
          :custom-text-style="{ fontWeight: 'bold' }"
          @click="submit"
        />
      </view>
    </view>
  </view>

  <!-- 选择装货地 -->
  <SupplyList ref="supplyListRef" @change="changeSupply" />
  <!-- 选择卸货地 -->
  <UnloadList ref="unloadListRef" @change="changeUnload" />
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, nextTick } from "vue";
import SupplyList from "./components/SupplyList.vue";
import UnloadList from "./components/UnloadList.vue";
import { onLoad } from "@dcloudio/uni-app";
import { sleep } from "@/utils/index.js";
const { ctx } = getCurrentInstance();

// 地图
const mapContext = ref();
onMounted(() => {
  mapContext.value = uni.createMapContext("map", ctx);

  const instance = getCurrentInstance().proxy;
  const channel = instance.getOpenerEventChannel();
  eventChannel.value = channel;
  channel.on("setData", async (res) => {
    console.log("setData", res);
    type.value = res.type;
    data.value = res.data;

    if (res.type === 1) {
      uni.setNavigationBarTitle({
        title: "选择装货地",
      });
    }
    if (res.type === 2) {
      uni.setNavigationBarTitle({
        title: "选择卸货地",
      });
    }
    if (!res.data) {
      if (res.type === 1) {
        supplyListRef.value.open(); // 选择装货地
      }
      if (res.type === 2) {
        unloadListRef.value.open(); // 选择卸货地
      }
      return;
    }

    supplyListRef.value.close();
    unloadListRef.value.close();
    await sleep(500);
    setLocation({
      longitude: res.data.Logitude,
      latitude: res.data.Latitude,
    });
  });
});

const type = ref(1);
const data = ref();
const eventChannel = ref();

function openList() {
  if (type.value === 1) {
    supplyListRef.value.open(); // 选择装货地
  }
  if (type.value === 2) {
    unloadListRef.value.open(); // 选择卸货地
  }
}

const supplyListRef = ref();
function changeSupply(res) {
  console.log("changeSupply", res);
  data.value = res.data;
  type.value = res.type;

  setLocation({
    longitude: res.data.Logitude,
    latitude: res.data.Latitude,
  });
}

const unloadListRef = ref();
function changeUnload(res) {
  console.log("changeUnload", res);
  data.value = res.data;
  type.value = res.type;

  setLocation({
    longitude: res.data.Logitude,
    latitude: res.data.Latitude,
  });
}

const markers = ref([]);
function setLocation(data) {
  const { longitude, latitude } = data;
  console.log("setLocation", longitude, latitude, mapContext.value, data);
  if (longitude && latitude) {
    const marker = {
      id: 123,
      longitude,
      latitude,
      iconPath: "/static/images/map-marker.png",
      width: "45rpx",
      height: "63rpx",
      customCallout: {
        display: "ALWAYS",
        anchorX: 0,
        anchorY: -12,
      },
    };
    markers.value = [marker];
    mapContext.value.moveToLocation({
      longitude,
      latitude,
    });
  }
}

function submit() {
  eventChannel.value.emit("confirm", {
    type: type.value,
    data: data.value,
  });
  uni.navigateBack();
}
</script>

<style lang="scss">
.map-wrapper {
}
.fullpage {
  height: 100vh;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 10000;
  transform: translateY(100%);
  transition: all 0.4s;
}
.page-footer {
  border-radius: 24rpx 24rpx 0rpx 0rpx;
  overflow: hidden;
  padding: 0;
  .footer-top {
    padding: 24rpx;
    background-color: var(--page-bg);
  }
  .location-wrapper {
    padding: 28rpx 24rpx 32rpx;
    background: #ffffff;
    border-radius: 24rpx;
    overflow: hidden;

    .tag {
      width: fit-content;
      display: flex;
      align-items: center;
      padding: 0 12rpx;
      height: 44rpx;
      border-radius: 8rpx;
      font-weight: 500;
      font-size: 26rpx;
      color: #ffffff;
      margin-bottom: 20rpx;
      &.zhuang {
        background-color: var(--main-color);
      }
      &.xie {
        background-color: #fc7e2c;
      }
    }
    .name {
      color: var(--title-color);
      font-weight: bold;
      font-size: 36rpx;
      line-height: 44rpx;
      margin-bottom: 20rpx;
    }
    .address {
      font-size: 26rpx;
      color: var(--sub-color);
      line-height: 32rpx;
    }
    .person {
      font-weight: bold;
      font-size: 28rpx;
      color: var(--title-color);
      line-height: 48rpx;
    }
  }
  .btns {
    padding: 24rpx 24rpx calc(var(--safe-area-inset-bottom) + 24rpx);
  }
}

.customCallout {
  .content {
    border-radius: 28rpx;
    box-shadow: 0rpx 4rpx 4rpx 0rpx rgba(0, 0, 0, 0.25);
    padding: 10rpx 20rpx;
    background-color: #fff;
    font-weight: 500;
    font-size: 28rpx;
    color: var(--title-color);
    line-height: 36rpx;
  }
}
</style>
