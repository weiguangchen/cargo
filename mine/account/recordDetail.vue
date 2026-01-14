<template>
  <my-empty
    v-if="!isInit"
    img="/static/images/empty/loading.gif"
    text="加载中"
    height="100vh"
  />
  <my-empty
    v-else-if="!hasDataAtLeastOnce && list.length === 0"
    img="/static/images/empty/stat.png"
    text="暂无已核对账单"
    height="100vh"
  />
  <view v-else class="checkbill-container" catchtouchmove="true">
    <view class="list-wrapper">
      <view class="search">
        <my-search-box
          v-model="htKeyword"
          placeholder="物料/车牌/单据号/卸货地/备注"
          :showBtn="false"
          @search="handleSearch"
          @clear="handleSearch"
          @change="handleSearchChange"
        />
      </view>
      <my-empty
        v-if="searching"
        img="/static/images/empty/loading.gif"
        text="查询中"
        class="scroll-view"
      />
      <my-empty
        v-else-if="list.length === 0"
        img="/static/images/empty/stat.png"
        text="没有符合条件的账单"
        class="scroll-view"
      />
      <scroll-view
        v-else
        class="scroll-view"
        scroll-y
        @scrolltolower="getList(false)"
      >
        <view class="date-group" v-for="(item, index) in list" :key="index">
          <view class="item-header">
            <view>{{ formatTimeWithDay(item.DateName) }}</view>
            <view>{{ item.DateCount }}&nbsp;笔</view>
          </view>
          <view class="item-group">
            <view
              v-for="bill in item.BillList"
              :key="bill.Id"
              class="item-wrapper"
              @click="handleSwipeAction(bill)"
            >
              <view class="info-wrapper">
                <view class="material-name uv-line-1">{{
                  bill.MaterialName
                }}</view>
                <view class="weight-info">
                  <text class="total-weight">
                    <text class="num">{{ bill.Suttle }}</text>
                    {{ bill.Unit }}
                  </text>
                  <text
                    v-if="bill.FirstWeight || bill.SecondWeight"
                    class="other-weight"
                  >
                    <template v-if="bill.FirstWeight && bill.SecondWeight">
                      (&nbsp;皮&nbsp;
                      <text class="num">{{ bill.FirstWeight }}</text
                      >&nbsp;丨&nbsp;毛&nbsp;<text class="num">{{
                        bill.SecondWeight
                      }}</text
                      >&nbsp;)
                    </template>
                    <template v-else-if="bill.FirstWeight">
                      (&nbsp;皮&nbsp;<text class="num">{{
                        bill.FirstWeight
                      }}</text
                      >&nbsp;)
                    </template>
                    <template v-else-if="bill.SecondWeight">
                      (&nbsp;毛&nbsp;<text class="num">{{
                        bill.SecondWeight
                      }}</text
                      >&nbsp;)
                    </template>
                  </text>
                </view>
                <view class="logistics-info">
                  <view class="plate">{{ bill.CarNo }}</view>
                  <view v-if="bill.UnloadName" class="unload uv-line-1"
                    ><text style="margin: 0 10rpx">丨</text
                    >{{ bill.UnloadName }}</view
                  >
                </view>
              </view>
              <view class="price-wrapper">
                <view class="total-price"
                  >¥ {{ formatNumberToThousand(bill.Amount, 2) }}</view
                >
                <view class="unit-price"
                  >单价
                  <text class="num"
                    >¥ {{ formatNumberToThousand(bill.Price) }}</text
                  ></view
                >
                <view class="time">{{
                  bill.BillTime ? dayjs(bill.BillTime).format("HH:mm") : ""
                }}</view>
              </view>
            </view>
          </view>
        </view>
        <view style="overflow: hidden">
          <uv-load-more
            :status="!HasNextPage ? 'nomore' : loading ? 'loading' : 'loadmore'"
          />
        </view>
      </scroll-view>
    </view>
    <view class="page-footer">
      <view class="handle-wrapper">
        <text class="total-count"
          >共&nbsp;<text class="num">{{ currentTotals.totalCount }}</text
          >&nbsp;笔</text
        >
        <view class="right-total">
          <template
            v-if="
              !Big(currentTotals.unitT.Suttle).eq(0) ||
              !Big(currentTotals.unitM.Suttle).eq(0)
            "
          >
            <text class="total-weight">
              <template
                v-if="
                  !Big(currentTotals.unitT.Suttle).eq(0) &&
                  !Big(currentTotals.unitM.Suttle).eq(0)
                "
              >
                <text class="num">{{
                  formatNumberToThousand(currentTotals.unitT.Suttle, 2)
                }}</text>
                &nbsp;吨&nbsp;+&nbsp;
                <text class="num">{{
                  formatNumberToThousand(currentTotals.unitM.Suttle, 2)
                }}</text>
                方
              </template>
              <template v-else-if="!Big(currentTotals.unitT.Suttle).eq(0)">
                <text class="num">{{
                  formatNumberToThousand(currentTotals.unitT.Suttle, 2)
                }}</text
                >&nbsp;吨</template
              >
              <template v-else-if="!Big(currentTotals.unitM.Suttle).eq(0)">
                <text class="num">{{
                  formatNumberToThousand(currentTotals.unitM.Suttle, 2)
                }}</text>
                &nbsp;方</template
              >
            </text>
          </template>
          <text class="separator">&nbsp;丨&nbsp;</text>
          <text class="total-price"
            >¥ {{ formatNumberToThousand(currentTotals.totalAmount, 2) }}</text
          >
        </view>
      </view>
      <view class="btns" v-if="recordInfo.Id">
        <view style="flex: 1">
          <uv-button
            text="查看签名"
            :customTextStyle="{
              fontWeight: '500',
              color: 'var(--sub-color)',
              fontSize: '28rpx',
            }"
            color="var(--page-bg)"
            :customStyle="{ height: '96rpx', borderRadius: '16rpx' }"
            @click="openSignImg"
          />
        </view>
      </view>
    </view>
  </view>
  <!-- 查看签名 -->
  <SignImgDrawer
    :recordInfo="recordInfo"
    :agreementInfo="agreementInfo"
    ref="signImgDrawerRef"
  />
