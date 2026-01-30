<template>
  <view class="my-item" :class="[border && 'my-border-bottom']">
    <view class="my-item__title" :style="titleStyle">
      <slot name="title">{{ title }}</slot>
    </view>
    <view class="my-item__value" :style="valueStyle">
      <slot name="value">{{ value }}</slot>
      <uv-icon
        v-if="showArrow"
        name="/static/images/ui/right-arrow.png"
        width="24rpx"
        height="24rpx"
      />
    </view>
  </view>
</template>

<script>
export default {
  options: {
    virtualHost: true,
  },
};
</script>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  titleStyle: {
    type: Object,
    default: () => ({}),
  },
  value: {
    type: String,
    default: "",
  },
  valueStyle: {
    type: Object,
    default: () => ({}),
  },
  showArrow: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
.my-item {
  height: 112rpx;
  padding: var(--my-item-padding, 0 28rpx);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--my-item-border-radius, 24rpx);
  background-color: #ffffff;
  font-size: 28rpx;
  margin-bottom: var(--my-item-margin-bottom, 20rpx);
  &__title {
    display: flex;
    align-items: center;
    color: var(--content-color);
  }
  &__value {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: var(--title-color);
  }
}
</style>
