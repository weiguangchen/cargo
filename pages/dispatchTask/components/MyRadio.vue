<template>
  <view class="radio-group">
    <view
      class="radio-box"
      :class="{ active: item.value === modelValue }"
      v-for="item in options"
      @click="select(item)"
    >
      {{ item.label }}
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
import { ref, computed, watch } from "vue";
const props = defineProps({
  modelValue: {
    default: "",
  },
  record: {
    default: () => {},
    type: Object,
  },
  supplyIsOffline: {
    default: "0",
    type: String,
  },
});
const emits = defineEmits(["update:modelValue", "change"]);

const defaultOptions = [
  {
    value: "0",
    label: "不装运",
  },
  {
    value: "1",
    label: "按重量",
  },
  {
    value: "2",
    label: "按车次",
  },
];
const options = ref([...defaultOptions]);

watch(
  () => props.supplyIsOffline,
  (supplyIsOffline) => {
    console.log("myRadio", supplyIsOffline);
    if (supplyIsOffline == "0") {
      options.value = [...defaultOptions];
    }
    if (supplyIsOffline == "1") {
      options.value = [
        {
          value: "0",
          label: "不装运",
        },
        {
          value: "3",
          label: "临时装运",
        },
      ];
    }
    if (supplyIsOffline == "2") {
      options.value = [
        {
          value: "0",
          label: "不装运",
        },
      ];
    }
  },
  {
    immediate: true,
  }
);

function select(item) {
  console.log("select", item, props.record);
  if (item.value === "0" || item.value === "3") {
    emits("update:modelValue", item.value);
    emits("change", item.value);
    return;
  }

  if (props.record.LeftStatus === "0") {
    uni.showToast({
      title: "订单剩余量过低，不满足装运条件",
      icon: "none",
    });
  } else if (props.record.LeftStatus === "1") {
    emits("update:modelValue", item.value);
    emits("change", item.value);
  }
}
</script>

<style lang="scss">
.radio-group {
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .radio-box {
    font-weight: 600;
    width: 156rpx;
    height: 72rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    color: var(--sub-color);
    background: var(--page-bg);
    border-radius: 8rpx;
    &:not(:last-child) {
      margin-right: 20rpx;
    }

    &.active {
      background: var(--main-color);
      color: #fff;
    }
  }
}
</style>