</template>

<script setup>
import { ref, unref, computed, getCurrentInstance } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { BillVerifiedList, GetAgreement } from "@/api/index.js";
import dayjs from "dayjs";
import Big from "big.js";
import { formatNumberToThousand } from "@/utils/index.js";
import SignImgDrawer from "./components/SignImgDrawer.vue";
// import debounce from "@/uni_modules/uv-ui-tools/libs/function/debounce.js";

let eventChannel = null;
const isInit = ref(false);
onLoad(async (options) => {
  const instance = getCurrentInstance().proxy;
  eventChannel = instance.getOpenerEventChannel();
  eventChannel.on("acceptDataFromOpenerPage", async (res) => {
    console.log("acceptDataFromOpenerPage", res.data);
    recordInfo.value = res.data ?? {};
    if (res.data.Id && res.data.AgreementId) {
      const agrRes = await GetAgreement({
        agrType: res.data.AgreementId,
        supplyId: res.supplyId,
      });
      agreementInfo.value = agrRes;
    }
  });
  console.log(options);
  cusId.value = options.cusId ?? "";
  supplyId.value = options.supplyId ?? "";
  reconId.value = options.reconId ?? "";
  await getList(true);
  // 初始化完成
  isInit.value = true;
});

// 记录信息
const recordInfo = ref({});
// 协议信息
const agreementInfo = ref(null);
const cusId = ref("");
const supplyId = ref("");
const reconId = ref("");
const loading = ref(false);
const searching = ref(false);
const list = ref([]);
const htKeyword = ref("");
// 分页相关
const lastCursor = ref("");
const HasNextPage = ref(true);
const pageSize = 10;

/**
 * 格式化时间，如果是今天或昨天则拼接标识
 */
function formatTimeWithDay(dateStr) {
  if (!dateStr) return "";

  const targetDate = dayjs(dateStr);
  const today = dayjs().startOf("day");
  const yesterday = dayjs().subtract(1, "day").startOf("day");

  if (targetDate.isSame(today, "day")) {
    return `${dateStr}（今天）`;
  } else if (targetDate.isSame(yesterday, "day")) {
    return `${dateStr}（昨天）`;
  }

  return dateStr;
}

// 获取列表数据
const hasDataAtLeastOnce = ref(false);
async function getList(refresh = false) {
  if (!refresh && !unref(HasNextPage)) return;
  if (unref(loading)) return;

  loading.value = true;
  try {
    const res = await BillVerifiedList({
      lastCursor: refresh ? "" : unref(lastCursor),
      pageSize,
      cusId: unref(cusId),
      supplyId: unref(supplyId),
      reconId: unref(reconId),
      htKeyword: unref(htKeyword),
    });
    list.value = refresh ? res.list : mergeDateList(unref(list), res.list);
    HasNextPage.value = res.HasNextPage;
    lastCursor.value = res.NextCursor;

    const unitT = res?.unitList?.find((item) => item.Unit === "吨") ?? {
      Unit: "吨",
      Suttle: 0,
    };
    const unitM = res?.unitList?.find((item) => item.Unit === "方") ?? {
      Unit: "方",
      Suttle: 0,
    };
    currentTotals.value = {
      unitT,
      unitM,
      totalAmount: res.totalAmount ?? 0,
      totalCount: res.totalCount ?? 0,
    };

    if (unref(list).length > 0) {
      hasDataAtLeastOnce.value = true;
    }
  } catch (err) {
    console.log("getList error:", err);
  } finally {
    loading.value = false;
  }
}

/**
 * 合并相同日期的数据
 * @param {Array} existingList - 已存在的列表
 * @param {Array} newList - 新加载的列表
 * @returns {Array} 合并后的列表
 */
