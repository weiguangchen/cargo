<template>
  <page-meta
    :page-style="`overflow:${show ? 'hidden' : 'visible'}`"
  ></page-meta>
  <view class="page-container" v-if="pageInit">
    <!-- 导航 -->
    <uv-navbar placeholder @leftClick="leftClick">
      <template #center>
        <view
          class="navbar-content"
          :style="{ paddingRight: `${navbarPad}px` }"
        >
          <view class="filter-info">
            <view class="date">{{ title }}</view>
            <view class="mfrs">{{ ownerName }}</view>
          </view>
          <FilterDrawer
            v-model="params"
            ref="filter"
            :ownerOptions="ownerOptions"
            :supplyId="supplyId"
            @change="changeFilter"
            @visibleChange="visibleChange"
          />
        </view>
      </template>
    </uv-navbar>
    <my-empty
      v-if="!supplyId"
      text="暂无已签约生产企业"
      img="/static/images/empty/stat.png"
    />
    <template v-else>
      <view class="stat">
        <view class="item-wrapper box1">
          <view class="title">合计金额（元）</view>
          <view class="amount">{{ formatNumberToThousand(totalAmount) }}</view>
        </view>
        <view class="total-wrapper">
          <view class="item-wrapper box2">
            <view class="title">合计重量（吨）</view>
            <view class="amount">{{
              formatNumberToThousand(totalWeight)
            }}</view>
          </view>
          <view class="item-wrapper box3">
            <view class="title">合计车次</view>
            <view class="amount">{{ formatNumberToThousand(carTimes) }}</view>
          </view>
        </view>
      </view>
      <view style="padding: 20rpx 24rpx">
        <my-tabs
          v-model="status"
          mode="multiple"
          :list="tabbarList"
          :loading="loading"
          @change="changeTab"
        />
      </view>
      <view class="list-wrapper" v-if="list.length > 0">
        <Item
          v-for="(item, index) in list"
          :status="status"
          :record="item"
          :key="index"
        />
        <uv-load-more
          :status="noMore ? 'nomore' : loading ? 'loading' : 'loadmore'"
          nomoreText="- 仅供参考，请以生产企业实际核对数据为准 -"
        />
      </view>
      <template v-else>
        <my-empty
          v-if="loading"
          img="/static/images/empty/loading.gif"
          text="查询中"
        />
        <my-empty
          v-else
          text="暂无数据"
          img="/static/images/empty/statistics.png"
        />
      </template>
    </template>
  </view>

  <SelectSupply
    v-model="params.supplyId"
    ref="selectSupply"
    :options="supplyOptions"
    @change="changeSupply"
  />
</template>

<script setup>
import { ref, unref, computed, onMounted, watch } from "vue";
import FilterDrawer from "./components/FilterDrawer.vue";
import {
  GetownerTotalsupply,
  GetOwnerSupplyList,
  GetOwnerFilterList,
} from "@/api/index.js";
import { formatNumberToThousand } from "@/utils/index.js";
import dayjs from "dayjs";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import useList from "@/hooks/useList.js";
import SelectSupply from "./components/SelectSupply.vue";
import Item from "./components/item.vue";

// 生产企业选择
const selectSupply = ref(null);
const supplyOptions = ref([]);
const supplyId = ref("");
// const supplyName = computed(() => {
//   const find = supplyOptions.value.find((m) => m.value === supplyId.value);
//   return find?.label ?? "";
// });
async function getSupplyOptions() {
  try {
    const res = await GetOwnerSupplyList();
    supplyOptions.value = res?.map((m) => ({
      value: m.Id,
      label: m.Name,
    }));
    return res;
  } catch (err) {
    console.log("getSupplyOptions", err);
    return [];
  }
}
async function changeSupply(value) {
  console.log("changeSupply", value);
  supplyId.value = value;
  pageInit.value = true;
  await getOwnerOptions();
  fetchData(true);
}
// 货主选择
const ownerOptions = ref([]);
const ownerName = computed(() => {
  return (
    ownerOptions.value.find((m) => m.value === params.value.ownerId)?.label ??
    "全部货主公司"
  );
});
async function getOwnerOptions() {
  const res = await GetOwnerFilterList({
    supplyId: unref(supplyId),
  });
  ownerOptions.value = res?.map((m) => ({
    value: m.ownerId,
    label: m.ownerName,
  }));
  if (ownerOptions.value.length === 1) {
    params.value.ownerId = ownerOptions.value[0].value;
  }
}

const pageInit = ref(false);
async function init() {
  await getSupplyOptions();
  if (supplyOptions.value.length > 1) {
    selectSupply.value.open();
  } else if (supplyOptions.value.length === 1) {
    supplyId.value = supplyOptions.value[0]?.value ?? "";
    pageInit.value = true;
    await getOwnerOptions();
    fetchData(true);
  } else {
    ownerOptions.value = [
      {
        value: "",
        label: "暂无签约的货主公司",
      },
    ];
    supplyId.value = "";
    pageInit.value = true;
  }
}

onLoad(() => {
  init();
});

const status = ref(["isMat"]);
const tabbarList = ref([
  {
    value: "isMat",
    label: "区分物料",
  },
  {
    value: "isUnLoad",
    label: "区分卸货地",
  },
  {
    value: "isCarno",
    label: "区分车辆",
  },
]);

