<template>
  <my-drawer ref="drawer" title="预估价格明细" :height="480" closeable>
    <view class="estimate-wrapper" v-if="order && order.MaterialsList">
      <view class="price-wrapper">
        <view class="list-wrapper">
          <view
            v-for="(item, index) in list"
            :key="item.SSMaterialId"
            class="price-box"
            :class="{
              'my-border-bottom': index < list.length - 1,
            }"
          >
            <view class="left">
              <view class="name">{{ item.SSMaterialName }}</view>
              <!-- 按重量 -->
              <view class="info" v-if="item.Limittype === '1'">
                单价 ¥ {{ formatNumberToThousand(item.TaxPrice) }} 丨
                {{ formatNumberToThousand(item._weight) }} {{ item.Unit }}
              </view>
              <!-- 按车次 -->
              <view class="info" v-if="item.Limittype === '2'">
                单价 ¥ {{ formatNumberToThousand(item.TaxPrice) }} 丨
                {{ item.EstimiteTimes }} 车 ≈
                {{ formatNumberToThousand(item._weight) }} {{ item.Unit }}
              </view>
            </view>
            <view class="right">
              <view class="symbol">￥</view>
              <view class="num">{{
                formatNumberToThousand(item._totalPrice)
              }}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="total-wrapper">
        <view class="title">
          <view class="main">总计预估</view>
          <view class="sub">（派车后将会冻结此金额，结算后返还）</view>
        </view>
        <view class="num">¥ {{ formatNumberToThousand(totalPrice) }}</view>
      </view>
    </view>
  </my-drawer>
</template>

<script setup>
import { ref, unref, computed } from "vue";
import big from "big.js";
import { formatNumberToThousand } from "@/utils/index.js";

const props = defineProps({
  order: {
    default: () => {},
    type: Object,
  },
});

const list = computed(() => {
  if (!props.order) return [];
  return props.order.MaterialsList.filter((m) => m.Limittype !== "0").map(
    (m) => {
      if (m.Limittype === "1") m._weight = m.EstimiteWeight;
      if (m.Limittype === "2")
        m._weight = big(m.EstimiteTimes || 0)
          .times(props.order.SingleWeight || 0)
          .toNumber();

      m._totalPrice = big(m.TaxPrice || 0)
        .times(m._weight || 0)
        .toNumber();
      return m;
    }
  );
});

const totalPrice = computed(() => {
  if (!props.order) return 0;
  return unref(list)
    .map((m) => m._totalPrice || 0)
    .reduce((acc, cur) => {
      return big(acc).plus(cur).toNumber();
    }, 0);
});

const drawer = ref(null);
function open() {
  drawer.value.popup.open();
}
defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.estimate-wrapper {
  padding: 0 24rpx 24rpx;

  .price-wrapper {
    border-radius: 16rpx;
    overflow: hidden;
    margin-bottom: 20rpx;
    .list-wrapper {
      background-color: #ffffff;
      position: relative;
      z-index: 100;
      padding: 0 24rpx;
      border-radius: 16rpx;
      .price-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 136rpx;
        .left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name {
            font-weight: 600;
            font-size: 28rpx;
            color: var(--title-color);
            line-height: 40rpx;
            margin-bottom: 4rpx;
          }
          .info {
            font-family: misans400;
            padding-left: 4rpx;
            font-size: 24rpx;
            color: var(--sub-color);
            line-height: 36rpx;
          }
        }
        .right {
          color: var(--title-color);
          .symbol,
          .num {
            display: inline-block;
          }
          .symbol {
            font-weight: bold;
            font-size: 28rpx;
          }
          .num {
            font-family: misans600;
            font-size: 28rpx;
          }
        }
      }
    }
  }
  .total-wrapper {
    font-size: 28rpx;
    padding: 32rpx 28rpx;
    background-color: #ffffff;
    border-radius: 16rpx;
    .title {
      display: flex;
      align-items: center;
      line-height: 40rpx;
      font-size: 26rpx;
      margin-bottom: 4rpx;
      .main {
        color: var(--content-color);
      }
      .sub {
        color: var(--intr-color);
      }
    }
    .num {
      color: var(--red-color);
      font-size: 36rpx;
      font-family: misans600;
      line-height: 48rpx;
    }
  }
}

.empty-wrapper {
  padding: 8rpx 24rpx 24rpx;
  .empty {
    height: 128rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
    color: var(--intr-color);
    background: #ffffff;
    border-radius: 16rpx;
  }
}
</style>
