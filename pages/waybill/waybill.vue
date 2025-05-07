<template>
  <page-meta
    :page-style="'overflow:' + (show ? 'hidden' : 'visible')"
  ></page-meta>
  <view
    catchtouchmove="true"
    style="height: 100vh; display: flex; flex-direction: column"
  >
    <!-- 导航 -->
    <uv-navbar placeholder @leftClick="leftClick">
      <template #center>
        <view
          class="navbar-content"
          :style="{ paddingRight: `${navbarPad}px` }"
        >
          <uv-search
            placeholder="搜索运单号、车牌号"
            v-model="keyWord"
            :showAction="false"
            @search="handleSearch"
            @clear="handleSearch"
          ></uv-search>
          <FilterDrawer ref="filter" @change="changeFilter" />
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
    />
    <view
      class="has-filter"
      v-if="(isFilter && !isFiltering) || (isKeyWord && !isFiltering)"
    >
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
    <my-list :list="list" rowKey="OnwayId" :noMore="noMore" :loading="loading" :fetchData="fetchData">
      <template #item="{ item }">
        <Item :record="item" @success="fetchData(true)" />
      </template>
    </my-list>
    <!-- end -->
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getToken } from "@/utils/token.js";
import Item from "./components/item.vue";
import { GetOnwayOwnerWithCount } from "@/api/index.js";
import FilterDrawer from "./components/FilterDrawer.vue";
import useList from '@/hooks/useList.js'
import { computed } from "vue";
// hack滚动穿透
const show = ref(false);

// 自定义导航条
function leftClick() {
  uni.navigateBack();
}
const navbarPad = ref(0);
onMounted(() => {
  let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
  console.log("menuButtonInfo", menuButtonInfo);
  navbarPad.value = menuButtonInfo.width + 20;
});
// tab
const status = ref();
const tabs = ref([
  {
    name: "全部",
    value: "",
  },
  {
    name: "已接单",
    value: "10",
  },
  {
    name: "已完成",
    value: "8",
  },
  {
    name: "已取消",
    value: "9",
  },
]);
function changeTabs({ value }) {
  status.value = value;
  fetchData(true);
}
// 筛选
const filter = ref();
const isFilter = ref(false);
const isFiltering = ref(false);
async function changeFilter(data) {
  console.log("changeFilter", data);
  isFiltering.value = true;
  isFilter.value = data.isFilter;
  params.value = data.params;
  await fetchData(true)
  isFiltering.value = false;
}
const keyWord = ref("");
const isKeyWord = ref(false);
async function handleSearch() {
  isFiltering.value = true;
  isKeyWord.value = !!keyWord.value;
  await fetchData(true)
  isFiltering.value = false;
}
// 运单列表
onLoad(() => {
  fetchData(true);
});
const params = ref({});
function reset() {
  keyWord.value = "";
  isKeyWord.value = false;
  filter.value.reset();
}
// 运单列表
const listParams = computed(() => {
  const { dateMode, date, ...rest } = params.value;
  return {
    status: status.value,
    keyword: keyWord.value,
    ...rest,
  };
});
const { list, noMore, loading, total, fetchData } = useList({
  api: GetOnwayOwnerWithCount,
  params: listParams,
});
</script>

<style lang="scss">
page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar-content {
  padding-left: 46px;
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

.bill-list {
  padding: 24rpx;
}

.scroll-view {
  flex: 1;
  height: 400px;
}
</style>
