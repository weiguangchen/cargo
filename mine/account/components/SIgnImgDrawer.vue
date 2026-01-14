<template>
  <my-drawer
    ref="drawer"
    bgColor="#FFF"
    :customScrollView="false"
    @change="drawerChange"
  >
    <template #title>
      <view class="title">核对人签字</view>
      <view class="sub-title">
        签字人<text class="green" style="margin: 0 10rpx">{{
          recordInfo ? recordInfo.CustomerStaffName : ""
        }}</text
        >已确认<text class="green" @click="toAgreement"
          >《{{ agreementInfo ? agreementInfo.AgreementName : "" }}》</text
        ></view
      >
    </template>

    <view class="sign-wrapper">
      <view class="sign-area">
        <uv-image
          v-if="
            recordInfo && recordInfo.imgList && recordInfo.imgList.length > 0
          "
          :src="recordInfo.imgList[0]"
          width="100%"
          height="480rpx"
          @error="imageError"
          @load="imageLoad"
        ></uv-image>
      </view>
    </view>
  </my-drawer>
</template>

<script setup>
import { ref, unref } from "vue";

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
  recordInfo: {
    type: Object,
    default: () => ({}),
  },
  agreementInfo: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(["success", "change"]);

function drawerChange(e) {
  emits("change", e.show);
}

function toAgreement() {
  console.log("toAgreement");
  uni.navigateTo({
    url: `/pages/richText/richText`,
    success(res) {
      res.eventChannel.emit("acceptDataFromOpenerPage", {
        title: props.agreementInfo.AgreementName,
        content: props.agreementInfo.AgreementFwb,
      });
    },
  });
}

const drawer = ref();
function open() {
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
  .green {
    color: var(--dark-main);
    font-weight: 500;
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
    overflow: hidden;
  }
}
</style>
