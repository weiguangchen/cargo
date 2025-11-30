<template>
  <view class="identify-car-list" @click="openDrawer">
    <view>
      <view class="input-text placeholder" v-if="selectedList.length === 0"
        >请选择</view
      >
      <view v-else class="input-text">{{ inputText }}</view>
    </view>
    <uv-icon
      name="/static/images/arrow.png"
      width="24rpx"
      height="24rpx"
      :custom-style="{ marginLeft: '8rpx' }"
    />
  </view>
  <SelectCarDrawer
    ref="selectCarDrawer"
    v-model="selectedList"
    :list="list"
    @change="tagChange"
  />
</template>

<script setup>
import { ref, unref, watch, computed } from "vue";
import SelectCarDrawer from "./SelectCarDrawer.vue";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  list: {
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

const selectCarDrawer = ref(null);
function openDrawer() {
  selectCarDrawer.value.open();
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
.identify-car-list {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .input-text {
    font-weight: 400;
    font-size: 28rpx;
    line-height: 48rpx;
    color: var(--title-color);

    &.placeholder {
      color: var(--intr-color);
      font-weight: 500;
    }
  }
}
</style>