// 筛选
const totalAmount = ref(0);
const totalWeight = ref(0);
const carTimes = ref(0);
const params = ref({
  ownerId: "",
  dateMode: "今天",
  startTime: dayjs().format("YYYY-MM-DD"),
  endTime: dayjs().format("YYYY-MM-DD"),
});
const listParams = computed(() => {
  const { startTime, endTime, ownerId } = params.value;
  const isMat = status.value.includes("isMat") ? 1 : 0;
  const isUnLoad = status.value.includes("isUnLoad") ? 1 : 0;
  const isCarno = status.value.includes("isCarno") ? 1 : 0;
  return {
    ownerId,
    supplyId: unref(supplyId),
    startTime,
    endTime,
    isMat,
    isUnLoad,
    isCarno,
  };
});
const { list, noMore, loading, fetchData } = useList({
  api: GetownerTotalsupply,
  params: listParams,
  callback(res) {
    console.log("callback", res);
    totalAmount.value = res.totalAmount || 0;
    totalWeight.value = res.totalWeight || 0;
    carTimes.value = res.carTimes || 0;
  },
});

const title = computed(() => {
  console.log("title", unref(params));
  let date = "";
  if (unref(params).startTime === unref(params).endTime) {
    if (unref(params).startTime === dayjs().format("YYYY-MM-DD")) {
      date = "今日";
    } else if (
      unref(params).startTime ===
      dayjs().subtract(1, "day").format("YYYY-MM-DD")
    ) {
      date = "昨日";
    } else {
      date = `${dayjs(unref(params).startTime).format("MM.DD")} `;
    }
  } else {
    if (
      unref(params).startTime ===
        dayjs().startOf("month").format("YYYY-MM-DD") &&
      unref(params).endTime === dayjs().format("YYYY-MM-DD")
    ) {
      date = "本月";
    } else if (
      unref(params).startTime ===
        dayjs().subtract(6, "day").format("YYYY-MM-DD") &&
      unref(params).endTime === dayjs().format("YYYY-MM-DD")
    ) {
      date = "近 7 日";
    } else if (
      unref(params).startTime ===
        dayjs().subtract(29, "day").format("YYYY-MM-DD") &&
      unref(params).endTime === dayjs().format("YYYY-MM-DD")
    ) {
      date = "近 30 日";
    } else {
      date = `${dayjs(unref(params).startTime).format("MM.DD")} - ${dayjs(
        unref(params).endTime
      ).format("MM.DD")} `;
    }
  }

  return `${date}统计`;
});

function changeTab() {
  fetchData(true);
}
onReachBottom(() => {
  const last = unref(list)[unref(list).length - 1];
  fetchData(false, {
    Id: last?.Id,
    timeStamp: last?.Paytime ? dayjs(last?.Paytime).valueOf() : "",
  });
});

const filter = ref();
async function changeFilter(data) {
  console.log("changeFilter", data);
  if (!unref(supplyId)) return;
  params.value = data;
  await fetchData(true);
}

// 自定义导航条
const show = ref(false);
function leftClick() {
  uni.navigateBack();
}
const navbarPad = ref(0);
function getNavbarPad() {
  let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
  navbarPad.value = menuButtonInfo.width + 20;
}
onMounted(() => {
  getNavbarPad();
});

function visibleChange(res) {
  show.value = res;
}
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar-content {
  padding: 0 0 0 46px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .filter-info {
    .date {
      font-weight: bold;
      font-size: 34rpx;
      color: var(--title-color);
      line-height: 48rpx;
    }
    .mfrs {
      font-size: 24rpx;
      color: var(--sub-color);
      line-height: 40rpx;
    }
  }
}

.stat {
  padding: 24rpx;
  background-color: #ffffff;
  .item-wrapper {
    flex: 1;
    padding: 32rpx 32rpx 28rpx;
    border-radius: 24rpx;
    .title {
      font-weight: bold;
      font-size: 28rpx;
      color: var(--title-color);
      line-height: 40rpx;
      margin-bottom: 12rpx;
    }
    .amount {
      font-weight: bold;
      font-size: 36rpx;
      color: var(--red-color);
      line-height: 48rpx;
    }
  }
  .total-wrapper {
    display: flex;
  }
  .box1 {
    background: url(/static/images/account/icon1.png) no-repeat right 12rpx top
      12rpx/72rpx 72rpx rgba(241, 89, 72, 0.08);
    margin-bottom: 24rpx;
    .amount {
      color: var(--red-color);
    }
  }
  .box2 {
    background: url(/static/images/account/icon2.png) no-repeat right 12rpx top
      12rpx/72rpx 72rpx rgba(2, 183, 46, 0.08);
    margin-right: 22rpx;
    .amount {
      color: var(--main-color);
    }
  }
  .box3 {
    background: url(/static/images/account/icon3.png) no-repeat right 12rpx top
      12rpx/72rpx 72rpx rgba(252, 126, 44, 0.08);
    .amount {
      color: #fc7e2c;
    }
  }
}

.list-wrapper {
  padding: 0 24rpx 24rpx;
  .item {
    padding: 24rpx;
    background: #ffffff;
    border-radius: 24rpx;
    margin-bottom: 20rpx;

    .item-wrapper {
      background: var(--page-bg);
      border-radius: 16rpx;
      padding: 0 24rpx;
      margin-bottom: 24rpx;
      .item-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 26rpx;
        color: var(--content-color);
        padding: 24rpx 0 24rpx 4rpx;
        line-height: 48rpx;
        &:not(:last-child) {
          border-bottom: 1px solid #c8d4df;
        }
        .value {
          font-weight: bold;
          color: var(--title-color);
        }
      }
    }
    .info-box {
      text-align: center;
      .title {
        font-size: 26rpx;
        color: var(--content-color);
        line-height: 48rpx;
        margin-bottom: 4rpx;
      }
      .num {
        font-weight: bold;
        font-size: 30rpx;
        color: var(--title-color);
        line-height: 48rpx;
      }
    }
  }
}
</style>
