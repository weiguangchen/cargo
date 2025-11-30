<template>
  <view @click="showDrawer" class="input-wrapper">
    <view :class="{ placeholder: !text, text: text }">{{
      text || "全部车辆类型"
    }}</view>
    <uv-icon
      name="/static/images/arrow.png"
      width="24rpx"
      height="24rpx"
      :custom-style="{ marginLeft: '6rpx' }"
    />
  </view>

  <my-drawer ref="drawer">
    <template #title>
      <view style="display: flex; align-items: baseline">
        选择车辆类型<text style="font-size: 24rpx; color: var(--intr-color)"
          >（可多选）</text
        >
      </view>
    </template>
    <view class="my-dropdown-items">
      <view
        class="my-dropdown-item"
        :class="{ active: innerValue.includes(item.value) }"
        v-for="item in options"
        @click="select(item)"
      >
        <view class="car-type">
          <uv-image
            v-if="item.value === '自卸车'"
            src="/static/images/carType/car1.png"
            width="100%"
            height="100%"
            :duration="0"
          />
          <uv-image
            v-if="item.value === '半挂车'"
            src="/static/images/carType/car2.png"
            width="100%"
            height="100%"
            :duration="0"
          />
          <uv-image
            v-if="item.value === '罐车'"
            src="/static/images/carType/car3.png"
            width="100%"
            height="100%"
            :duration="0"
          />
        </view>
        <view class="name">{{ item.label }}</view>
        <uv-image
          v-if="innerValue.includes(item.value)"
          src="/static/images/check.png"
          :duration="0"
          width="32rpx"
          height="32rpx"
        />
      </view>
    </view>
    <template #footer>
      <view class="btns">
        <view class="left" @click="reset">
          <uv-button
            text="设为不限"
            :custom-style="{ height: '96rpx', borderRadius: '16rpx' }"
          ></uv-button>
        </view>
        <view class="right" @click="confirm">
          <uv-button
            text="确认所选"
            color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"
            :custom-style="{ height: '96rpx', borderRadius: '16rpx' }"
          />
        </view>
      </view>
    </template>
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
import { CarTypeOptions } from "@/utils/dict.js";
const { ctx } = getCurrentInstance();
const props = defineProps({
  modelValue: {
    default: "",
  },
  disabled: {
    default: false,
    type: Boolean,
  },
});
const emits = defineEmits(["update:modelValue", "change"]);

const options = ref(CarTypeOptions);
const innerValue = ref([]);
const text = ref();

watchEffect(() => {
  innerValue.value = props.modelValue ?? [];
  const find = options.value.filter((m) => props.modelValue.includes(m.value));
  if (find.length > 0) {
    text.value = find.map((m) => m.label).join(" + ");
  } else {
    text.value = "";
  }
});

const drawer = ref();

function showDrawer() {
  if (props.disabled) return;
  drawer.value.popup.open();
}

function select(item) {
  const index = innerValue.value.findIndex((m) => m === item.value);
  if (index === -1) {
    innerValue.value.push(item.value);
  } else {
    innerValue.value.splice(index, 1);
  }
}

function reset() {
  innerValue.value = [];
  confirm();
}

function confirm() {
  emits("update:modelValue", innerValue.value);
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
}

.my-dropdown-items {
  .my-dropdown-item {
    padding: 0 32rpx 0 0;
    height: 144rpx;

    .car-type {
      flex: none;
      width: 248rpx;
      height: 100%;
    }
    .name {
      flex: 1;
      margin: 0 24rpx;
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
