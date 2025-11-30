<template>
  <my-drawer ref="drawer" title="添加车辆" customScrollView>
    <view class="add-car-drawer-container">
      <view class="form-container">
        <view class="form-wrapper">
          <uv-form
            errorType="toast"
            :model="model"
            :rules="rules"
            ref="form"
            label-width="140rpx"
            :labelStyle="{
              fontSize: '28rpx',
              color: 'var(--content-color)',
            }"
          >
            <view class="carno">
              <uv-form-item labelPosition="top" label="车牌号码" prop="Carno">
                <CarNumber v-model="model.Carno" />
              </uv-form-item>
            </view>
          </uv-form>
        </view>
        <view class="tip"
          >提示：您可在「我的 - 车辆管理」中批量导入、管理车辆</view
        >
      </view>
      <uv-button
        text="确认添加"
        :loading="loading"
        color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"
        @click="handleConfirm"
        :custom-style="{
          borderRadius: '8px',
          height: '48px',
          marginTop: '40rpx',
        }"
        :customTextStyle="{ fontWeight: '500' }"
      />
    </view>
  </my-drawer>
</template>

<script>
export default {
  options: {
    styleIsolation: "shared",
  },
};
</script>
<script setup>
import { ref, unref, reactive } from "vue";
import CarNumber from "@/pages/addCar/components/CarNumber.vue";
import { CreateOwnerUserCarno } from "@/api/index.js";

const emits = defineEmits(["success"]);

const form = ref(null);
const model = reactive({
  Carno: "",
});
const rules = ref({
  Carno: {
    validator: (rule, value, callback) => {
      if (!value) return false;
      const arr = value.split("");
      const isOk1 = arr.slice(0, 7).every((m) => m !== " ");
      const isOk2 = arr.slice(0, 8).every((m) => m !== " ");
      return isOk1 || isOk2;
    },
    message: "请填写正确的车牌号",
  },
});

const drawer = ref(null);
function open() {
  unref(drawer).popup.open();
}
defineExpose({
  open,
});

const loading = ref(false);
async function handleConfirm() {
  try {
    await form.value.validate();
  } catch {
    return;
  }

  const params = {
    Carno: model.Carno.trim(),
  };
  console.log("params", params);
  try {
    loading.value = true;
    await CreateOwnerUserCarno(params);
    emits("success", {
      ...params,
    });
    uni.showToast({
      title: "车辆添加成功",
      icon: "none",
    });
    unref(drawer).popup.close();
  } catch (err) {
    uni.showToast({
      title: err.data,
      icon: "none",
    });
  } finally {
    model.Carno = "";
    loading.value = false;
  }
}
</script>

<style lang="scss">
.add-car-drawer-container {
  padding: 0 24rpx;
  height: 900rpx;

  .form-container {
    border: 4rpx solid #ffffff;
    background-color: #fff;
    border-radius: 24rpx;
    .form-wrapper {
      background-color: #fff;
      border-radius: 24rpx;
      padding: 0 24rpx;
      position: relative;
      z-index: 100;
      .carno {
        .uv-form-item {
          &__body {
            padding: 32rpx 0 !important;
            &__left {
              margin-bottom: 24rpx !important;
            }
          }
        }
      }
    }

    .tip {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 82rpx;
      text-align: center;
      position: relative;
      margin-top: -10rpx;
      padding-top: 10rpx;
      background-color: var(--light-main);
      color: var(--dark-main);
      font-size: 24rpx;
      line-height: 32rpx;
      border-radius: 0 0 24rpx 24rpx;
      overflow: hidden;
    }
  }
}
</style>
