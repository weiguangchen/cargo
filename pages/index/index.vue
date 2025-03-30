<template>
  <scroll-view
    scroll-y
    class="scroll-view"
    :enhanced="true"
    :bounces="false"
    :show-scrollbar="false"
  >
    <view class="page-wrapper">
      <uv-status-bar />
      <view class="page-bg" />
      <!-- 派单模块 -->
      <view class="dispatch-wrapper">
        <uv-image
          src="/static/images/home/logo.png"
          width="488rpx"
          height="144rpx"
          :duration="0"
        />
        <view class="task-wrapper">
          <view
            class="content green"
            v-if="!getToken()"
            @click="openLoginDrawer"
          >
            派单前需要先完成登录
            <uv-image
              src="/static/images/dispatchTask/arrow2.png"
              width="24rpx"
              height="24rpx"
              :duration="0"
            />
          </view>
          <view class="content green" v-else-if="count === 0"
            >暂无进行中任务，快派单吧！</view
          >
          <view class="content orange" v-else>
            有 {{ count }} 项进行中的运输任务
            <uv-image
              src="/static/images/orange-arrow.png"
              width="24rpx"
              height="24rpx"
              :duration="0"
            />
          </view>
        </view>
        <view class="form-wrapper">
          <view class="select-location">
            <view class="from-wrapper" @click="selectAddress(1)">
              <view class="icon">装</view>
              <view class="info">
                <view class="name uv-line-2" v-if="supply">{{
                  supply.Name
                }}</view>
                <view class="placeholder" v-else>在哪儿装货？</view>
              </view>
              <uv-image
                src="/static/images/arrow.png"
                :duration="0"
                width="24rpx"
                height="24rpx"
              />
            </view>
            <view class="to-wrapper" @click="selectAddress(2)">
              <view class="icon">卸</view>
              <view class="info">
                <view class="name uv-line-2" v-if="unload">{{
                  unload.Placename
                }}</view>
                <view class="placeholder" v-else>在哪儿卸货？</view>
              </view>
              <uv-image
                src="/static/images/arrow.png"
                :duration="0"
                width="24rpx"
                height="24rpx"
              />
            </view>
          </view>
          <view class="item">
            <view class="label">车辆类型</view>
            <view class="value">
              <SelectCarType v-model="carType" :disabled="!getToken()" />
            </view>
          </view>
          <uv-button
            text="立即派单"
            color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
            :custom-style="{
              height: '104rpx',
              fontWeight: 'bold',
              borderRadius: '16rpx',
              marginBottom: '24rpx',
            }"
            :customTextStyle="{ fontSize: '32rpx' }"
            @click="dispatch"
          />
          <view class="tip">填写物料清单 · 装卸更加便捷</view>
        </view>
      </view>
      <!-- end -->
      <!-- menus -->
      <view class="menus">
        <view class="menu" @click="navigate('扫码助手')">
          <uv-image
            src="/static/images/home/scan.png"
            width="80rpx"
            height="80rpx"
            :duration="0"
            :custom-style="{ marginBottom: '14rpx' }"
          />
          <view class="">扫码助手</view>
        </view>
        <view class="menu" @click="navigate('数据统计')">
          <uv-image
            src="/static/images/home/statistics.png"
            width="80rpx"
            height="80rpx"
            :duration="0"
            :custom-style="{ marginBottom: '14rpx' }"
          />
          <view class="">数据统计</view>
        </view>
        <view class="menu" @click="toGuide">
          <uv-image
            src="/static/images/home/guide.png"
            width="80rpx"
            height="80rpx"
            :duration="0"
            :custom-style="{ marginBottom: '14rpx' }"
          />
          <view class="">操作指南</view>
        </view>
        <button open-type="feedback" class="menu" @click="navigate('问题反馈')">
          <uv-image
            src="/static/images/home/feedback.png"
            width="80rpx"
            height="80rpx"
            :duration="0"
            :custom-style="{ marginBottom: '14rpx' }"
          />
          <view class="">问题反馈</view>
        </button>
      </view>
      <!-- end -->
      <!-- banner -->
      <view class="banner" @click="follow">
        <uv-image
          width="100%"
          height="100%"
          :duration="0"
          src="/static/images/home/banner.png"
        />
      </view>
      <!-- end -->
      <!-- 登录弹窗 -->
      <my-login-drawer ref="loginDrawer" @success="loginSuccess" />
      <!-- tabbar -->
      <my-tabbar />
    </view>
  </scroll-view>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { onReady, onLoad } from "@dcloudio/uni-app";
