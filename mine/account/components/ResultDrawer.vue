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
      :zIndex="11000"
      @confirm="confirm"
    >
      <view class="result-drawer-content">
        <view class="result-drawer-content-wrapper">
          <view class="result-drawer-content-img">
            <uv-icon
              v-if="type === 'success'"
              name="/static/images/resultDrawer/money.png"
              width="320rpx"
              height="320rpx"
            />
            <uv-icon
              v-if="type === 'warning'"
              name="/static/images/resultDrawer/warning.png"
              width="320rpx"
              height="320rpx"
            />
          </view>
          <view class="result-drawer-content-title">{{ title }}</view>
          <view class="result-drawer-content-info">{{ msg }}</view>
        </view>
        <view class="result-drawer-footer">
          <view class="result-drawer-footer-btn" style="margin-left: 24rpx">
            <uv-button
              color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
              :custom-style="{
                height: '96rpx',
                borderRadius: '16rpx',
              }"
              :custom-text-style="{ fontSize: '30rpx', fontWeight: 500 }"
              text="我知道了"
              @click="confirm"
            />
          </view>
        </view>
      </view>
    </uv-popup>
  </root-portal>
</template>

<script setup>
import { ref, unref } from "vue";

const emits = defineEmits(["success"]);

const popup = ref();
const title = ref("");
const msg = ref("");
const type = ref("success"); //success, warning
function open(res) {
  title.value = res.title ?? "已完成 1 笔账单核对";
  msg.value = res.msg ?? "";
  type.value = res.type ?? "success";
  unref(popup).open();
}

function confirm() {
  unref(popup).close();
  emits("success");
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