function mergeDateList(existingList, newList) {
  if (!existingList || existingList.length === 0) return newList;
  if (!newList || newList.length === 0) return existingList;

  const result = [...existingList];

  for (const newItem of newList) {
    const existingIndex = result.findIndex(
      (item) => item.DateName === newItem.DateName
    );

    if (existingIndex !== -1) {
      // 相同日期，合并 BillList 并更新 DateCount
      result[existingIndex].BillList = [
        ...result[existingIndex].BillList,
        ...newItem.BillList,
      ];
    } else {
      // 新日期，直接追加
      result.push(newItem);
    }
  }

  return result;
}

async function handleSearch() {
  searching.value = true;
  getList(true);
  searching.value = false;
}

// function handleSearchChange(value) {
//   console.log("handleSearchChange", value);
//   debounce(function () {
//     console.log("searchChange", value);
//     getList(true);
//   }, 500);
// }

// 前端展示当前总计
const currentTotals = ref({
  unitT: {
    Unit: "吨",
    Suttle: 0,
  },
  unitM: {
    Unit: "方",
    Suttle: 0,
  },
  totalAmount: 0,
  totalCount: 0,
});

// 侧滑按钮
const options = ref([
  {
    text: "详情",
    style: {
      backgroundColor: "#B0BECC",
      fontSize: "26rpx",
      width: "160rpx",
      fontWeight: 500,
    },
  },
]);

function handleSwipeAction(bill, item) {
  console.log("handleSwipeAction", bill, item);
  if (!bill.OnwayId) {
    uni.showToast({
      title: "该记录暂无详情",
      icon: "none",
    });
    return;
  }
  uni.navigateTo({
    url: `/pages/billDetail/billDetail?onwayId=${bill.OnwayId}&supplyId=${unref(
      supplyId
    )}`,
  });
}

// 查看签名
const signImgDrawerRef = ref();
function openSignImg() {
  unref(signImgDrawerRef).open();
}
</script>

<style lang="scss">
.checkbill-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .inner-container {
    display: flex;
    height: 0;
    flex: 1;
  }

  .list-wrapper {
    height: 0;
    display: flex;
    flex-direction: column;
    flex: 1;
    .search {
      flex: none;
      padding: 20rpx 24rpx 8rpx;
    }
    .scroll-view {
      height: 0;
      flex: 1;
    }
  }
  .page-footer {
    position: relative;
    padding: 0 0 max(var(--safe-area-inset-bottom), var(--safe-bottom));
    .handle-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 26rpx;
      padding: 18rpx 32rpx;
      .total-count {
        flex: none;
        color: var(--sub-color);
        margin-right: 24rpx;
        .num {
          font-family: misans500;
          color: #fc7e2c;
        }
      }
      .right-total {
      }
      .total-weight {
        color: var(--sub-color);
        .num {
          font-family: misans500;
          color: var(--dark-main);
        }
      }
      .total-price {
        flex: none;
        font-family: misans500;
        color: var(--red-color);
      }
      .separator {
        color: var(--divider);
        // margin: 0 10rpx;
      }
    }
    .btns {
      padding: 16rpx 24rpx 0;
    }
  }
}

.scroll-view {
  .date-group {
    position: relative;
  }
  .item-header {
    position: sticky;
    top: 0;
    z-index: 100;
    font-family: misans400;
    padding: 0 32rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 26rpx;
    color: var(--intr-color);
    line-height: 36rpx;
    background-color: var(--page-bg);
  }
  .item-wrapper {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 32rpx 24rpx 28rpx;
    .info-wrapper {
      flex: 1;
      margin-right: 26rpx;
      .material-name {
        font-weight: bold;
        font-size: 30rpx;
        color: var(--title-color);
        line-height: 40rpx;
        margin-bottom: 8rpx;
      }
      .weight-info {
        margin-bottom: 8rpx;
        font-size: 26rpx;
        line-height: 36rpx;
        .total-weight {
          color: var(--content-color);
          .num {
            font-family: misans500;
            color: var(--dark-main);
          }
        }
        .other-weight {
          color: var(--intr-color);
          margin-left: 4rpx;
          .num {
            font-family: misans500;
            color: var(--content-color);
          }
        }
      }
      .logistics-info {
        display: flex;
        align-items: center;
        font-size: 26rpx;
        .plate {
          flex: none;
          font-family: misans500;
        }
        .unload {
          width: 0;
          flex: 1;
          color: var(--intr-color);
        }
      }
    }
    .price-wrapper {
      text-align: right;
      .total-price {
        font-family: misans500;
        line-height: 40rpx;
        color: var(--red-color);
        margin-bottom: 8rpx;
      }
      .unit-price {
        color: var(--intr-color);
        margin-bottom: 8rpx;
        font-size: 26rpx;
        line-height: 36rpx;
        .num {
          font-family: misans500;
          color: var(--content-color);
          margin-left: 8rpx;
        }
      }
      .time {
        font-size: 26rpx;
        color: var(--intr-color);
      }
    }
  }

  .item-group {
    .item-wrapper {
      &:not(:last-child) {
        border-bottom: 1rpx solid var(--divider);
      }
    }
  }
}
</style>
