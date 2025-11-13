<template>
  <my-drawer ref="drawer" title="预估价格明细" :height="384" closeable>
    <view class="estimate-wrapper">
      <view class="price-wrapper">
        <view class="list-wrapper">
          <view class="price-box my-border-bottom">
            <view class="left">
              <view class="name">0-5mm骨料</view>
              <view class="info">32 车 ≈ 32,224 吨 丨 单价 ¥ 36</view>
            </view>
            <view class="right">
              <view class="symbol">￥</view>
              <view class="num">627,782</view>
            </view>
          </view>
          <view class="price-box">
            <view class="left">
              <view class="name">0-5mm骨料</view>
              <view class="info">2,200 吨 丨 单价 ¥ 56.5</view>
            </view>
            <view class="right">￥ 182.22</view>
          </view>
        </view>
        <view class="total"
          >总计预估 <text style="margin: 0 8rpx">678,888</text> 元</view
        >
      </view>
    </view>
    <!-- <view class="empty-wrapper">
      <view class="empty">选择派车物料后才可以查看预估价格</view>
    </view> -->
  </my-drawer>
</template>

<script setup>
import { ref, unref, watch, watchEffect, getCurrentInstance } from "vue";

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
  padding: 8rpx 24rpx 24rpx;

  .price-wrapper {
    border-radius: 16rpx;
    border: 4rpx solid #ffffff;
    overflow: hidden;
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
        height: 128rpx;
        .left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name {
            font-weight: bold;
            font-size: 28rpx;
            color: var(--title-color);
            line-height: 40rpx;
            margin-bottom: 4rpx;
          }
          .info {
            padding-left: 4rpx;
            font-size: 24rpx;
            color: var(--sub-color);
            line-height: 36rpx;
          }
        }
        .right {
          color: var(--red-color);
          font-weight: bold;
          .symbol,
          .num {
            display: inline-block;
          }
          .symbol {
            font-size: 24rpx;
            margin-right: 8rpx;
          }
          .num {
            font-size: 32rpx;
          }
        }
      }
    }

    .total {
      text-align: center;
      font-weight: bold;
      font-size: 28rpx;
      padding: 34rpx 0 24rpx;
      margin-top: -10rpx;
      color: var(--red-color);
      background-color: #fff0ee;
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
