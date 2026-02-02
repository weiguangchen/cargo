<template>
  <my-empty
    v-if="loading"
    img="/static/images/empty/loading.gif"
    text="加载中"
    height="100vh"
  />
  <my-empty
    v-else-if="list.length === 0"
    img="/static/images/empty/seal.png"
    text="暂无印鉴"
    height="100vh"
  />
  <view class="seal-container">
    <view class="notice-bar-wrapper" v-if="topTip">
      <my-custom-notice
        :text="topTip"
        bg-color="#FFF1E8"
        color="var(--warn-color)"
        fontSize="24rpx"
        :icon="false"
        :speed="50"
      />
    </view>
    <scroll-view class="scroll-view" scroll-y>
      <view class="list-wrapper">
        <view class="seal-item" v-for="item in list" :key="item.cus.CusId">
          <view class="seal-item__title">{{ item.cus.CusName }}</view>
          <view class="seal-item__content">
            <view
              v-for="(seal, index) in item.cus.SealList"
              :key="`${item.cus.CusId}-${index}`"
              class="seal-box"
              @click="openUploadDrawer(seal, item)"
            >
              <view class="seal-box__title">{{ seal.SealTypeName }}</view>
              <view
                class="seal-box__status"
                :class="{
                  status1: seal.SealUploadStatus === '1',
                  status2: seal.SealUploadStatus === '2',
                  status3: seal.SealUploadStatus === '3',
                }"
                >{{ seal.SealUploadTxt }}</view
              >
              <uv-icon
                name="/static/images/seal/arrow.png"
                width="28rpx"
                height="28rpx"
                :custom-style="{
                  position: 'absolute',
                  left: '24rpx',
                  bottom: '24rpx',
                }"
              />
              <uv-icon
                name="/static/images/seal/bg.png"
                width="100rpx"
                height="94rpx"
                :custom-style="{
                  position: 'absolute',
                  right: '0',
                  bottom: '0',
                }"
              />
            </view>
          </view>
          <view class="seal-item__from"
            >来自与&nbsp;&nbsp;<text class="company">{{ item.SupplyName }}</text
            >&nbsp;&nbsp;的签约</view
          >
        </view>
      </view>
      <uv-load-more status="nomore" />
    </scroll-view>
  </view>

  <!-- 上传印鉴抽屉 -->
  <UploadDrawer ref="uploadDrawer" @success="handleSuccess" />
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { GetSealList, GetAgreement } from "@/api/index";
import UploadDrawer from "./components/UploadDrawer.vue";

const loading = ref(true);
const list = ref([]);
const topTip = ref("");

async function getList() {
  try {
    const res = await GetSealList();
    list.value = [];
    res.list.forEach((item) => {
      item.CusList.forEach((cus) => {
        list.value.push({
          ...item,
          cus,
        });
      });
    });
    console.log("list", list.value);
    topTip.value = res.topTip;
  } catch (err) {
    uni.showToast({ title: err.data, icon: "none" });
  } finally {
    loading.value = false;
  }
}

onLoad(() => {
  getList();
});

const uploadDrawer = ref();
async function openUploadDrawer(seal, item) {
  console.log("seal", seal, item);
  let agreementInfo = null;
  try {
    uni.showLoading({ title: "加载中" });
    const res = await GetAgreement({
      agrType: "Seal",
      supplyId: item.SupplyId,
    });
    agreementInfo = res.Id ? res : null;
  } finally {
    uni.hideLoading();
  }

  console.log("agreementInfo", agreementInfo);
  uploadDrawer.value.open({
    seal,
    item,
    agreementInfo,
  });
}

function handleSuccess() {
  getList();
}
</script>

<style lang="scss">
.seal-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .notice-bar-wrapper {
    flex: none;
    height: 72rpx;
    font-weight: bold;
  }
  .scroll-view {
    flex: 1;
    min-height: 0;
  }
  .list-wrapper {
    padding: 20rpx 24rpx 0;
    .seal-item {
      padding: 30rpx 24rpx 20rpx;
      border-radius: 24rpx;
      background-color: #fff;
      &:not(:last-child) {
        margin-bottom: 20rpx;
      }
      &__title {
        padding: 0 4rpx;
        font-weight: bold;
        font-size: 34rpx;
        color: var(--title-color);
        line-height: 48rpx;
        margin-bottom: 28rpx;
      }
      &__content {
        display: flex;
        flex-wrap: wrap;
        gap: 18rpx;
        margin-bottom: 20rpx;
        .seal-box {
          width: calc((100% - 18rpx) / 2);
          position: relative;
          padding: 24rpx;
          height: 182rpx;
          flex: none;
          border-radius: 16rpx;
          background-color: var(--page-bg);
          &__title {
            font-weight: bold;
            font-size: 30rpx;
            line-height: 42rpx;
            color: var(--content-color);
            margin-bottom: 2rpx;
          }
          &__status {
            font-size: 26rpx;
            line-height: 36rpx;
            &.status1 {
              color: var(--intr-color);
            }
            &.status2 {
              color: var(--warn-color);
            }
            &.status3 {
              color: var(--dark-main);
            }
          }
        }
      }
      &__from {
        padding: 0 4rpx;
        font-size: 24rpx;
        color: var(--intr-color);
        line-height: 40rpx;
        .company {
          font-weight: bold;
          color: var(--sub-color);
        }
      }
    }
  }
}
</style>
