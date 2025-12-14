<template>
  <my-drawer ref="drawer" title="账户额度明细" closeable>
    <view class="limit-wrapper" v-if="owner">
      <view class="row">
        <view class="col">
          <view class="title">账户总余额</view>
          <view class="num-box">
            <view class="minus" v-if="isNegative(owner.TotalBanlance)">-</view>
            <text class="symbol">￥</text>
            <text class="num">
              {{
                owner && owner.TotalBanlance
                  ? formatNumberToThousand(abs(owner.TotalBanlance))
                  : "0.00"
              }}
            </text>
          </view>
        </view>
        <view class="col">
          <view class="title">冻结额度</view>
          <view class="num-box">
            <view class="minus" v-if="isNegative(owner.Owing)">-</view>
            <text class="symbol">￥</text>
            <text class="num">
              {{
                owner && owner.Owing
                  ? formatNumberToThousand(abs(owner.Owing))
                  : "0.00"
              }}
            </text>
          </view>
        </view>
      </view>
      <view class="row">
        <view class="col">
          <view class="title">授信额度</view>
          <view class="num-box">
            <view class="minus" v-if="isNegative(owner.CreditBalance)">-</view>
            <text class="symbol">￥</text>
            <text class="num">
              {{
                owner && owner.CreditBalance
                  ? formatNumberToThousand(abs(owner.CreditBalance))
                  : "0.00"
              }}
            </text>
          </view>
        </view>
        <view class="col">
          <view class="title">铺底限额</view>
          <view class="num-box">
            <view class="minus" v-if="isNegative(owner.AlertAmount)">-</view>
            <text class="symbol">￥</text>
            <text class="num">
              {{
                owner && owner.AlertAmount
                  ? formatNumberToThousand(abs(owner.AlertAmount))
                  : "0.00"
              }}
            </text>
          </view>
        </view>
      </view>
      <view class="total">
        <view class="title">
          可用额度<view class="sub"> = 总余额 + 授信额 - 冻结额 - 铺底额</view>
        </view>
        <view class="num-box">
          <view class="minus" v-if="isNegative(owner.Balance)">-</view>
          <text class="symbol">￥</text>
          <text class="num">
            {{
              owner && owner.Balance
                ? formatNumberToThousand(abs(owner.Balance))
                : "0.00"
            }}
          </text>
        </view>
      </view>
    </view>
  </my-drawer>
</template>

<script setup>
import { ref } from "vue";
import { formatNumberToThousand } from "@/utils/index.js";
import Big from "big.js";

const props = defineProps({
  owner: {
    default: () => {},
    type: Object,
  },
});

// 判断是否是负数
function isNegative(num) {
  return Big(num).lt(0);
}
// bigjs把负数变成正数，正数不处理
function abs(num) {
  return Big(num).abs().toNumber();
}

const drawer = ref(null);

function open() {
  drawer.value.popup.open();
}

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.limit-wrapper {
  padding: 8rpx 24rpx 24rpx;
  .row {
    display: flex;
    gap: 22rpx;
    margin-bottom: 22rpx;

    .col {
      padding: 0 28rpx;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      height: 146rpx;
      background: #ffffff;
      border-radius: 16rpx;

      .title {
        font-size: 26rpx;
        color: #4e5356;
        line-height: 40rpx;
        margin-bottom: 4rpx;
      }
      .num-box {
        font-size: 28rpx;
        color: var(--title-color);
        line-height: 38rpx;

        .minus {
          font-weight: 600;
          margin-right: 8rpx;
          float: left;
          margin-top: 2rpx;
        }
        .symbol {
          font-weight: 600;
        }
        .num {
          font-family: misans600;
        }
      }
    }
  }

  .total {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 156rpx;
    background: #ffffff;
    border-radius: 16rpx;
    padding: 0 24rpx;
    .title {
      display: flex;
      align-items: center;
      line-height: 40rpx;
      font-size: 26rpx;
      color: #4e5356;
      margin-bottom: 4rpx;
      .sub {
        color: #a0afba;
        margin-left: 8rpx;
      }
    }
    .num-box {
      font-weight: 600;
      color: var(--dark-main);
      font-family: misans500 !important;
      font-size: 36rpx !important;
      line-height: 48rpx;

      .minus {
        font-weight: 600;
        margin-right: 8rpx;
        float: left;
        margin-top: 2rpx;
      }
      .symbol {
        font-weight: 600;
      }
      .num {
        font-family: misans600;
      }
    }
  }
}
</style>
