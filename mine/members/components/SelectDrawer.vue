<template>
  <uv-form-item
    :label="label"
    :prop="prop"
    :customStyle="{ padding: '32rpx 4rpx' }"
    @click="openDrawer"
  >
    <uv-input
      v-model="formatValue"
      border="none"
      disabled
      disabledColor="#ffffff"
      :placeholder="placeholder"
      inputAlign="right"
      :customStyle="{ fontWeight: 'bold' }"
      placeholder-style="font-weight: normal;color:var(--intr-color);"
    />
    <template v-slot:right>
      <uv-icon
        name="/static/images/ui/right-arrow.png"
        width="24rpx"
        height="24rpx"
      />
    </template>
  </uv-form-item>

  <!-- 编辑drawer -->
  <my-bottom-drawer
    ref="bottomDrawer"
    title="编辑成员信息"
    :showConfirmButton="false"
  >
    <view class="edit-member-wrapper">
      <view class="options">
        <view
          class="option"
          :class="{
            selected: option.Value === innerValue,
          }"
          v-for="option in options"
          :key="option.Value"
          @click="handleClick(option)"
        >
          <view>{{ option.SelectName }}</view>
          <uv-icon
            v-if="option.Value === innerValue"
            name="/static/images/check.png"
            width="32rpx"
            height="32rpx"
          />
        </view>
      </view>
      <uv-button
        text="确认"
        color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"
        @click="handleUpdate"
        :loading="loading"
        :custom-style="{ borderRadius: '8px', height: '48px' }"
      />
    </view>
  </my-bottom-drawer>
</template>

<script setup>
import { ref, unref, reactive, watch, computed } from "vue";
import { UptCusStaff } from "@/api/index.js";
import { sleep } from "@/utils/index.js";

const emits = defineEmits(["update:modelValue", "change", "success"]);
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  prop: {
    type: String,
    default: "",
  },
  uptType: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "请输入",
  },
  rules: {
    type: Array,
    default: () => [],
  },
  mode: {
    type: String,
    default: "add",
    validator(value) {
      if (!["edit", "add"].includes(value)) {
        return new Error("mode must be edit or add");
      }
    },
  },
  options: {
    type: Array,
    default: () => [],
  },
  supplyId: {
    type: String,
    default: "",
  },
  staff: {
    type: Object,
    default: () => ({}),
  },
});

const innerValue = ref("");
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  },
  { immediate: true }
);

const formatValue = computed(() => {
  return (
    props.options?.find((option) => option.Value === props.modelValue)
      ?.SelectName || ""
  );
});

function handleClick(option) {
  innerValue.value = option.Value;
}

function openDrawer() {
  console.log("openDrawer");
  open();
}

const loading = ref(false);
async function handleUpdate() {
  if (unref(innerValue) !== "") {
    const value = unref(innerValue);
    console.log("model", value);

    if (props.mode === "add") {
      emits("update:modelValue", value);
      emits("change", value);
      close();
    } else if (props.mode === "edit") {
      loading.value = true;
      try {
        const params = {
          staffId: props.staff?.StaffId ?? "",
          supplyId: props.supplyId,
          uptType: props.uptType,
          uptContent: value,
        };
        await UptCusStaff(params);
        emits("update:modelValue", value);
        emits("change", value);
        emits("success", value);
        close();
      } catch (err) {
        uni.showToast({ title: err.data, icon: "none" });
      } finally {
        loading.value = false;
      }
    }
  }
}

const bottomDrawer = ref(null);
function open() {
  innerValue.value = props.modelValue || "";

  unref(bottomDrawer).popup.open();
}
function close() {
  unref(bottomDrawer).popup.close();
}
defineExpose({ open, close });
</script>

<style lang="scss" scoped>
.edit-member-wrapper {
  padding: 0 24rpx;
  .options {
    margin-bottom: 32rpx;
    .option {
      background: #ffffff;
      border-radius: 16rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 32rpx;
      font-size: 28rpx;
      color: var(--title-color);
      line-height: 48rpx;

      &.selected {
        color: var(--dark-main);
        font-weight: bold;
      }

      &:not(:last-child) {
        margin-bottom: 16rpx;
      }
    }
  }
}
</style>
