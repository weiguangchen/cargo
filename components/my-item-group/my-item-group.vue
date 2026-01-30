<template>
  <view class="my-item__group">
    <slot />
  </view>
</template>

<script>
export default {
  options: {
    virtualHost: true,
  },
};
</script>
<script setup></script>

<style lang="scss" scoped>
.my-item__group {
  border-radius: 24rpx;
  background-color: #ffffff;
  padding: 0 24rpx;
  margin-bottom: 20rpx;

  --my-item-border-radius: 0;
  --my-item-padding: 0 4rpx;
  --my-item-margin-bottom: 0;
}
</style>
