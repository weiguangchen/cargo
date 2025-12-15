<template>
  <view
    class="material"
    :class="{ 'my-border-bottom': borderBottom }"
    @click="openDrawer"
  >
    <view class="name">{{ model.SSMaterialName }}</view>
    <view class="status">
      <template v-if="modelValue.Limittype === '0'">不装运</template>
      <template v-if="modelValue.Limittype === '1'"
        >{{ modelValue.EstimiteWeight }} {{ modelValue.Unit }}</template
      >
      <template v-if="modelValue.Limittype === '2'"
        >{{ modelValue.EstimiteTimes }} 车次</template
      >
      <template v-if="modelValue.Limittype === '3'">临时装运</template>
      <uv-image
        src="/static/images/arrow.png"
        :duration="0"
        width="24rpx"
        height="24rpx"
        :custom-style="{ marginLeft: '4rpx' }"
      />
    </view>
  </view>

  <my-drawer
    ref="drawer"
    bgColor="#FFFFFF"
    closeable
    showConfirmButton
    :titleStyle="{
      height: '136rpx',
    }"
    @confirm="confirm"
  >
    <template #title>
      <view class="material-drawer-title">
        <view class="main-title">{{ model.SSMaterialName }}</view>

        <view class="sub-title" @click="clickSubTitle">
          <rich-text :nodes="model.DetailTxt" />
          <uv-icon
            v-if="subTitleCanClickType.includes(model.LeftStatus)"
            name="/static/images/dispatchTask/arrow.png"
            width="32rpx"
            height="32rpx"
          />
        </view>
      </view>
    </template>
    <view class="drawer-form">
      <uv-form
        labelPosition="left"
        :model="model"
        :rules="rules"
        ref="form"
        label-width="auto"
      >
        <uv-form-item
          label="计划类型"
          prop="Limittype"
          :customStyle="{ padding: '44rpx 0!important' }"
        >
          <view style="display: flex; justify-content: flex-end">
            <MyRadio
              :record="model"
              :supplyIsOffline="supplyIsOffline"
              v-model="model.Limittype"
              @change="typeChange"
            />
          </view>
        </uv-form-item>
        <uv-form-item
          labelPosition="top"
          label="计划装运重量"
          prop="EstimiteWeight"
          v-if="model.Limittype === '1'"
        >
          <view
            style="display: flex; justify-content: center; padding-top: 32rpx"
          >
            <my-number-box
              v-model="model.EstimiteWeight"
              decimal-length="2"
              :max="model.LeftWeight !== null ? model.LeftWeight : undefined"
              :max-limit-msg="(max) => `重量最多为${max}${model.Unit}`"
              :min="model.minWgtLeft"
              :min-limit-msg="(min) => `重量最少为${min}${model.Unit}`"
              :step="10"
              :unit="model.Unit"
            />
          </view>
        </uv-form-item>
        <uv-form-item
          labelPosition="top"
          label="计划装运车次"
          prop="EstimiteTimes"
          v-if="model.Limittype === '2'"
        >
          <view
            style="display: flex; justify-content: center; padding-top: 32rpx"
          >
            <my-number-box
              v-model="model.EstimiteTimes"
              decimal-length="0"
              :max="model.LeftCarTimes != null ? model.LeftCarTimes : undefined"
              :max-limit-msg="(max) => `车次最多为${max}`"
              :min="1"
              :min-limit-msg="(min) => `车次最少为${min}`"
              unit="车次"
            />
          </view>
        </uv-form-item>
      </uv-form>
    </view>
  </my-drawer>

  <!-- subtitle弹窗 -->
  <MaterialLimitDrawer ref="limitDrawer" :material="modelValue" />
</template>

<script setup>
import { nextTick, ref, unref, watchEffect } from "vue";
import MyRadio from "./MyRadio.vue";
import Big from "big.js";
import { sleep } from "@/utils/index.js";
import MaterialLimitDrawer from "./MaterialLimitDrawer.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
  borderBottom: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Object,
    default: () => {},
  },
  supplyIsOffline: {
    type: String,
    default: "0",
  },
});
const emits = defineEmits(["update:modelValue"]);

const model = ref({
  Limittype: "0",
  EstimiteWeight: 1,
  EstimiteTimes: 1,
});
const rules = ref();
watchEffect(() => {
  model.value = {
    ...model.value,
    ...props.modelValue,
    EstimiteWeight: props.modelValue?.EstimiteWeight ?? 1,
    EstimiteTimes: props.modelValue?.EstimiteTimes ?? 1,
  };
});

const drawer = ref();
function openDrawer() {
  model.value = {
    ...model.value,
    ...props.modelValue,
    EstimiteWeight: props.modelValue?.EstimiteWeight ?? 1,
    EstimiteTimes: props.modelValue?.EstimiteTimes ?? 1,
  };
  drawer.value.popup.open();
}

// LeftStatus:
// tempAssign：仅允许临时派车，展示不装运、临时装运，两个按钮
// canAssign：可派车，展示不装运、按重量、按车次，三个按钮
// noLimit：不限制装运量，展示不装运、按重量、按车次，三个按钮
// limitReached：派车量已达上限，展示不装运，一个按钮
// other：其他，只展示不装运一个按钮，比如物料管控中，或断网情况但未开启离线派单功能
// tempAssign、noLimit、other类型没有>这个符号，不可点击
const limitDrawer = ref();
// 哪些状态的副标题可以点击
const subTitleCanClickType = ref(["canAssign", "limitReached"]);
// 点击副标题
function clickSubTitle() {
  if (!unref(subTitleCanClickType).includes(model.value.LeftStatus)) return;

  unref(limitDrawer).open();
}

async function typeChange() {
  await nextTick();
  drawer.value.resize();
}
async function confirm() {
  await uni.hideKeyboard();
  await sleep(200);
  console.log("confirm");
  console.log("model", model.value);
  emits("update:modelValue", model.value);
}
</script>

<style lang="scss">
.material {
  padding: 32rpx 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;
  line-height: 48rpx;

  .name {
    color: var(--content-color);
  }

  .status {
    line-height: 1;
    display: flex;
    align-items: center;
    font-weight: bold;
    color: var(--title-color);
  }

  &.disabled {
    .status {
      font-weight: normal;
      color: var(--intr-color);
    }
  }
}

.material-drawer-title {
  .main-title {
    line-height: 48rpx;
    margin-bottom: 8rpx;
  }
  .sub-title {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 26rpx;
    color: var(--content-color);
    line-height: 32rpx;
    .numgreen {
      color: var(--dark-main);
      font-family: misans600;
    }
  }
}
.drawer-form {
  padding: 0 32rpx;
}
</style>
