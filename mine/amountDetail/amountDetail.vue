<template>
  <page-meta :page-style="`overflow:${show ? 'hidden' : 'visible'}`" />
  <view class="page-container">
    <!-- 导航 -->
    <uv-navbar placeholder @leftClick="leftClick">
      <template #center>
        <view
          class="navbar-content"
          :style="{ paddingRight: `${navbarPad}px` }"
        >
          <view class="filter-info">
            <view class="date">{{ title }}</view>
            <view class="mfrs">{{ customerName }}</view>
          </view>
          <FilterDrawer v-model="params" ref="filter" @change="changeFilter" />
        </view>
      </template>
    </uv-navbar>
    <view class="stat">
      <view class="item-wrapper box1">
        <view class="title">合计支付（元）</view>
        <view class="amount">{{ formatNumberToThousand(payAmountTotal) }}</view>
      </view>
      <view class="total-wrapper">
        <view class="item-wrapper box2">
          <view class="title">合计充值（元）</view>
          <view class="amount">{{
            formatNumberToThousand(inAmountTotal)
          }}</view>
        </view>
        <view class="item-wrapper box3">
          <view class="title">合计调价 (元)</view>
          <view class="amount">{{ formatNumberToThousand(wegAdjTotal) }}</view>
        </view>
      </view>
    </view>
    <view style="padding: 20rpx 24rpx">
      <my-tabs
        v-model="status"
        :list="tabbarList"
        :loading="loading"
        @change="changeTab"
      />
    </view>

    <view class="list-wrapper" v-if="list.length > 0">
      <view
        v-for="item in list"
        class="item"
        :class="{
          recharge: item.Paytype === 'itemSK',
          pay: item.Paytype === 'itemCCJS',
          refund: item.Paytype === 'itemTJFK' || item.Paytype === 'itemTBFK',
          deduction: item.Paytype === 'itemTJKK',
        }"
      >
        <view class="title">
          <view class="type">
            <template v-if="item.Paytype === 'itemSK'">充值</template>
            <template v-if="item.Paytype === 'itemCCJS'">支付</template>
            <template
              v-if="item.Paytype === 'itemTJFK' || item.Paytype === 'itemTBFK'"
              >退款</template
            >
            <template v-if="item.Paytype === 'itemTJKK'">扣款</template>
          </view>
          <view class="date">{{
            dayjs(item.Paytime).format("YYYY-MM-DD HH:mm")
          }}</view>
        </view>
        <view class="info">{{ item.Msg }}</view>
        <view class="amount-box">
          <view class="amount">
            <template
              v-if="['itemSK', 'itemTJFK', 'itemTBFK'].includes(item.Paytype)"
              >+
            </template>
            <template v-else>- </template>
            {{ item.Amount }}
          </view>
          <view class="rest"> 余额：{{ item.TotalBalance || "-" }}</view>
        </view>
      </view>
      <uv-load-more
        :status="!HasNextPage ? 'nomore' : loading ? 'loading' : 'loadmore'"
      />
    </view>
    <template v-else>
      <my-empty
        v-if="loading"
        img="/static/images/empty/loading.gif"
        text="查询中"
      />
      <my-empty v-else text="暂无数据" img="/static/images/empty/stat.png" />
    </template>
  </view>
</template>

<script setup>
import { ref, unref, computed, onMounted, getCurrentInstance } from "vue";
import FilterDrawer from "./components/FilterDrawer.vue";
import { GetCustomerAmountDetail } from "@/api/index.js";
import { formatNumberToThousand } from "@/utils/index.js";
import dayjs from "dayjs";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";

const customerId = ref("");
const supplyId = ref("");
const customerName = ref("");
onLoad(() => {
  const instance = getCurrentInstance().proxy;
  const eventChannel = instance.getOpenerEventChannel();

  eventChannel.on("acceptDataFromOpenerPage", function (data) {
    console.log("acceptDataFromOpenerPage", data);
    customerId.value = data?.customerId ?? "";
    supplyId.value = data?.supplyId ?? "";
    customerName.value = data?.customerName ?? "";

    getList(true);
  });
});

const status = ref("");
const tabbarList = ref([
  {
    value: "",
    label: "全部",
  },
  {
    value: "js",
    label: "支付",
  },
  {
    value: "sk",
    label: "充值",
  },
  {
    value: "qt",
    label: "调价",
  },
]);

// 筛选
const payAmountTotal = ref(0);
const inAmountTotal = ref(0);
const wegAdjTotal = ref(0);
const params = ref({
  dateMode: "今天",
  startTime: dayjs().format("YYYY-MM-DD"),
  endTime: dayjs().format("YYYY-MM-DD"),
});

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
    const { startTime, endTime } = unref(params);
    const newParams = {
      lastCursor: refresh ? "" : unref(lastCursor),
      pageSize,
      customerId: unref(customerId),
      supplyId: unref(supplyId),
      payType: unref(status),
      startTime,
      endTime,
    };
    const res = await GetCustomerAmountDetail(newParams);
    list.value = refresh ? res.list : [...list.value, ...res.list];
    HasNextPage.value = res.HasNextPage;
    lastCursor.value = res.NextCursor;

    payAmountTotal.value = res.payAmountTotal;
    inAmountTotal.value = res.inAmountTotal;
    wegAdjTotal.value = res.wegAdjTotal;
  } catch (err) {
    console.log("err", err);
  } finally {
    loading.value = false;
  }
}

const title = computed(() => {
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

  return `${date}账单`;
});

function changeTab(value) {
  status.value = value;
  getList(true);
}
onReachBottom(() => {
  getList();
});

const filter = ref();
const isFiltering = ref(false);
async function changeFilter(data) {
  console.log("changeFilter", data);
  isFiltering.value = true;
  params.value = data;
  await getList(true);
  isFiltering.value = false;
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
    padding: 28rpx 28rpx 24rpx;
    background: #ffffff;
    border-radius: 24rpx;
    margin-bottom: 20rpx;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 48rpx;
      .type {
        font-size: 32rpx;
        color: var(--title-color);
        font-weight: bold;
      }
      .date {
        color: var(--intr-color);
        font-size: 24rpx;
      }
    }
    .info {
      font-size: 24rpx;
      color: var(--sub-color);
      line-height: 40rpx;
    }
    .amount-box {
      margin-top: 12rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 48rpx;
      .amount {
        font-weight: bold;
        font-size: 34rpx;
        color: var(--red-color);
      }
      .rest {
        font-size: 24rpx;
        color: var(--intr-color);
      }
    }

    &.recharge {
      .amount {
        color: var(--main-color);
      }
    }
    &.pay {
      .amount {
        color: var(--red-color);
      }
    }
    &.refund {
      .amount {
        color: #fc7e2c;
      }
    }
    &.deduction {
      .amount {
        color: #fc7e2c;
      }
    }
  }
}
</style>
