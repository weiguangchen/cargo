<template>
  <my-drawer ref="drawer" title="账户额度明细" closeable>
    <view class="limit-wrapper">
      <view class="row">
        <view class="col">
          <view class="title">账户余额</view>
          <view class="num-box">
            <text class="symbol">￥</text>
            <text class="num">67,782,333.8</text>
          </view>
        </view>
        <view class="col">
          <view class="title">实时授信额度</view>
          <view class="num-box green">
            <text class="symbol">￥</text>
            <text class="num">30,000</text>
          </view>
        </view>
      </view>
      <view class="row">
        <view class="col">
          <view class="title">实时冻结额度</view>
          <view class="num-box red">
            <view class="minus">-</view>
            <text class="symbol">￥</text>
            <text class="num">82,333.09</text>
          </view>
        </view>
        <view class="col">
          <view class="title">铺底限额</view>
          <view class="num-box red">
            <text class="minus">-</text>
            <text class="symbol">￥</text>
            <text class="num">50,000</text>
          </view>
        </view>
      </view>
      <view class="row">
        <view class="col">
          <view class="title">实时可用额度</view>
          <view class="num-box green">
            <text class="symbol">￥</text>
            <text class="num">67,782,333.8</text>
          </view>
        </view>
      </view>
    </view>
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
.limit-wrapper {
  padding: 8rpx 24rpx 24rpx;
  .row {
    display: flex;
    gap: 22rpx;
    margin-bottom: 22rpx;

    .col {
      padding: 0 20rpx;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      height: 128rpx;
      background: #ffffff;
      border-radius: 16rpx;

      .title {
        font-size: 26rpx;
        color: var(--content-color);
        line-height: 40rpx;
        margin-bottom: 8rpx;
      }
      .num-box {
        font-size: 32rpx;
        color: var(--sub-color);

        .minus {
          margin-right: 8rpx;
          float: left;
          margin-top: 4rpx;
        }
        .symbol {
          font-size: 24rpx;
        }
        .num {
          margin-left: 8rpx;
        }
        &.green {
          color: var(--dark-main);
        }
        &.red {
          color: var(--red-color);
        }
      }
    }
  }
}
</style>
