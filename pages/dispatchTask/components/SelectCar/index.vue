<template>
  <view class="select-car-wrapper" @click="openDrawer">
    <view class="placeholder" v-if="selectedList.length === 0"
      >全部绑定车辆</view
    >
    <view v-else class="input-text">{{ inputText }}</view>
    <uv-icon
      name="/static/images/arrow.png"
      width="24rpx"
      height="24rpx"
      :custom-style="{ marginLeft: '6rpx' }"
    />
  </view>
  <CarListDrawer
    ref="carListDrawer"
    v-model="selectedList"
    @change="tagChange"
  />
</template>

<script setup>
import { ref, unref, watch, computed } from "vue";
import CarListDrawer from "./CarListDrawer.vue";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

// 内部已选择数组
const selectedList = ref([]);
watch(
  () => props.modelValue,
  () => {
    selectedList.value = [...props.modelValue];
  },
  {
    immediate: true,
  }
);

const carListDrawer = ref(null);
function openDrawer() {
  carListDrawer.value.open();
}
// 控件显示文字
const inputText = computed(() => {
  console.log("inputText", props.modelValue);
  if (props.modelValue.length === 0) return "";
  if (props.modelValue.length === 1) {
    return props.modelValue[0].Carno;
  }
  return `${props.modelValue[0].Carno} 等，共 ${props.modelValue.length} 辆车`;
});
// 选择车辆成功
async function tagChange(list) {
  emits("update:modelValue", list);
}
</script>

<style lang="scss" scoped>
.select-car-wrapper {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 28rpx;
  .input-text {
    font-weight: bold;
    color: var(--title-color);
  }
  .placeholder {
    color: #b0becc;
  }
}
</style>
