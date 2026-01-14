<template>
  <page-meta
    :page-style="`overflow:${disabledScroll ? 'hidden' : 'visible'}`"
  />
  <view class="checkbill-container" catchtouchmove="true">
    <my-empty
      v-if="!isInit"
      img="/static/images/empty/loading.gif"
      text="查询中"
      height="100vh"
    />
    <view v-else class="list-wrapper">
      <my-empty
        v-if="!hasDataAtLeastOnce"
        img="/static/images/empty/stat.png"
        text="暂无可核对账单"
      />
      <template v-else>
        <view class="search">
          <my-search-box
            v-model="htKeyword"
            placeholder="物料/车牌/单据号/卸货地/备注"
            :showBtn="false"
            @search="handleSearch"
            @clear="handleSearch"
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
          <uv-swipe-action>
            <view class="date-group" v-for="(item, index) in list" :key="index">
              <view class="item-header">
                <view>{{ formatTimeWithDay(item.DateName) }}</view>
                <view>{{ item.DateCount }}&nbsp;笔</view>
              </view>
              <view class="item-group">
                <uv-swipe-action-item
                  :options="options"
                  v-for="bill in item.BillList"
                  :key="bill.Id"
                  @click="(item) => handleSwipeAction(bill, item)"
                >
                  <view class="item-wrapper" @click="handleItemCheck(bill)">
                    <view class="checkbox">
                      <uv-icon
                        v-if="getItemCheck(bill)"
                        name="/static/images/ui/checkbox-active.png"
                        width="32rpx"
                        height="32rpx"
                      />
                      <uv-icon
                        v-else
                        name="/static/images/ui/checkbox.png"
                        width="32rpx"
                        height="32rpx"
                      />
                    </view>
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
                          <template
                            v-if="bill.FirstWeight && bill.SecondWeight"
                          >
                            (&nbsp;皮&nbsp;<text class="num">{{
                              bill.FirstWeight
                            }}</text
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
                        bill.BillTime
                          ? dayjs(bill.BillTime).format("HH:mm")
                          : ""
                      }}</view>
                    </view>
                  </view>
                </uv-swipe-action-item>
              </view>
            </view>
          </uv-swipe-action>
          <view style="overflow: hidden">
            <uv-load-more
              :status="
                !hasMoreData() ? 'nomore' : loading ? 'loading' : 'loadmore'
              "
            />
          </view>
        </scroll-view>
      </template>
    </view>
    <view class="page-footer">
      <view class="handle-wrapper" v-if="hasDataAtLeastOnce">
        <view class="checkall" @click="handleCheckAll">
          <uv-icon
            v-if="isAllSelected"
            name="/static/images/ui/checkbox-active.png"
            width="32rpx"
            height="32rpx"
          />
          <uv-icon
            v-else
            name="/static/images/ui/checkbox.png"
            width="32rpx"
            height="32rpx"
          />
          <text style="margin-left: 16rpx">全选</text>
        </view>
        <view class="total-wrapper">
          <template v-if="isShowTotal">
            <text class="total-weight">
              <template
                v-if="
                  !Big(currentTotals.unitT.Suttle).eq(0) &&
                  !Big(currentTotals.unitM.Suttle).eq(0)
                "
              >
                <text class="num">{{
                  formatNumberToThousand(currentTotals.unitT.Suttle, 2)
                }}</text
                >&nbsp;吨&nbsp;+&nbsp;
                <text class="num">{{
                  formatNumberToThousand(currentTotals.unitM.Suttle, 2)
                }}</text
                >&nbsp;方
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
                }}</text
                >&nbsp;方</template
              >
            </text>
            <text class="separator">丨</text>
          </template>
          <text class="total-price"
            >¥ {{ formatNumberToThousand(currentTotals.totalAmount, 2) }}</text
          >
        </view>
      </view>
      <view class="btns">
        <view class="left">
          <uv-button
            text="对账记录"
            :customTextStyle="{
              fontWeight: 500,
              color: 'var(--sub-color)',
            }"
            color="var(--page-bg)"
            :customStyle="{
              height: '96rpx',
              borderRadius: '16rpx',
            }"
            @click="openRecord"
          />
        </view>
        <view class="right">
          <uv-button
            v-if="isShowTotal"
            :text="`确认所选 ${selectedCount} 笔无误`"
            :customTextStyle="{
              fontWeight: 500,
              color: '#ffffff',
            }"
            color="var(--main-color)"
            :customStyle="{
              height: '96rpx',
              borderRadius: '16rpx',
            }"
            @click="handleConfirm"
          />
          <uv-button
            v-else
            text="请选择"
            :customTextStyle="{
              fontWeight: 500,
              color: '#ffffff',
            }"
            disabled
            color="#C8D4DF"
            :customStyle="{
              height: '96rpx',
              borderRadius: '16rpx',
            }"
          />
        </view>
      </view>
    </view>
  </view>
  <!-- 签字版 -->
  <SignDrawer
    ref="signRef"
    :supplyId="supplyId"
    :agreementInfo="agreementInfo"
    @success="handleSignSuccess"
    @change="(show) => (disabledScroll = show)"
  />
  <!-- 成功弹窗 -->
  <ResultDrawer ref="resultRef" @success="handleResultSuccess" />
  <!-- 对账记录 -->
  <CheckBillRecord
    :supplyId="supplyId"
    :cusId="cusId"
    ref="checkBillRecordRef"
    @change="(show) => (disabledScroll = show)"
  />