import SelectCarType from "../dispatchTask/components/SelectCarType.vue";
import { getWxSetting, getLocationInfo } from "@/utils/authorize.js";
import { useAppStore } from "@/stores/app.js";
import { getToken } from "@/utils/token.js";
import { GetGoodsOrderCount } from "@/api/index.js";
import { sleep } from "@/utils/index.js";
const { ctx } = getCurrentInstance();

const appStore = useAppStore();
onLoad(() => {
  appStore.switchTab(0);
});
onLoad(async () => {
  if (!getToken()) {
    return;
  }
  try {
    // 定位授权
    await getLocationInfo();
  } finally {
    getCount();
  }
});
// 登录
const loginDrawer = ref();
function openLoginDrawer() {
  loginDrawer.value.open();
}
function loginSuccess() {
  uni.reLaunch({
    url: "/pages/index/index",
  });
}
// 获取运单数
const count = ref(0);
async function getCount() {
  const res = await GetGoodsOrderCount();
  count.value = res;
}
// 选择地址
const supply = ref(null);
const unload = ref(null);
function selectAddress(type) {
  // type 1装2卸
  if (!getToken()) {
    openLoginDrawer();
    return;
  }
  uni.navigateTo({
    url: `/pages/selectAddress/selectAddress`,
    success(res) {
      res.eventChannel.emit("setData", {
        type,
        data: type === 1 ? supply.value : unload.value,
      });
    },
    events: {
      async confirm(res) {
        console.log("confirm", res);
        if (res.type === 1) supply.value = res.data;
        if (res.type === 2) unload.value = res.data;
        await sleep(500);
        if (supply.value && unload.value) {
          dispatch();
        }
      },
    },
  });
}
// 车辆类型
const carType = ref([]);
// 派单
function dispatch() {
  if (!getToken()) {
    openLoginDrawer();
    return;
  }
  uni.navigateTo({
    url: "/pages/dispatchTask/dispatchTask",
    success(res) {
      res.eventChannel.emit("setData", {
        carType: carType.value,
        supply: supply.value,
        unload: unload.value,
      });
    },
  });
}
function toGuide() {
  const src = "https://mp.weixin.qq.com/s/giY3v4K_9eQWPaeKfiqgJw";
  // uni.navigateTo({
  // 	url: `/pages/webview/webview?src=${encodeURIComponent(src)}`
  // })
  uni.openOfficialAccountArticle({
    url: src,
  });
}
// 关注公众号
function follow() {
  const src =
    "https://mp.weixin.qq.com/s?__biz=MzkxOTcyODM5OA==&mid=2247483675&idx=1&sn=3f1378b5f85fe5ed6144eb9446f63a32&chksm=c19cf97af6eb706cee30883335ba2e11ab4ebd79c23dac68af13106c2b56e20eee02ddfe656c#rd";
  // uni.navigateTo({
  // 	url: `/pages/webview/webview?src=${encodeURIComponent(src)}`
  // })
  uni.openOfficialAccountArticle({
    url: src,
  });
}
// 跳转
function navigate(type) {
  if (!getToken()) {
    openLoginDrawer();
    return;
  }
  switch (type) {
    case "数据统计":
      uni.showToast({
        title: "敬请期待",
        icon: "none",
      });
      return;
      uni.navigateTo({
        url: "/pages/statistics/statistics",
      });
      break;
    case "问题反馈":
      return;
      uni.navigateTo({
        url: "/pages/feedback/feedback",
      });
      break;
    case "扫码助手":
      uni.scanCode({});
      break;
  }
}
</script>

