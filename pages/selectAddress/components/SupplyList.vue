<template>
  <view class="supply-list" :style="{ transform: `translateY(${translateY})` }">
    <my-empty
      v-if="!init"
      img="/static/images/empty/loading.gif"
      text="查询中"
    />
    <my-empty
      v-if="list.length === 0"
      img="/static/images/empty/address1.png"
      text="与生产企业签约后方可派单"
      showButton
      buttonText="查看生产企业"
      @confirm="supplyConfirm"
    />
    <scroll-view
      v-else
      scroll-y
      style="height: 100%"
      refresher-enabled
      :refresher-triggered="triggered"
      @scrolltolower="scrolltolower"
      @refresherrefresh="refresherrefresh"
    >
      <view style="padding: 20rpx 24rpx">
        <view class="location-list">
          <view
            class="location"
            :class="{ 'my-border-bottom': index < list.length - 1 }"
            v-for="(item, index) in list"
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
            <view class="address">{{
              joinAddStr(item.Province, item.City, item.District, item.Address)
            }}</view>
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
        <uv-load-more
          :status="!HasNextPage ? 'nomore' : loading ? 'loading' : 'loadmore'"
        />
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, unref } from "vue";
import { GetSupplierList } from "@/api/index.js";
import { gcj02Distance, joinAddStr } from "@/utils/index.js";
import { useLocationStore } from "@/stores/location.js";
const locationStore = useLocationStore();

const emits = defineEmits(["change"]);

const init = ref(false);
const list = ref([]);
const HasNextPage = ref(true);
const lastCursor = ref("");
const loading = ref(false);
const pageSize = 20;
async function getList(refresh = false) {
  if (!refresh && !unref(HasNextPage)) {
    return;
  }
  if (unref(loading)) {
    return;
  }
  loading.value = true;
  try {
    const params = {
      signed: 1,
      lastCursor: refresh ? "" : unref(lastCursor),
      pageSize,
    };
    const res = await GetSupplierList(params);
    list.value = refresh ? [...res.list] : [...list.value, ...res.list];
    HasNextPage.value = res.HasNextPage;
    lastCursor.value = res.NextCursor;
  } catch {
  } finally {
    loading.value = false;
  }
}

function scrolltolower() {
  getList();
}
const triggered = ref(false);
async function refresherrefresh() {
  if (triggered.value) return;
  try {
    triggered.value = true;
    await getList(true);
  } finally {
    triggered.value = false;
  }
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

function select(record) {
  emits("change", {
    type: 1,
    data: record,
  });
  close();
}

function supplyConfirm() {
  uni.switchTab({
    url: "/pages/enterprise/enterprise",
  });
}

const translateY = ref("100%");
async function open() {
  translateY.value = 0;

  try {
    await getList(true);
  } finally {
    init.value = true;
  }
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
.supply-list {
  height: 100vh;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 10000;
  transform: translateY(100%);
  transition: all 0.4s;
  box-sizing: border-box;
  background-color: var(--page-bg);
}

.location-list {
  padding: 0 24rpx;
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
</style>