</template>

<script setup>
import { ref, unref, computed, getCurrentInstance } from "vue";
import SignDrawer from "./components/SignDrawer.vue";
import ResultDrawer from "./components/ResultDrawer.vue";
import CheckBillRecord from "./components/CheckBillRecord.vue";
import { onLoad } from "@dcloudio/uni-app";
import {
  BillToBeCheckedList,
  CheckAllGetTotal,
  GetAgreement,
} from "@/api/index.js";
import dayjs from "dayjs";
import Big from "big.js";
import { formatNumberToThousand } from "@/utils/index.js";

let eventChannel = null;
const isInit = ref(false);
onLoad(async (options) => {
  console.log(options);
  const instance = getCurrentInstance().proxy;
  eventChannel = instance.getOpenerEventChannel();

  cusId.value = options.cusId ?? "";
  supplyId.value = options.supplyId ?? "";
  await getList(true);
  getAgreementInfo();
  // 初始化完成
  isInit.value = true;
});

const cusId = ref("");
const supplyId = ref("");
const loading = ref(false);
const searching = ref(false);
const list = ref([]);
const htKeyword = ref("");
// 分页相关
const pageIndex = ref(1);
const cnt = ref(0); // 总数
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
  if (!refresh && !hasMoreData()) return;
  if (unref(loading)) return;

  if (refresh) {
    list.value = [];
    searching.value = true;
  }
  loading.value = true;
  try {
    const res = await BillToBeCheckedList({
      pageIndex: refresh ? 1 : unref(pageIndex),
      pageSize,
      cusId: unref(cusId),
      supplyId: unref(supplyId),
      htKeyword: unref(htKeyword),
    });
    list.value = refresh ? res.list : mergeDateList(unref(list), res.list);
    cnt.value = res.cnt;

    if (hasMoreData()) {
      pageIndex.value += 1;
    }

    if (unref(list).length > 0) {
      hasDataAtLeastOnce.value = true;
    }
  } catch (err) {
    console.log("getList error:", err);
  } finally {
    loading.value = false;
    searching.value = false;
  }
}

// 判断是否还有更多数据
function hasMoreData() {
  const totalLength = unref(list).reduce(
    (sum, item) => sum + (item.BillList?.length || 0),
    0
  );
  return totalLength < unref(cnt);
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
      // result[existingIndex].DateCount = result[existingIndex].BillList.length;
    } else {
      // 新日期，直接追加
      result.push(newItem);
    }
  }

  return result;
}

