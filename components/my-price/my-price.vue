<template>
  <view class="my-price" :style="[{ color }, customStyle]">
    <view class="symbol">￥</view>
    <view class="number">{{ price || 0.0 }}</view>
    <view
      class="unit"
      :style="[{ color: unitColor, fontSize: unitFontSize }, unitStyle]"
      v-if="unit"
      >/{{ unit }}</view
    >
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
  color: {
    default: "",
    type: String,
  },
  customStyle: {
    default: () => {},
    type: Object,
  },
  unit: {
    default: "",
    type: String,
  },
  unitColor: {
    default: "var(--content-color)",
    type: String,
  },
  unitFontSize: {
    default: "",
    type: String,
  },
  unitStyle: {
    default: () => {},
    type: Object,
  },
  price: {
    default: 0.0,
    type: Number,
  },
});
</script>

<style lang="scss" scoped>
.my-price {
  display: inline-flex;
  align-items: baseline;
  font-family: misans500;
  color: var(--title-color);
}
.symbol {
  margin-right: 2rpx;
  font-weight: bold;
}
.symbol,
.unit {
  font-size: 24rpx;
}

.number {
  font-size: 40rpx;
  font-family: misans500;
}
</style>
