<template>
  <uv-form-item
    :label="label"
    :prop="prop"
    :customStyle="{ padding: '32rpx 4rpx' }"
    @click="openDrawer"
  >
    <uv-input
      v-if="!disabled"
      v-model="innerValue"
      border="none"
      disabled
      disabledColor="#ffffff"
      :placeholder="placeholder"
      inputAlign="right"
      :customStyle="{ fontWeight: 'bold' }"
      placeholder-style="font-weight: normal;color:var(--intr-color);"
    />
    <view style="font-weight: bold; text-align: right" v-else>{{
      innerValue
    }}</view>
    <template #right>
      <uv-icon
        v-if="!disabled"
        name="/static/images/ui/right-arrow.png"
        width="24rpx"
        height="24rpx"
      />
      <slot name="right"></slot>
    </template>
  </uv-form-item>

  <!-- 编辑drawer -->
  <my-bottom-drawer
    ref="bottomDrawer"
    title="编辑成员信息"
    :showConfirmButton="false"
  >
    <view class="edit-member-wrapper">
      <view class="form-wrapper">
        <uv-form
          labelPosition="left"
          labelWidth="auto"
          :model="model"
          :rules="rules"
          ref="form"
          errorType="toast"
          :labelStyle="{
            fontSize: '28rpx',
            color: 'var(--content-color)',
            lineHeight: '48rpx',
          }"
        >
          <uv-form-item
            :label="label"
            :prop="prop"
            :customStyle="{ padding: '32rpx 28rpx' }"
          >
            <uv-input
              v-model="model[prop]"
              border="none"
              placeholder="请输入"
              inputAlign="right"
            />
          </uv-form-item>
        </uv-form>
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
import { ref, unref, reactive, watch } from "vue";
import { sleep } from "@/utils/index.js";
import { UptCusStaff } from "@/api/index.js";

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
  disabled: {
    type: Boolean,
    default: false,
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

function openDrawer() {
  if (props.disabled) return;
  console.log("openDrawer");
  open();
}

const form = ref(null);
const model = reactive({
  [props.prop]: "",
});
const rules = ref({
  [props.prop]: props.rules,
});
const loading = ref(false);
async function handleUpdate() {
  const isValid = await unref(form).validate();
  if (isValid) {
    const value = model[props.prop];
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
  model[props.prop] = props.modelValue || "";

  unref(bottomDrawer).popup.open();
}
function close() {
  unref(bottomDrawer).popup.close();
}
defineExpose({ open, close });
</script>

<style lang="scss" scoped>
.edit-member-wrapper {
  padding: 0 24rpx 388rpx;
  .form-wrapper {
    background-color: #fff;
    border-radius: 24rpx;
    overflow: hidden;
    margin-bottom: 40rpx;
  }
}
</style>
