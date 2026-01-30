<template>
  <root-portal>
    <uv-popup
      ref="popup"
      mode="bottom"
      :custom-style="{ minHeight: '100rpx' }"
      :duration="duration"
      :overlay="overlay"
      :zIndex="zIndex"
      :overlayOpacity="overlayOpacity"
      :overlayStyle="overlayStyle"
      :closeOnClickOverlay="closeOnClickOverlay"
      :closeable="false"
      :closeIconPos="closeIconPos"
      :round="round"
      :safeAreaInsetBottom="false"
      :bgColor="bgColor"
      @change="change"
      @maskClick="maskClick"
    >
      <view class="drawer-wrapper">
        <view class="header-wrapper" :style="titleStyle" v-if="showTitle">
          <slot name="title" v-if="$slots.header"></slot>
          <template v-else>
            <view class="title-wrapper" v-if="title || $slots.title">
              <slot name="title">{{ title }}</slot>
            </view>
            <view class="sub-title-wrapper" v-if="showSubTitle">
              <slot name="subTitle">{{ subTitle }}</slot>
            </view>
          </template>
          <uv-icon
            v-if="closeable"
            name="/static/images/ui/closeable.png"
            width="64rpx"
            height="64rpx"
            :custom-style="{
              position: 'absolute',
              right: '24rpx',
              top: '24rpx',
            }"
            @click="handleClose"
          />
        </view>
        <scroll-view
          v-if="useScrollView"
          scroll-y
          class="scroll-view"
          :style="{ height: `${scrollHeight}px` }"
        >
          <view class="scroll-view-wrapper">
            <slot></slot>
          </view>
        </scroll-view>
        <slot v-else />

        <view class="modal-footer" v-if="showConfirmButton || showCancelButton">
          <slot name="footer">
            <view class="footer-wrapper">
              <view class="left-btn" v-if="showCancelButton">
                <uv-button
                  :text="cancelButtonText"
                  :color="cancelButtonColor"
                  @click="handleCancel"
                  :custom-style="{
                    borderRadius: '8px',
                    height: '48px',
                  }"
                  :custom-text-style="{ color: 'var(--sub-color)' }"
                />
              </view>
              <view class="right-btn" v-if="showConfirmButton">
                <uv-button
                  :text="confirmButtonText"
                  :color="confirmButtonColor"
                  @click="confirm"
                  :loading="loading"
                  :custom-style="{ borderRadius: '8px', height: '48px' }"
                />
              </view>
            </view>
          </slot>
        </view>
      </view>
    </uv-popup>
  </root-portal>
</template>

<script setup>
import { ref, getCurrentInstance, nextTick, computed } from "vue";
import { onReady } from "@dcloudio/uni-app";
const { ctx } = getCurrentInstance();

const props = defineProps({
  showTitle: {
    default: true,
    type: Boolean,
  },
  title: {
    default: "",
  },
  subTitle: {
    type: String,
    default: "",
  },
  showSubTitle: {
    default: false,
    type: Boolean,
  },
  titleStyle: {
    default: {},
  },
  height: {
    default: 440,
  },
  // 动画时长，单位ms
  duration: {
    type: [String, Number],
    default: 300,
  },
  // 层级
  zIndex: {
    type: [String, Number],
    default: 10075,
  },
  // 是否显示遮罩
  overlay: {
    type: Boolean,
    default: true,
  },
  // 点击遮罩是否关闭弹窗
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  // 遮罩的透明度，0-1之间
  overlayOpacity: {
    type: [Number, String],
    default: 0.4,
  },
  // 自定义遮罩的样式
  overlayStyle: {
    type: [Object, String],
    default: "",
  },
  round: {
    type: [Number, String],
    default: 12,
  },
  // 是否显示关闭图标
  closeable: {
    type: Boolean,
    default: true,
  },
  // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
  closeIconPos: {
    type: String,
    default: "top-right",
  },
  bgColor: {
    type: String,
    default: "var(--page-bg)",
  },
  // 是否显示取消按钮
  showCancelButton: {
    type: Boolean,
    default: false,
  },
  // 取消按钮的文字
  cancelButtonText: {
    type: String,
    default: "取消",
  },
  cancelButtonColor: {
    type: String,
    default: "var(--page-bg)",
  },
  // 是否显示确认按钮
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  confirmButtonText: {
    type: String,
    default: "确认",
  },
  confirmButtonColor: {
    type: String,
    default: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%);",
  },
  // 是否异步关闭
  asyncClose: {
    type: Boolean,
    default: false,
  },
  // 内部使用scroll-view
  useScrollView: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits([
  "maskClick",
  "change",
  "confirm",
  "cancel",
  "close",
]);

function maskClick() {
  emits("maskClick");
}

const popup = ref(null);

// scroll-view高度
const scrollHeight = computed(() => {
  return contentHeight.value < props.height
    ? contentHeight.value
    : props.height;
});
// 内容高度
const contentHeight = ref(0);
async function change(show) {
  await nextTick();
  emits("change", show);
  if (show.show) {
    resize();
  } else {
    loading.value = false;
  }
}

async function resize() {
  let rectInfo = await ctx.$uv.getRect(".scroll-view-wrapper");
  contentHeight.value = rectInfo.height;
}

function handleCancel() {
  popup.value.close();
  emits("cancel");
}

// 确认按钮
const loading = ref(false);

function confirm() {
  if (props.asyncClose) {
    loading.value = true;
  } else {
    popup.value.close();
  }
  emits("confirm");
}

function closeLoading() {
  loading.value = false;
}

function handleClose() {
  popup.value.close();
  emits("close");
}

defineExpose({
  resize,
  popup,
  closeLoading,
});
</script>

<style lang="scss" scoped>
.drawer-wrapper {
  font-family: misans400, -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  font-kerning: none;
  padding-bottom: max(var(--safe-area-inset-bottom), var(--safe-bottom));
  .header-wrapper {
    padding: 32rpx;
    .title-wrapper {
      height: 48rpx;
      display: flex;
      align-items: center;
      color: var(--title-color);
      font-size: 34rpx;
      font-weight: bold;
    }
    .sub-title-wrapper {
      margin-top: 8rpx;
      height: 32rpx;
      color: var(--sub-color);
      font-size: 26rpx;
    }
  }

  .scroll-view {
  }

  .modal-footer {
    padding: 24rpx;

    .footer-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20rpx;
      .left-btn {
        width: 262rpx;
        flex: none;
      }
      .right-btn {
        flex: 1;
      }
    }
  }
}
</style>