const tempKeyword = ref("");
async function handleSearch() {
  tempKeyword.value = unref(htKeyword);
  isAllSelectedMode.value = false;
  exceptionIds.value = [];
  currentTotals.value = {
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
  };
  await getList(true);
}

// 全选逻辑
const isAllSelectedMode = ref(false); //是否为全选模式
const exceptionIds = ref([]); //isAllSelectedMode为true时，为剔除列表；/isAllSelected为false时，为包含列表
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
  totalCount: 999,
}); //前端展示当前总计

// 判断当前item是否全选
function getItemCheck(item) {
  if (unref(isAllSelectedMode)) {
    return !unref(exceptionIds).includes(item.Id);
  } else {
    return unref(exceptionIds).includes(item.Id);
  }
}
function handleItemCheck(item) {
  // console.log("handleItemCheck", item);

  const index = unref(exceptionIds).indexOf(item.Id);
  const isExist = index !== -1;

  if (unref(isAllSelectedMode)) {
    //当前模式为全选，点击单个item后，切换为手动选择模式
    isAllSelectedMode.value = false;
    // 获取所有 BillList 的 ID，排除当前取消的项
    const bills = unref(list)
      .map((item) => item.BillList)
      .flat()
      .filter((bill) => bill.Id !== item.Id);
    exceptionIds.value = bills.map((bill) => bill.Id);

    //当使用手动选择模式时，重新计算当前选中的数据合计
    console.log("全选模式  handleItemCheck", bills);
    currentTotals.value = calcTotals(bills);
  } else {
    // --- 【包含模式】（手动一个一个选） ---
    // 此时 exceptionIds 存的是：【已勾选的ID】
    if (isExist) {
      unref(exceptionIds).splice(index, 1); // 取消勾选
    } else {
      unref(exceptionIds).push(item.Id); // 增加勾选
    }

    //前端计算当前选择的 bills的合计
    const bills = unref(list)
      .map((item) => item.BillList)
      .flat()
      .filter((bill) => unref(exceptionIds).includes(bill.Id));
    console.log("手动选择模式  handleItemCheck", bills);
    currentTotals.value = calcTotals(bills);

    // 当单个选择时，每次点击后，判断是否全选，如果是则切换为全选模式
    if (unref(isAllSelected)) {
      isAllSelectedMode.value = true;
      exceptionIds.value = [];
      getDataTotal();
    }
  }
  console.log("currentTotals.value", currentTotals.value);
  // console.log("handleItemCheck", unref(exceptionIds), unref(isAllSelectedMode));
}
//根据bills计算合计
function calcTotals(bills) {
  const totalUnitT = bills
    .filter((bill) => bill.Unit === "吨")
    .map((bill) => bill.Suttle ?? 0)
    .reduce((acc, pre) => Big(acc).plus(pre), 0);
  const totalUnitM = bills
    .filter((bill) => bill.Unit === "方")
    .map((bill) => bill.Suttle ?? 0)
    .reduce((acc, pre) => Big(acc).plus(pre), 0);
  const totalAmount = bills
    .map((bill) => bill.Amount ?? 0)
    .reduce((acc, pre) => Big(acc).plus(pre), 0);
  return {
    unitT: {
      Unit: "吨",
      Suttle: Big(totalUnitT).toNumber(),
    },
    unitM: {
      Unit: "方",
      Suttle: Big(totalUnitM).toNumber(),
    },
    totalAmount: Big(totalAmount).toNumber(),
    totalCount: bills.length,
  };
}

