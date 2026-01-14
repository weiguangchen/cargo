<template>
  <view class="richText">
    <uv-parse :content="content"></uv-parse>
  </view>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { onLoad } from "@dcloudio/uni-app";

onLoad(() => {
  const instance = getCurrentInstance().proxy;
  const eventChannel = instance.getOpenerEventChannel();

  eventChannel.on("acceptDataFromOpenerPage", function (data) {
    console.log("acceptDataFromOpenerPage", data);
    content.value = data?.content ?? "";
    uni.setNavigationBarTitle({
      title: data?.title ?? "",
    });
  });
});

const content = ref("");
</script>

<style lang="scss">
.richText {
  padding: 24rpx;
}
</style>
