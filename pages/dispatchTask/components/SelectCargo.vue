<template>
  <view @click="showDrawer" class="input-wrapper">
    <view class="loading-text" v-if="loading">正在查询签约公司...</view>
    <template v-else>
      <view :class="{ placeholder: !text, text: text }">{{
        text || "请选择"
      }}</view>
      <uv-icon
        name="/static/images/arrow.png"
        width="24rpx"
        height="24rpx"
        :custom-style="{ marginLeft: '6rpx' }"
      />
    </template>
  </view>

  <my-drawer ref="drawer">
    <template #title>
      <view style="display: flex; align-items: baseline">选择货主公司</view>
    </template>
    <view class="my-dropdown-items">
      <view
        class="my-dropdown-item"
        :class="{ active: innerValue === item.value }"
        v-for="item in options"
        @click="select(item)"
      >
        <view class="name">{{ item.label }}</view>
        <uv-image
          v-if="innerValue === item.value"
          src="/static/images/check.png"
          :duration="0"
          width="32rpx"
          height="32rpx"
        />
      </view>
    </view>
  </my-drawer>
</template>

<script>
export default {
  options: {
    virtualHost: true,
  },
};
</script>
<script setup>
import { ref, unref, watch, watchEffect, getCurrentInstance } from "vue";
const { ctx } = getCurrentInstance();
const props = defineProps({
  modelValue: {
    default: "",
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  options: {
    default: () => [],
    type: Array,
  },
  loading: {
    default: false,
    type: Boolean,
  },
});
const emits = defineEmits(["update:modelValue", "change", "disabledClick"]);

const innerValue = ref("");
const text = ref();

watchEffect(() => {
  innerValue.value = props.modelValue ?? "";
  const find = props.options.find((m) => props.modelValue === m.value);
  text.value = find?.label ?? "";
});

const drawer = ref();
function showDrawer() {
  if (props.disabled) {
    emits("disabledClick");
    return;
  }
  drawer.value.popup.open();
}

function select(item) {
  innerValue.value = item.value;
  emits("update:modelValue", innerValue.value);
  emits("change", innerValue.value, item);
  ctx.$uv.formValidate(ctx, "change");
  drawer.value.popup.close();
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  width: fit-content;
  display: flex;
  align-items: center;
  font-size: 28rpx;

  .text {
    font-weight: bold;
    color: var(--title-color);
  }

  .placeholder {
    color: #b0becc;
  }
  .loading-text {
    color: #b0becc;
  }
}

.my-dropdown-items {
  .my-dropdown-item {
    .name {
      flex: 1;
    }
  }
}

.btns {
  display: flex;

  .left {
    width: 262rpx;
    margin-right: 20rpx;
  }

  .right {
    flex: 1;
  }
}
</style>
