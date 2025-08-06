<template>
  <my-empty
    v-if="loading"
    img="/static/images/empty/loading.gif"
    text="查询中"
    height="100%"
  />
  <my-empty
    v-else-if="list.length === 0"
    img="/static/images/empty/account.png"
    text="暂无账户"
    height="100%"
  />
  <template v-else>
    <view class="account-item" v-for="item in list" :key="item.supplyId">
      <view
        class="custom-item"
        v-for="(custom, index) in item.OwnerAccountList"
        :key="index"
      >
        <view class="custom-header">
          <view class="custom-title">{{ custom.OwnerName }}</view>
          <view class="link" @click="toDetail(custom, item)">
            看账单
            <uv-icon name="/static/images/arrow/green.png" size="28rpx" />
          </view>
        </view>
        <view class="custom-info">
          <view class="info-item">
            <view class="info-title">账户余额 (元)</view>
            <view class="info-number">{{
              Big(custom.Balance).toFixed(2)
            }}</view>
          </view>
          <view class="info-item" v-if="custom.Credit > 0">
            <view class="info-title">授信额度 (元)</view>
            <view class="info-number">{{ Big(custom.Credit).toFixed(2) }}</view>
          </view>
        </view>
      </view>
      <view class="from-info">
        <text class="text">来自与</text>
        <text class="uv-line-1 company">{{ item.supplyName }}</text>
        <text class="text">的签约</text>
      </view>
    </view>
    <uv-load-more status="nomore" />
  </template>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { GetOwnerBalanceTotal } from "@/api/index.js";
import { formatNumberToThousand } from "@/utils/index.js";
import Big from "big.js";

onLoad(() => {
  getInfo();
});

const list = ref([]);
const loading = ref(false);
async function getInfo() {
  try {
    loading.value = true;
    const res = await GetOwnerBalanceTotal();
    list.value =
      res?.filter((m) => {
        return m?.OwnerAccountList?.length > 0;
      }) ?? [];
  } finally {
    loading.value = false;
  }
}

function toDetail(custom, item) {
  uni.navigateTo({
    url: `/mine/amountDetail/amountDetail?customerId=${custom.OwnerId}&supplyId=${item.supplyId}`,
    success: function (res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit("acceptDataFromOpenerPage", {
        customerId: custom.OwnerId,
        supplyId: item.supplyId,
        customerName: custom.OwnerName,
      });
    },
  });
}
</script>

<style lang="scss">
page {
  padding: 24rpx;
  height: 100vh;
}
.account-item {
  padding: 24rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  margin-bottom: 20rpx;
  .custom-item {
    padding: 28rpx;
    background-color: var(--page-bg);
    border-radius: 24rpx;
    margin-bottom: 20rpx;
    &:last-child {
      margin-bottom: 28rpx;
    }
    .custom-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40rpx;
      gap: 24rpx;
      .custom-title {
        font-weight: bold;
        font-size: 32rpx;
        color: var(--title-color);
        line-height: 40rpx;
      }
      .link {
        font-size: 26rpx;
        display: flex;
        align-items: center;
        flex: none;
        color: var(--main-color);
        font-weight: bold;
      }
    }
    .custom-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 64rpx;
      .info-item {
        flex: 1;
        .info-title {
          font-size: 26rpx;
          color: var(--sub-color);
          line-height: 40rpx;
          margin-bottom: 8rpx;
        }
        .info-number {
          font-size: 36rpx;
          color: var(--title-color);
          line-height: 40rpx;
          font-weight: bold;
        }
      }
    }
  }
  .from-info {
    padding-left: 8rpx;
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: var(--sub-color);
    line-height: 40rpx;
    .text {
      flex: none;
    }
    .company {
      display: inlinne-block;
      color: var(--main-color);
      margin: 0 14rpx;
      font-weight: bold;
    }
  }
}
</style>