<style lang="scss">
// page {
//   padding: 40rpx 24rpx 20rpx;
// }

.scroll-view {
  box-sizing: border-box;
  height: 100vh;
  width: 750rpx;
  .page-wrapper {
    padding: 40rpx 24rpx 20rpx;
  }
}

.page-bg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  height: 718rpx;
  width: 100%;
  background: linear-gradient(to bottom, transparent 168px, #f2f4f7),
    url(/static/images/home/bg-text.png),
    linear-gradient(270deg, #31ce57 0%, #07b130 100%);
}

.dispatch-wrapper {
  margin-bottom: 20rpx;

  .task-wrapper {
    margin-top: -28rpx;
    position: relative;
    height: 160rpx;
    background: url(/static/images/home/task-bg.png) left bottom/auto 108rpx
        no-repeat,
      url(/static/images/home/car.png) right bottom/auto 160rpx no-repeat;

    &::after {
      content: "";
      display: block;
      height: 42rpx;
      width: 100%;
      position: absolute;
      z-index: -1;
      left: 0;
      bottom: 0;
      background: #e7f9e9;
      border-radius: 32rpx 32rpx 0rpx 0rpx;
    }

    .content {
      display: flex;
      align-items: center;
      position: absolute;
      left: 24rpx;
      bottom: 0;
      width: fit-content;
      padding: 24rpx 0 24rpx 24rpx;
      border-radius: 16rpx 0rpx 0rpx 16rpx;
      font-weight: bold;
      font-size: 28rpx;
      line-height: 36rpx;
      &.green {
        background: linear-gradient(90deg, #e7f9e9 65%, #ffffff 100%);
        color: var(--main-color);
      }
      &.orange {
        color: #fc7e2c;
        background: linear-gradient(
          90deg,
          #fff1e1 65%,
          rgba(255, 242, 233, 0) 100%
        );
      }
    }
  }

  .form-wrapper {
    background-color: #ffffff;
    padding: 24rpx;
    border-radius: 0 0 24rpx 24rpx;
    .select-location {
      .from-wrapper,
      .to-wrapper {
        padding: 0 24rpx;
        display: flex;
        align-items: center;
        height: 120rpx;
        background: var(--page-bg);
        border-radius: 16rpx;

        .icon {
          flex: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36rpx;
          height: 36rpx;
          border-radius: 8rpx;
          font-weight: 600;
          font-size: 22rpx;
          color: #ffffff;
        }

        .info {
          flex: 1;
          margin: 0 24rpx;
          font-size: 32rpx;
          font-weight: bold;
          line-height: 48rpx;

          .placeholder {
            color: var(--intr-color);
          }

          .name {
            color: var(--title-color);
          }
        }
      }

      .from-wrapper {
        margin-bottom: 24rpx;

        .icon {
          background-color: var(--main-color);
        }
      }

      .to-wrapper {
        .icon {
          background-color: #fc7e2c;
        }
      }
    }
    .item {
      padding: 36rpx 16rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 48rpx;
      .label {
        font-size: 28rpx;
        color: var(--content-color);
      }
      .value {
      }
    }
    .tip {
      text-align: center;
      font-size: 24rpx;
      color: var(--intr-color);
      line-height: 32rpx;
    }
  }
}

.menus {
  border-radius: 24rpx;
  background-color: #ffffff;
  padding: 32rpx 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;

  .menu {
    // all: unset;
    background-color: transparent;
    border: none;
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 1;
    font-size: 26rpx;
    color: var(--title-color);
    line-height: 36rpx;
    padding: 0;
    &::after {
      display: none;
    }
  }
}

.banner {
  height: 192rpx;
  background: #73838e;
  border-radius: 24rpx 24rpx 24rpx 24rpx;
}
</style>
