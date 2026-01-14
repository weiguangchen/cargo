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
  <view class="account-list" v-else>
    <view
      class="account-item"
      v-for="item in list"
      :key="`${item.SupplyId}_${item.OwnerAccount.OwnerId}`"
    >
      <view class="mfrs">{{ item.OwnerAccount.OwnerName }}</view>
      <view class="edu" @click="eduTip"
        >可用额度
        <uv-icon
          name="/static/images/account/tip.png"
          width="36rpx"
          height="36rpx"
        />
      </view>
      <view
        class="number"
        :class="{
          green: Big(item.OwnerAccount.Banlance).gt(0),
          red: Big(item.OwnerAccount.Banlance).lt(0),
          gray: Big(item.OwnerAccount.Banlance).eq(0),
        }"
      >
        <text class="minus" v-if="isNegativeNumber(item.OwnerAccount.Banlance)"
          >-</text
        >
        <text class="symbol">¥</text>
        <text class="num">{{
          formatNumberToThousand(
            Big(item.OwnerAccount.Banlance || 0)
              .abs()
              .toNumber(),
            2
          )
        }}</text>
      </view>
      <view class="table-wrapper">
        <view class="row">
          <view class="col">
            <view class="title">余额</view>
            <view class="value">
              <text
                class="minus"
                v-if="isNegativeNumber(item.OwnerAccount.TotalBanlance)"
                >-</text
              >
              <text class="symbol">¥</text>
              <text class="num">{{
                formatNumberToThousand(
                  Big(item.OwnerAccount.TotalBanlance).abs().toNumber(),
                  2
                )
              }}</text>
            </view>
          </view>
          <view class="col">
            <view class="title">冻结</view>
            <view class="value">
              <text
                class="minus"
                v-if="isNegativeNumber(item.OwnerAccount.Owing)"
                >-</text
              >
              <text class="symbol">¥</text>
              <text class="num">{{
                formatNumberToThousand(
                  Big(item.OwnerAccount.Owing).abs().toNumber(),
                  2
                )
              }}</text>
            </view>
          </view>
        </view>
        <view class="row">
          <view class="col">
            <view class="title">授信</view>
            <view class="value">
              <text
                class="minus"
                v-if="isNegativeNumber(item.OwnerAccount.CreditAmount)"
                >-</text
              >
              <text class="symbol">¥</text>
              <text class="num">{{
                formatNumberToThousand(
                  Big(item.OwnerAccount.CreditAmount).abs().toNumber(),
                  2
                )
              }}</text>
            </view>
          </view>
          <view class="col">
            <view class="title">铺底</view>
            <view class="value">
              <text
                class="minus"
                v-if="isNegativeNumber(item.OwnerAccount.AlertAmount)"
                >-</text
              >
              <text class="symbol">¥</text>
              <text class="num">{{
                formatNumberToThousand(
                  Big(item.OwnerAccount.AlertAmount).abs().toNumber(),
                  2
                )
              }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="sign"
        >来自与 <text class="name">{{ item.SupplyName }}</text> 的签约</view
      >
      <view class="button-group">
        <view class="button-item">
          <uv-button
            text="账单明细"
            color="#E7F9E9"
            :customStyle="{
              height: '96rpx',
              borderRadius: '16rpx',
            }"
            :customTextStyle="{
              color: 'var(--dark-main)',
              fontSize: '28rpx',
              fontWeight: '600',
            }"
            @click="toDetail(item.OwnerAccount, item)"
          />
        </view>
        <view
          class="button-item"
          style="margin-left: 20rpx"
          v-if="item.OwnerAccount.IsUseBillVerf === '1'"
        >
          <uv-button
            text="账单核对"
            color="var(--dark-main)"
            :customStyle="{
              height: '96rpx',
              borderRadius: '16rpx',
            }"
            :customTextStyle="{
              color: '#ffffff',
              fontSize: '28rpx',
              fontWeight: '600',
            }"
            @click="toBillVerf(item)"
          />
        </view>
      </view>
    </view>
    <uv-load-more status="nomore" />
  </view>

  <uv-toast ref="toast" />
</template>

