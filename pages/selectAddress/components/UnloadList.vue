<template>
  <view class="unload-list" :style="{ transform: `translateY(${translateY})` }">
    <my-empty
      v-if="!init"
      img="/static/images/empty/loading.gif"
      text="查询中"
    />
    <my-empty
      v-else-if="defaultEmpty"
      img="/static/images/empty/address2.png"
      text="派车前需先维护卸货地址"
      showButton
      buttonText="添加卸货地址"
      @confirm="unloadConfirm"
    />
    <view v-else class="list-wrapper">
      <view class="search-box">
        <uv-search
          placeholder="搜索卸货地"
          :showAction="false"
          height="72rpx"
          bgColor="#fff"
          :boxStyle="{
            borderRadius: '36rpx',
          }"
          v-model="unloadName"
          @search="search"
        />
        <view class="btn-wrapper">
          <uv-button
            :customStyle="{ borderRadius: '36rpx', borderColor: '#fff' }"
            @click="unloadConfirm"
          >
            <uv-icon
              name="/static/images/index/plus.png"
              width="32rpx"
              height="32rpx"
              :customStyle="{ marginRight: '12rpx' }"
            /><text
              style="
                font-size: 26rpx;
                font-weight: 600;
                color: var(--dark-main);
              "
              >添加</text
            >
          </uv-button>
        </view>
      </view>
      <my-empty
        v-if="showLoading"
        img="/static/images/empty/loading.gif"
        text="查询中"
      />
      <my-empty
        v-else-if="list.length === 0"
        img="/static/images/empty/address2.png"
        text="没有符合条件的卸货地"
      />
      <scroll-view
        v-else
        scroll-y
        style="flex: 1; min-height: 0"
        refresher-enabled
        :refresher-triggered="triggered"
        :scroll-top="scrollTop"
        @scrolltolower="scrolltolower"
        @refresherrefresh="refresherrefresh"
        @scroll="scroll"
      >
        <view class="list-container">
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
                {{ item.Placename }}
              </view>
              <view class="address">{{
                joinAddStr(
                  item.Province,
                  item.City,
                  item.District,
                  item.Address
                )
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
                  getDis({
                    latitude: item.Latitude,
                    longitude: item.Logitude,
                  })
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
  </view>
</template>

<script setup>
import { ref, unref, onMounted, nextTick } from "vue";
import { GetOwnerUnloadPlace } from "@/api/index.js";
import { gcj02Distance, joinAddStr } from "@/utils/index.js";
import { useLocationStore } from "@/stores/location.js";
const locationStore = useLocationStore();

const emits = defineEmits(["change"]);

const unloadName = ref("");
const showLoading = ref(false);
const init = ref(false);
const defaultEmpty = ref(false); //第一次加载是否为空

const list = ref([]);
const HasNextPage = ref(true);
const lastCursor = ref("");
const loading = ref(false);
const pageSize = 10;
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
      unloadName: unref(unloadName),
      lastCursor: refresh ? "" : unref(lastCursor),
      pageSize,
    };
    const res = await GetOwnerUnloadPlace(params);
    list.value = refresh ? res.list : [...list.value, ...res.list];
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

const oldScrollTop = ref(0);
const scrollTop = ref(0);
function scroll(e) {
  oldScrollTop.value = e.detail.scrollTop;
}
async function goTop() {
  scrollTop.value = unref(oldScrollTop);
  await nextTick();
  scrollTop.value = 0;
}

async function search() {
  try {
    showLoading.value = true;
    await getList(true);
  } finally {
    showLoading.value = false;
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
    type: 2,
    data: record,
  });
  close();
}

function unloadConfirm() {
  uni.navigateTo({
    url: "/pages/addAddress/addAddress",
    events: {
      async handleAddUnload() {
        console.log("添加成功");
        defaultEmpty.value = false;
        goTop();

        try {
          showLoading.value = true;
          await getList(true);
        } finally {
          showLoading.value = false;
        }
      },
    },
  });
}

const translateY = ref("100%");
async function open() {
  translateY.value = 0;

  try {
    await getList(true);
    if (!init.value) {
      defaultEmpty.value = list.value.length === 0;
    }
  } finally {
    init.value = true;
  }
}
function close() {
  translateY.value = "100%";
}

onMounted(() => {
  console.log("卸货地初始化");
});

defineExpose({
  open,
  close,
});
</script>

<style lang="scss" scoped>
.unload-list {
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

  .list-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    .search-box {
      flex: none;
      display: flex;
      padding: 20rpx 24rpx;
      .btn-wrapper {
        flex: none;
        width: 160rpx;
        margin-left: 20rpx;
        border-radius: 36rpx;
        overflow: hidden;
      }
    }
  }

  .list-container {
    padding: 0 24rpx max(var(--safe-area-inset-bottom), var(--safe-bottom));
  }
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
