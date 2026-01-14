<template>
  <my-drawer
    ref="drawer"
    bgColor="#FFF"
    :customScrollView="false"
    :closeOnClickOverlay="false"
    :closeable="!loading"
    @change="drawerChange"
  >
    <template #title>
      <view class="title">核对人签字</view>
      <view class="sub-title"
        >签字即代表确认<text class="agreement" @click="toAgreement"
          >《{{ agreementInfo.title }}》</text
        ></view
      >
    </template>

    <view class="sign-wrapper">
      <view class="sign-area">
        <l-signature
          v-if="signVisible"
          disableScroll
          ref="signatureRef"
          :penSize="6"
          :openSmooth="false"
          @inited="handleInited"
          @start="handleStart"
          @clear="handleClear"
        />
        <view class="sign-placeholder" v-if="showPlaceholder">
          <uv-icon
            name="/static/images/ui/sign-placeholder.png"
            width="400rpx"
            height="96rpx"
          />
        </view>
      </view>
    </view>

    <template #footer>
      <view class="btns">
        <view class="left">
          <uv-button
            text="重写"
            :customTextStyle="{
              fontWeight: 500,
              color: 'var(--sub-color)',
            }"
            color="var(--page-bg)"
            :customStyle="{
              height: '96rpx',
              borderRadius: '16rpx',
            }"
            @click="handleClearSign"
          />
        </view>
        <view class="right">
          <uv-button
            text="确认签字并完成对账"
            :loading="loading"
            :customTextStyle="{
              fontWeight: 500,
              color: '#ffffff',
            }"
            color="var(--main-color)"
            :customStyle="{
              height: '96rpx',
              borderRadius: '16rpx',
            }"
            @click="handleConfirm"
          />
        </view>
      </view>
    </template>
  </my-drawer>
</template>

<script setup>
import { ref, unref } from "vue";
import { UploadSign, CheckBill } from "@/api/index.js";

const props = defineProps({
  supplyId: {
    type: String,
    default: "",
  },
  agreementInfo: {
    type: Object,
    default: () => ({
      title: "",
      content: "",
    }),
  },
});

const emits = defineEmits(["success", "change"]);

const signVisible = ref(false);
function drawerChange(e) {
  signVisible.value = e.show;
  if (!e.show) {
    showPlaceholder.value = true;
  }

  emits("change", e.show);
}

const signatureRef = ref();
function handleInited() {
  console.log("Signature inited");
  showPlaceholder.value = true;
}
function handleStart() {
  console.log("Signature handleStart");
  showPlaceholder.value = false;
}
function handleClear() {
  console.log("Signature handleClear");
  showPlaceholder.value = true;
}
function handleClearSign() {
  if (loading.value) return;
  unref(signatureRef).clear();
}

function toAgreement() {
  console.log("toAgreement");
  uni.navigateTo({
    url: `/pages/richText/richText`,
    success(res) {
      res.eventChannel.emit("acceptDataFromOpenerPage", {
        title: props.agreementInfo.title,
        content: props.agreementInfo.content,
      });
    },
  });
}

const showPlaceholder = ref(true);

const loading = ref(false);
async function handleConfirm() {
  loading.value = true;
  unref(signatureRef).canvasToTempFilePath({
    async success(res) {
      console.log("res", res);
      if (res.isEmpty) {
        uni.showToast({ title: "请先完成签字", icon: "none" });
        loading.value = false;
        return;
      }

      try {
        const fileRes = await UploadSign(
          {
            businessType: "Reconciliation",
            supplyId: props.supplyId,
          },
          res.tempFilePath
        );
        console.log("上传签名", fileRes);
        const params = {
          ...formValues.value,
          imgList: [fileRes],
        };
        console.log("确认对账参数", params);
        const checkRes = await CheckBill(params);
        console.log("确认对账结果", checkRes);
        close();
        emits("success", {
          type: checkRes.TipType === "success" ? "success" : "warning",
          title: checkRes.Title,
          msg: checkRes.msg,
        });
      } catch (err) {
        uni.showToast({ title: err.data, icon: "none" });
      } finally {
        loading.value = false;
      }
    },
    fail() {
      uni.showToast({
        title: "请重试",
        icon: "none",
      });
      loading.value = false;
    },
  });
}

const drawer = ref();
const formValues = ref({});
function open(params) {
  formValues.value = {
    ...params,
  };
  loading.value = false;
  unref(drawer).popup.open();
}
function close() {
  unref(drawer).popup.close();
}

defineExpose({
  open,
  close,
});
</script>

<style lang="scss" scoped>
.title {
  font-weight: 600;
  font-size: 34rpx;
  line-height: 48rpx;
}
.sub-title {
  font-weight: 400;
  font-size: 24rpx;
  color: var(--sub-color);
  margin-top: 4rpx;
  line-height: 34rpx;
  .agreement {
    color: var(--dark-main);
  }
}

.sign-wrapper {
  padding: 8rpx 24rpx;
  .sign-area {
    position: relative;
    width: 100%;
    height: 480rpx;
    background-color: var(--page-bg);
    border-radius: 16rpx;
    .sign-placeholder {
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.btns {
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
</style>
