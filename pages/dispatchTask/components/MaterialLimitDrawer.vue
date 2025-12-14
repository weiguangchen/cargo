<template>
  <my-drawer
    ref="drawer"
    :title="`可派车量 - ${material.SSMaterialName}`"
    closeable
  >
    <!-- MinType:todayLimit -->
    <view
      class="material-limit-drawer"
      v-if="material.MinType === 'todayLimit'"
    >
      <view class="my-item">
        <view class="my-item-title">单日限制量</view>
        <view class="my-item-value"
          >最大
          <text style="font-family: misans500; font-weight: normal">
            {{ material.TodayLimitWeight || 0 }}
          </text>
          {{ material.Unit }}
        </view>
      </view>
      <view class="my-item-list">
        <view class="my-item">
          <view class="my-item-title">进行中</view>
          <view class="my-item-value">
            <template v-if="material.DoingAbout === '1'">约</template>
            <text style="font-family: misans500; font-weight: normal">
              {{ material.DoingWeight || 0 }}
            </text>
            {{ material.Unit }}
          </view>
        </view>
        <view class="my-item">
          <view class="my-item-title">正在完结</view>
          <view class="my-item-value">
            <template v-if="material.CompletingAbout === '1'">约</template>
            <text style="font-family: misans500; font-weight: normal">
              {{ material.CompletingWeight || 0 }}
            </text>
            {{ material.Unit }}
          </view>
        </view>
        <view class="my-item">
          <view class="my-item-title">今日已装运</view>
          <view class="my-item-value">
            <template v-if="material.TodayDoneAbout === '1'">约</template>
            <text style="font-family: misans500; font-weight: normal">
              {{ material.TodayDoneWeight || 0 }}
            </text>
            {{ material.Unit }}
          </view>
        </view>
      </view>
      <view class="my-item" style="margin-bottom: 0">
        <view class="my-item-title">可派车量</view>
        <view class="my-item-value" style="display: flex; align-items: center">
          <text style="font-family: misans500; font-weight: normal">
            {{ material.LeftWeight || 0 }}
          </text>
          {{ material.Unit }}
          <text style="color: var(--divider); margin: 0 8rpx"> 丨 </text>
          <text style="font-family: misans500; font-weight: normal">
            {{ material.LeftCarTimes || 0 }}
          </text>
          车次
        </view>
      </view>
    </view>
    <!-- MinType:onwayLimit -->
    <view
      class="material-limit-drawer"
      v-if="material.MinType === 'onwayLimit'"
    >
      <view class="my-item">
        <view class="my-item-title">在途限制量</view>
        <view class="my-item-value"
          >最大
          <text style="font-family: misans500; font-weight: normal">
            {{ material.OnWayLimitWeight || 0 }}
          </text>
          {{ material.Unit }}
        </view>
      </view>
      <view class="my-item-list">
        <view class="my-item">
          <view class="my-item-title">进行中</view>
          <view class="my-item-value">
            <template v-if="material.DoingAbout === '1'">约</template>
            <text style="font-family: misans500; font-weight: normal">
              {{ material.DoingWeight || 0 }}
            </text>
            {{ material.Unit }}
          </view>
        </view>
        <view class="my-item">
          <view class="my-item-title">正在完结</view>
          <view class="my-item-value">
            <template v-if="material.CompletingAbout === '1'">约</template>
            <text style="font-family: misans500; font-weight: normal">
              {{ material.CompletingWeight || 0 }}
            </text>
            {{ material.Unit }}
          </view>
        </view>
      </view>
      <view class="my-item" style="margin-bottom: 0">
        <view class="my-item-title">可派车量</view>
        <view class="my-item-value" style="display: flex; align-items: center">
          <text style="font-family: misans500; font-weight: normal">
            {{ material.LeftWeight || 0 }}
          </text>
          {{ material.Unit }}
          <text style="color: var(--divider); margin: 0 8rpx"> 丨 </text>
          <text style="font-family: misans500; font-weight: normal">
            {{ material.LeftCarTimes || 0 }}
          </text>
          车次
        </view>
      </view>
    </view>
    <!-- MinType:orderLeft -->
    <view class="material-limit-drawer" v-if="material.MinType === 'orderLeft'">
      <view class="my-item">
        <view class="my-item-title">订单剩余量</view>
        <view class="my-item-value">
          <text style="font-family: misans500; font-weight: normal">
            {{ material.OrderLeftWeight || 0 }}
          </text>
          {{ material.Unit }}
        </view>
      </view>
      <view class="my-item" style="margin-bottom: 0">
        <view class="my-item-title">可派车量</view>
        <view class="my-item-value" style="display: flex; align-items: center">
          <template v-if="material.LeftStatus === 'limitReached'"
            >已达上限</template
          >
          <template v-else>
            <text style="font-family: misans500; font-weight: normal">
              {{ material.LeftWeight || 0 }}
            </text>
            {{ material.Unit }}
            <text style="color: var(--divider); margin: 0 8rpx"> 丨 </text>
            <text style="font-family: misans500; font-weight: normal">
              {{ material.LeftCarTimes || 0 }}
            </text>
            车次
          </template>
        </view>
      </view>
    </view>
    <!-- {{ material }} -->
  </my-drawer>
</template>

<script setup>
import { ref, unref } from "vue";

const props = defineProps({
  material: {
    default: () => {},
    type: Object,
  },
});

const drawer = ref(null);

function open() {
  unref(drawer).popup.open();
}

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.material-limit-drawer {
  padding: 0 24rpx 24rpx;
}
</style>
