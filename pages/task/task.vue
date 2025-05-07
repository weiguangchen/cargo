<template>
  <page-meta
    :page-style="'overflow:' + (show ? 'hidden' : 'visible')"
  ></page-meta>
  <view
    catchtouchmove="true"
    style="height: 100vh; display: flex; flex-direction: column"
  >
    <!-- 导航 -->
    <uv-navbar placeholder left-icon="">
      <template v-slot:center>
        <view
          class="navbar-content"
          :style="{ paddingRight: `${navbarPad}px` }"
        >
          <uv-search
            placeholder="搜索单号、车牌号"
            v-model="keyWord"
            :showAction="false"
            @search="handleSearch"
            @clear="handleSearch"
          ></uv-search>
        </view>
      </template>
    </uv-navbar>
    <!-- end -->
    <!-- tab -->
    <uv-tabs
      :activeStyle="{ fontWeight: 'bold', color: 'var(--title-color)' }"
      :inactiveStyle="{ color: 'var(--sub-color)' }"
      lineWidth="32rpx"
      lineHeight="8rpx"
      :list="tabs"
      @change="changeTabs"
      :scrollable="false"
      lineColor="var(--main-color)"
      :customStyle="{ background: '#ffffff' }"
      :current="current"
    />
    <view class="has-filter" v-if="isKeyWord && !isFiltering">
      已按条件筛选出 {{ total }} 条数据
      <view class="redo" @click="reset">
        <uv-image
          :duration="0"
          src="/static/images/filter/redo.png"
          width="28rpx"
          height="28rpx"
          :custom-style="{ marginRight: '4rpx' }"
        />重置
      </view>
    </view>
    <!-- end -->
    <!-- 列表 -->
    <template v-if="getToken()">
      <my-list
        v-if="current === 0"
        :list="list1"
        rowKey="Id"
        :noMore="noMore1"
        :loading="loading1"
        :fetchData="fetchData1"
      >
        <template #item="{ item }">
          <ManifestItem :record="item" @success="fetchData1(true)" />
        </template>
      </my-list>
      <my-list
        v-if="current === 1"
        :list="list2"
        rowKey="OnwayId"
        :noMore="noMore2"
        :loading="loading2"
        :fetchData="fetchData2"
      >
        <template #item="{ item }">
          <WaybillItem :record="item" @success="fetchData2(true)" />
        </template>
      </my-list>
    </template>
    <my-empty
      height="100%"
      v-else
      showButton
      :text="current === 0 ? '暂无进行中的货单' : '暂无进行中的运单'"
      @confirm="openLoginDrawer"
    />
    <!-- tabbar -->
    <my-tabbar :fixed="false" />
  </view>
  <!-- 登录弹窗 -->
  <my-login-drawer ref="loginDrawer" @success="loginSuccess" />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { getToken } from "@/utils/token.js";
import ManifestItem from "@/pages/manifestList/components/item.vue";
import WaybillItem from "@/pages/waybill/components/item.vue";
import { useAppStore } from "@/stores/app.js";
import {
  GetAssignCarListWithCount,
  GetOnwayOwnerWithCount,
} from "@/api/index.js";
import useList from "@/hooks/useList.js";

const appStore = useAppStore();
onShow(() => {
  appStore.switchTab(2);
});
// 登录
const loginDrawer = ref();
function openLoginDrawer() {
  loginDrawer.value.open();
}
function loginSuccess() {
  uni.reLaunch({
    url: "/pages/task/task",
  });
}
// hack滚动穿透
const show = ref(false);
const navbarPad = ref(0);
onMounted(() => {
  let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
  console.log("menuButtonInfo", menuButtonInfo);
  navbarPad.value = menuButtonInfo.width + 20;
});
// tab
const current = ref(0);
const tabs = ref([
  {
    name: "进行中的货单",
    disabled: !getToken(),
  },
  {
    name: "进行中的运单",
    disabled: !getToken(),
  },
]);
function changeTabs({ name, index }) {
  current.value = index;
  if (index === 0) {
    fetchData1(true);
  }
  if (index === 1) {
    fetchData2(true);
  }
}
// 搜索
const isFiltering = ref(false);
const keyWord = ref("");
const isKeyWord = ref(false);
function handleSearch() {
  isFiltering.value = true;
  isKeyWord.value = !!keyWord.value;
  if (current.value === 0) {
    fetchData1(true);
  }
  if (current.value === 1) {
    fetchData2(true);
  }
}
function reset() {
  keyWord.value = "";
  isKeyWord.value = false;
  if (current.value === 0) {
    fetchData1(true);
  }
  if (current.value === 1) {
    fetchData2(true);
  }
}
const total = ref(0);
// 货单
const inInit1 = ref(false);
const listParams1 = computed(() => {
  return {
    status: 10,
    keyWord: keyWord.value,
  };
});
const {
  list: list1,
  noMore: noMore1,
  loading: loading1,
  total: total1,
  fetchData: fetchData1,
} = useList({
  api: GetAssignCarListWithCount,
  params: listParams1,
});
// 运单列表
const inInit2 = ref(false);
const listParams2 = computed(() => {
  return {
    status: 10,
    keyWord: keyWord.value,
  };
});
const {
  list: list2,
  noMore: noMore2,
  loading: loading2,
  total: total2,
  fetchData: fetchData2,
} = useList({
  api: GetOnwayOwnerWithCount,
  params: listParams2,
});
onShow(() => {
  if (!getToken()) {
    return;
  }
  if (current.value === 0) {
    if (inInit1.value) return;
    inInit1.value = true;
    fetchData1(true);
  }
  if (current.value === 1) {
    if (inInit2.value) return;
    inInit2.value = true;
    fetchData2(true);
  }
});
</script>

<style lang="scss">
page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar-content {
  padding-left: 24rpx;
  width: 100%;
  display: flex;
  align-items: center;
}
.has-filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx;
  height: 72rpx;
  background: #fff1e8;
  font-size: 24rpx;
  color: #fc7e2c;
  font-weight: bold;
  .redo {
    background-color: #fc7e2c;
    height: 48rpx;
    padding: 0 20rpx;
    border-radius: 24rpx;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
  }
}
.task-list {
  padding: 24rpx;
}
.scroll-view {
  flex: 1;
  height: 400px;
}
</style>
