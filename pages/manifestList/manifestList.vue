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
            placeholder="搜索货单号、车牌号"
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
      :current="current"
      :activeStyle="{ fontWeight: 'bold', color: 'var(--title-color)' }"
      :inactiveStyle="{ color: 'var(--sub-color)' }"
      lineWidth="32rpx"
      lineHeight="8rpx"
      :list="tabs"
      @change="changeTabs"
      :scrollable="false"
      lineColor="var(--main-color)"
      :customStyle="{ background: '#ffffff' }"
      :loading="loading"
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
    <ListComponent
      :list="list"
      :noMore="noMore"
      :loading="loading"
      :fetchData="fetchData"
    />
    <!-- end -->
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { onLoad, onUnload, onShow } from "@dcloudio/uni-app";
import Item from "./components/item.vue";
import ListComponent from "./components/ListComponent.vue";
import { GetAssignCarListWithCount, GetAssignDetail } from "@/api/index.js";
import FilterDrawer from "./components/FilterDrawer.vue";
import useList from "@/hooks/useList.js";

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
// tab [1]正常[2]等待暂停[3]已暂停[4]等待完结[5]已完结
const status = ref("");
const current = ref(0);
const tabs = ref([
  {
    name: "全部",
    value: "",
  },
  {
    name: "进行中",
    value: "10",
  },
  {
    name: "已暂停",
    value: "3",
  },
  {
    name: "已完结",
    value: "5",
  },
]);
function changeTabs({ name, index }) {
  console.log(index, name);
  status.value = tabs.value?.find((m) => m.name === name)?.value ?? "";
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
  await fetchData(true);
  isFiltering.value = false;
}
const keyWord = ref("");
const isKeyWord = ref(false);
async function handleSearch() {
  isFiltering.value = true;
  isKeyWord.value = !!keyWord.value;
  await fetchData(true);
  isFiltering.value = false;
}
// 列表
const params = ref({});
function reset() {
  keyWord.value = "";
  isKeyWord.value = false;
  filter.value.reset();
}

// 货单列表
const listParams = computed(() => {
  const { dateMode, date, ...rest } = params.value;
  console.log("listParams", params.value);
  return {
    status: status.value,
    keyWord: keyWord.value,
    ...rest,
  };
});
const { list, noMore, loading, total, fetchData } = useList({
  api: GetAssignCarListWithCount,
  params: listParams,
});

// 定义列表操作
const handleMap = {
  pause: async (record) => {
    console.log("pause", record);
    const res = await GetAssignDetail({
      assignId: record.Id,
      supplyId: record.Supply,
    });
    if (status.value === "") {
      updateItem(record, res);
    } else {
      // 等待暂停
      if (res.Status === "2") {
        updateItem(record, res);
      } else {
        hideItem(record);
      }
    }
  },
  goOn: async (record) => {
    console.log("goOn", record);
    const res = await GetAssignDetail({
      assignId: record.Id,
      supplyId: record.Supply,
    });
    if (status.value === "3") {
      hideItem(record);
    } else {
      updateItem(record, res);
    }
  },
  finish: async (record) => {
    console.log("finish", record);
    const res = await GetAssignDetail({
      assignId: record.Id,
      supplyId: record.Supply,
    });
    if (status.value === "") {
      updateItem(record, res);
    } else {
      // 等待完结
      if (res.Status === "4") {
        updateItem(record, res);
      } else {
        hideItem(record);
      }
    }
  },
};
// 从前端缓存中隐藏数据
function hideItem(record) {
  total.value--;
  list.value = list.value.map((item) => {
    if (item.Id === record.Id) {
      item._isShow = false;
    }
    return item;
  });
}
// 更新前端缓存列表中数据
async function updateItem(record, res) {
  list.value = list.value.map((item) => {
    if (item.Id === record.Id) {
      item.Status = res.Status;
    }
    return item;
  });
}
// 监听事件
onLoad(() => {
  status.value = "10";
  current.value = 1;
  fetchData(true);
  for (let key in handleMap) {
    uni.$on(`manifest:${key}`, handleMap[key]);
  }
});
// 卸载事件
onUnload(() => {
  for (let key in handleMap) {
    uni.$off(`manifest:${key}`, handleMap[key]);
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