<script setup>
import { ref, unref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { GetOwnerBalanceTotal } from "@/api/index.js";
import { formatNumberToThousand, isNegativeNumber } from "@/utils/index.js";
import Big from "big.js";

const toast = ref(null);

onLoad(() => {
  getInfo();
});

const list = ref([]);
const loading = ref(false);
async function getInfo() {
  try {
    loading.value = true;
    const res = await GetOwnerBalanceTotal();
    list.value = [];
    res.forEach((m) => {
      if (m.OwnerAccountList?.length > 0) {
        m.OwnerAccountList.forEach((n) => {
          list.value.push({
            ...m,
            OwnerAccount: n,
          });
        });
      }
    });
    console.log("list", list.value);
  } finally {
    loading.value = false;
  }
}

function eduTip() {
  unref(toast).show({
    type: "default",
    message: "可用额 = 总余额 + 授信额 - 冻结额 - 铺底额",
  });
}

function toDetail(custom, item) {
  uni.navigateTo({
    url: `/mine/amountDetail/amountDetail?customerId=${custom.OwnerId}&supplyId=${item.supplyId}`,
    success: function (res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit("acceptDataFromOpenerPage", {
        customerId: custom.OwnerId,
        supplyId: item.SupplyId,
        customerName: custom.OwnerName,
      });
    },
  });
}

function toBillVerf(item) {
  uni.navigateTo({
    url: `/mine/account/checkBill?cusId=${item.OwnerAccount.OwnerId}&supplyId=${item.SupplyId}`,
    events: {
      success: function () {
        console.log("我的账户刷新");
        getInfo();
      },
    },
  });
}
</script>

<style lang="scss">
page {
  height: 100vh;
}

.account-list {
  padding: 24rpx 24rpx max(var(--safe-area-inset-bottom), var(--safe-bottom));
  min-height: 100vh;
}
.account-item {
  padding: 30rpx 20rpx 20rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  margin-bottom: 20rpx;
  .mfrs {
    padding: 0 8rpx;
    font-weight: 600;
    font-size: 32rpx;
    color: var(--title-color);
    margin-bottom: 32rpx;
    line-height: 44rpx;
  }
  .edu {
    padding: 0 8rpx;
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: var(--sub-color);
    line-height: 36rpx;
  }
  .number {
    padding: 0 8rpx;
    font-size: 36rpx;
    line-height: 52rpx;
    margin-bottom: 24rpx;
    .minus {
      font-weight: bolder;
    }
    .symbol {
      font-weight: bolder;
      margin: 0 8rpx;
    }
    .num {
      font-family: misans500;
    }

    &.gray {
      color: var(--sub-color);
    }
    &.green {
      color: var(--dark-main);
    }
    &.red {
      color: var(--red-color);
    }
  }
  .table-wrapper {
    background: var(--page-bg);
    border-radius: 16rpx;
    font-size: 24rpx;
    position: relative;
    margin-bottom: 20rpx;
    .row {
      display: flex;
      .col {
        height: 74rpx;
        padding: 0 20rpx;
        flex: none;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title {
          color: var(--sub-color);
        }
        .value {
          color: var(--title-color);
          .symbol {
            margin: 0 8rpx;
          }
          .num {
            font-family: misans400;
          }
        }
      }
    }
    .row::after {
      content: "";
      position: absolute;
      width: 1rpx;
      background-color: var(--divider);
      top: 20rpx;
      bottom: 20rpx;
      left: 50%;
      transform: translateX(-50%);
    }
    .row::before {
      content: "";
      position: absolute;
      height: 1rpx;
      background-color: var(--divider);
      top: 50%;
      left: 20rpx;
      right: 20rpx;
      transform: translateY(-50%);
    }
  }
  .sign {
    font-size: 24rpx;
    color: var(--intr-color);
    line-height: 40rpx;
    margin-bottom: 20rpx;
    .name {
      font-weight: 600;
      margin: 0 4rpx;
      color: var(--sub-color);
    }
  }
  .button-group {
    display: flex;
    .button-item {
      flex: 1;
    }
  }
}

.uv-toast__content {
  width: fit-content;
  max-width: 375px !important;
  .uv-toast__content__text {
    max-width: 375px !important;
    width: auto !important;
  }
}
</style>