const isAllSelected = computed(() => {
  // 判断当前加载数据所有BillList的id是否都在 exceptionIds 中
  const allIds = unref(list)
    .map((item) => item.BillList)
    .flat()
    .map((bill) => bill.Id);
  const isAllIn =
    allIds.length > 0 &&
    unref(exceptionIds).length === allIds.length &&
    unref(exceptionIds).every((id) => allIds.includes(id));

  return unref(isAllSelectedMode) || (!unref(isAllSelectedMode) && isAllIn);
});
function handleCheckAll() {
  if (unref(list).length === 0) {
    uni.showToast({
      title: "暂无可核对账单",
      icon: "none",
    });
    return;
  }
  // 全选时从服务端获取数据合计
  if (unref(isAllSelectedMode)) {
    currentTotals.value = {
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
    };
  } else {
    getDataTotal();
  }
  isAllSelectedMode.value = !unref(isAllSelectedMode);
  exceptionIds.value = [];
}

//获取数据合计
async function getDataTotal() {
  try {
    uni.showLoading({ mask: true });
    const res = await CheckAllGetTotal({
      cusId: unref(cusId),
      supplyId: unref(supplyId),
    });
    console.log("getDataTotal", res);
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
  } finally {
    uni.hideLoading();
  }
}
//判断是否显示合计
const isShowTotal = computed(() => {
  if (unref(isAllSelectedMode)) {
    return true;
  } else {
    return unref(exceptionIds).length > 0;
  }
});
//当前已选中数量
const selectedCount = computed(() => {
  if (unref(isAllSelectedMode)) {
    return unref(currentTotals).totalCount;
  } else {
    return unref(exceptionIds).length;
  }
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

const disabledScroll = ref(false);
// 对账记录
const checkBillRecordRef = ref();
function openRecord() {
  unref(checkBillRecordRef).open();
}

// 获取对账协议
const agreementInfo = ref({
  title: "",
  content: "",
  Id: "",
});
async function getAgreementInfo() {
  const res = await GetAgreement({
    agrType: "Reconciliation",
    supplyId: unref(supplyId),
  });
  console.log("getAgreement", res);
  agreementInfo.value = {
    title: res?.AgreementName ?? "",
    content: res?.AgreementFwb ?? "",
    Id: res?.Id ?? "",
  };
}

// 签字确认
const signRef = ref();
function handleConfirm() {
  const params = {
    supplyId: unref(supplyId),
    cusId: unref(cusId),
  };
  if (unref(isAllSelectedMode)) {
    params.isCheckAll = true;
    params.htKeyword = unref(tempKeyword);
  } else {
    params.isCheckAll = false;
    params.chosesIds = unref(exceptionIds);
  }

  params.agreementId = unref(agreementInfo).Id;
  params.unitList = [unref(currentTotals).unitT, unref(currentTotals).unitM];
  params.totalAmount = unref(currentTotals).totalAmount;
  params.totalCount = unref(currentTotals).totalCount;

  unref(signRef).open(params);
}
const resultRef = ref();
function handleSignSuccess(res) {
  unref(resultRef).open(res);
  isAllSelectedMode.value = false;
  exceptionIds.value = [];
  currentTotals.value = {
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
  };
  // 重新获取数据
  getList(true);
  // 如果没有数据，则显示暂无可核对账单
  if (unref(list).length === 0) {
    hasDataAtLeastOnce.value = false;
  }
  // 刷新我的账户页面
  eventChannel.emit("success");
}
function handleResultSuccess() {}
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
    padding: 0;
    .handle-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 32rpx;
      font-size: 26rpx;
      .checkall {
        flex: none;
        display: flex;
        align-items: center;
        margin-right: 24rpx;
        color: var(--title-color);
      }
      .total-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .total-weight {
        text-align: right;
        color: var(--sub-color);
        .num {
          font-family: misans500;
          color: var(--dark-main);
        }
      }
      .separator {
        color: var(--divider);
        margin: 0 10rpx;
      }
      .total-price {
        flex: none;
        font-family: misans500;
        color: var(--red-color);
      }
    }
    .btns {
      padding: 16rpx 24rpx
        max(var(--safe-area-inset-bottom), var(--safe-bottom));
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
    .checkbox {
      padding-right: 24rpx;
    }
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
    :not(:last-child) {
      .item-wrapper {
        border-bottom: 1rpx solid var(--divider);
      }
    }
  }
}
</style>
