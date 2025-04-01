<template>
  <view @click="showDrawer">
    <uv-input
      v-model="text"
      input-align="right"
      placeholder="选填，司机接单可见"
      readonly
      border="none"
      fontSize="28rpx"
      placeholder-style="color:var(--intr-color)"
    >
      <template v-slot:suffix>
        <uv-image
          src="/static/images/arrow.png"
          width="24rpx"
          height="24rpx"
          :duration="0"
        />
      </template>
    </uv-input>
  </view>

  <!-- 填写备注 -->
  <my-drawer
    ref="drawer"
    title="填写备注"
    closeable
    showConfirmButton
    @confirm="confirm"
  >
    <view style="padding: 0 24rpx">
      <uv-textarea
        maxlength="300"
        count
        v-model="remark"
        placeholder="请填写备注，司机接单可见"
        border="none"
        height="308rpx"
      />
    </view>
  </my-drawer>
</template>

<script setup>
import { ref, unref, watch, watchEffect, getCurrentInstance } from "vue";
const { ctx } = getCurrentInstance();
const props = defineProps({
  modelValue: {
    default: "",
  },
});
const emits = defineEmits(["update:modelValue", "change"]);

const text = ref();
watchEffect(() => {
  text.value = props.modelValue;
});

const drawer = ref();
function showDrawer() {
  drawer.value.popup.open();
}

const remark = ref();
function confirm(item) {
  emits("update:modelValue", unref(remark));
  emits("change", unref(remark));
  ctx.$uv.formValidate(ctx, "change");
  // drawer.value.popup.close()
}
</script>

<style lang="scss">
.colors {
  padding: 0 24rpx 24rpx;
}

.my-dropdown-item {
  padding: 48rpx 32rpx !important;

  .color {
    width: 144rpx;
    height: 48rpx;
    border-radius: 8rpx;

    &.yellow {
      background: #ffbd00;
    }

    &.yellow-green {
      display: flex;
      justify-content: flex-end;
      position: relative;
      background: #ffbd00;
      padding: 4rpx;

      &::after {
        content: "";
        display: block;
        width: 92rpx;
        height: 40rpx;
        background: var(--main-color);
        border-radius: 6rpx;
      }
    }

    &.blue {
      background: #3773ff;
    }

    &.green {
      background: linear-gradient(180deg, #f8f8f8 0%, var(--main-color) 100%);
    }
  }

  .name {
    flex: 1;
    margin: 0 24rpx;
  }
}
</style>
