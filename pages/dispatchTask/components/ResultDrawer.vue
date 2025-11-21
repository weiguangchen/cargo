<template>
  <root-portal>
    <uv-popup
      ref="popup"
      bgColor="#FFFFFF"
      :closeable="false"
      round="48rpx"
      :showTitle="false"
      mode="bottom"
      :custom-style="{ minHeight: '100rpx' }"
      :closeOnClickOverlay="false"
      :safeAreaInsetBottom="false"
      @confirm="confirm"
    >
      <view class="result-drawer-content">
        <view class="result-drawer-content-wrapper">
          <view class="result-drawer-content-img">
            <uv-image
              src="/static/images/resultDrawer/success.png"
              width="320rpx"
              height="320rpx"
              :duration="0"
            />
          </view>
          <view class="result-drawer-content-title">派车成功</view>
          <view class="result-drawer-content-info"
            >可在「当前任务」中查看进度</view
          >
        </view>
        <view class="result-drawer-footer">
          <view class="result-drawer-footer-btn">
            <uv-button
              text="返回首页"
              @click="cancel"
              :custom-style="{
                color: '#4E5356',
                height: '96rpx',
                borderRadius: '16rpx',
                background: ' #F2F4F7',
              }"
              :custom-text-style="{ fontSize: '30rpx' }"
            />
          </view>
          <view class="result-drawer-footer-btn" style="margin-left: 24rpx">
            <uv-button
              color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
              :custom-style="{
                height: '96rpx',
                borderRadius: '16rpx',
              }"
              :custom-text-style="{ fontSize: '30rpx' }"
              text="查看当前任务"
              @click="confirm"
            />
          </view>
        </view>
      </view>
    </uv-popup>
  </root-portal>
</template>

<script setup>
import { ref } from "vue";
const popup = ref();
function open() {
  popup.value.open();
}

function cancel() {
  uni.switchTab({
    url: "/pages/index/index",
  });
}

function confirm() {
  uni.$emit("task:reload");
  uni.switchTab({
    url: "/pages/task/task",
  });
}

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.result-drawer-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  text-align: center;
  padding: 196rpx 24rpx max(var(--safe-area-inset-bottom), var(--safe-bottom));
  .result-drawer-content-wrapper {
    padding-bottom: 64rpx;
  }
  .result-drawer-content-img {
    position: absolute;
    top: -128rpx;
    left: 50%;
    transform: translateX(-50%);
  }
  .result-drawer-content-title {
    font-weight: 600;
    font-size: 38rpx;
    color: #1a1b1c;
    line-height: 56rpx;
    margin-bottom: 4rpx;
  }
  .result-drawer-content-info {
    font-weight: 400;
    font-size: 28rpx;
    color: #73838e;
    line-height: 48rpx;
  }
}
.result-drawer-footer {
  display: flex;
  justify-content: space-between;
  .result-drawer-footer-btn {
    flex: 1;
  }
}
</style>
