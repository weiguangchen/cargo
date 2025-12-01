<template>
  <my-drawer
    ref="drawer"
    :title="model.Id ? '修改标签' : '添加标签'"
    :showConfirmButton="false"
    customScrollView
  >
    <view class="addCarTag-drawer-container">
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
          <uv-form-item
            label="标签名称"
            prop="labelName"
            :customStyle="{
              padding: '32rpx 0',
            }"
          >
            <uv-input
              v-model="model.labelName"
              placeholder="请输入，最多 6 字"
              inputAlign="right"
              border="none"
              maxlength="6"
            />
          </uv-form-item>
        </uv-form>
      </view>
      <view class="btn-wrapper">
        <view class="left" v-if="model.Id">
          <uv-button
            text="删除标签"
            color="#fff"
            @click="handleDelete"
            :custom-style="{
              borderRadius: '8px',
              height: '96rpx',
            }"
            :customTextStyle="{ fontWeight: '500', color: 'var(--red-color)' }"
          />
        </view>
        <view class="right">
          <uv-button
            :text="model.Id ? '确认修改' : '确认添加'"
            color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"
            @click="handleAdd"
            :loading="loading"
            :custom-style="{ borderRadius: '8px', height: '96rpx' }"
            :customTextStyle="{ fontWeight: '500' }"
          />
        </view>
      </view>
    </view>
  </my-drawer>

  <!-- 确认删除	 -->
  <my-confirm ref="confirm" />
</template>

<script setup>
import { ref, unref, reactive } from "vue";
import { UptOwnerLabel, DelteOwnerLabel } from "@/api/index.js";
import { showToast } from "@/utils/index.js";

const emits = defineEmits(["success", "delete"]);

const confirm = ref();
const form = ref(null);
const model = reactive({
  labelName: "",
  Id: "",
});
const rules = ref({
  labelName: [
    {
      required: true,
      message: "请填写标签名称",
    },
  ],
});

const drawer = ref(null);
function open(data) {
  model.labelName = data?.LabelName ?? "";
  model.Id = data?.Id ?? "";
  drawer.value.popup.open();
}

defineExpose({
  open,
});

const loading = ref(false);
async function handleAdd() {
  try {
    await form.value.validate();
  } catch {
    return;
  }

  // 提交表单
  try {
    loading.value = true;
    await UptOwnerLabel({
      ...model,
    });
  } finally {
    drawer.value.popup.close();
    loading.value = false;
    emits("success", {
      LabelName: model.labelName,
      Id: model.Id,
    });
    model.labelName = "";
    model.Id = "";
  }
}
async function handleDelete() {
  if (unref(loading)) return;
  confirm.value.confirm({
    title: "确定删除标签？",
    content: "仅删除标签，相关的车辆不会被影响",
    cancelText: "再想想",
    confirmText: "删除",
    asyncClose: true,
    async confirm() {
      try {
        await DelteOwnerLabel({
          Id: model.Id,
        });
        confirm.value.close();
        await showToast("删除成功");
        drawer.value.popup.close();
        emits("delete", {
          LabelName: model.labelName,
          Id: model.Id,
        });
        model.labelName = "";
        model.Id = "";
      } catch {
        confirm.value.closeLoading();
      }
    },
  });
}
</script>

<style lang="scss">
.addCarTag-drawer-container {
  height: 636rpx;
  padding: 0 24rpx;
  .form-wrapper {
    background-color: #fff;
    border-radius: 24rpx;
    padding: 0 28rpx;
  }
  .btn-wrapper {
    margin-top: 40rpx;
    display: flex;
    .left {
      flex: none;
      width: 262rpx;
      margin-right: 20rpx;
    }
    .right {
      flex: 1;
    }
  }
}
</style>
