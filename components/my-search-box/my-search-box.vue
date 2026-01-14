<template>
  <view class="my-search-box">
    <CustomSearchBox
      :placeholder="placeholder"
      :showAction="false"
      height="72rpx"
      bgColor="#fff"
      :boxStyle="{
        borderRadius: '36rpx',
      }"
      :value="modelValue"
      color="#1A1B1C"
      placeholderColor="#AOAFBA"
      @update:modelValue="updateModelValue"
      @search="search"
      @clear="clear"
      @change="change"
    />
    <view class="btn-wrapper" v-if="showBtn">
      <slot>
        <uv-button
          :customStyle="{
            padding: '0 14px',
            borderRadius: '36rpx',
            borderColor: '#fff',
          }"
          @click="rightClick"
        >
          <slot name="rightBtnIcon" v-if="showRightBtnIcon">
            <uv-icon
              :name="rightBtnIcon || '/static/images/index/plus.png'"
              width="32rpx"
              height="32rpx"
              :customStyle="{ marginRight: rightBtnText ? '12rpx' : '0' }"
            />
          </slot>
          <text
            style="font-size: 28rpx; font-weight: 500"
            :style="{ color: rightBtnColor }"
            >{{ rightBtnText }}</text
          >
        </uv-button>
      </slot>
    </view>
  </view>
</template>

<script setup>
import CustomSearchBox from "./custom-search-box.vue";

const emits = defineEmits([
  "update:modelValue",
  "search",
  "clear",
  "rightClick",
  "change",
]);
defineProps({
  placeholder: {
    type: String,
    default: "请搜索",
  },
  modelValue: {
    type: String,
    default: "",
  },
  showBtn: {
    type: Boolean,
    default: true,
  },
  rightBtnIcon: {
    type: String,
    default: "",
  },
  rightBtnText: {
    type: String,
    default: "",
  },
  rightBtnColor: {
    type: String,
    default: "var(--dark-main)",
  },
  showRightBtnIcon: {
    type: Boolean,
    default: true,
  },
});

function updateModelValue(value) {
  emits("update:modelValue", value);
}
function search(value) {
  emits("search", value);
}
function clear() {
  emits("clear");
}
function rightClick() {
  emits("rightClick");
}
function change(value) {
  emits("change", value);
}
</script>

<style lang="scss" scoped>
.my-search-box {
  display: flex;

  .btn-wrapper {
    flex: none;
    margin-left: 20rpx;
    border-radius: 36rpx;
    overflow: hidden;
  }
}
</style>
