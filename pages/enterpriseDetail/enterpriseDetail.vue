<template>
  <page-meta
    :page-style="'overflow:' + (show ? 'hidden' : 'visible')"
  ></page-meta>
  <!-- 导航 -->
  <uv-navbar
    :title="supply.Name"
    @leftClick="leftClick"
    :bgColor="`rgba(255,255,255,${ratio})`"
    :titleStyle="{
      color: `rgba(26, 27, 28, ${ratio})`,
      paddingRight: `${navbarPad}px`,
      fontWeight: 500,
    }"
  />
  <!-- end -->
  <!-- 头图 -->
  <view class="mfrs-avatar" style="width: 100%; height: 540rpx">
    <uv-image
      v-if="supply"
      width="100%"
      height="100%"
      :src="supply.Photo"
      mode="aspectFill"
    >
      <template v-slot:loading>
        <view style="background-color: #e3e9ef"></view>
      </template>
      <template v-slot:error>
        <view style="background-color: #e3e9ef"></view>
      </template>
    </uv-image>
  </view>
  <!-- end -->
  <!-- 详细信息 -->
  <view class="info-wrapper">
    <view class="title uv-line-2">{{ supply.Name }}</view>
    <view class="status-wrapper">
      <view class="status" :class="{ signed: supply.Signed === '1' }">{{
        supply.Signed === "1" ? "已签约" : "未签约"
      }}</view>
      <view class="price" v-if="supply.Balance"
        >余额¥ {{ supply.Balance }}</view
      >
    </view>
    <view class="notice" @click="openNotice" v-if="supply.Notice">
      <uv-image
        src="/static/images/enterpriseDetail/notice.png"
        width="72rpx"
        height="40rpx"
      />
      <view class="content uv-line-1">{{ supply.Notice }}</view>
      <uv-image
        src="/static/images/enterpriseDetail/arrow.png"
        width="32rpx"
        height="32rpx"
      />
    </view>
    <view class="location">
      <view class="address-box my-border-right">
        <view class="dis" v-if="dis">距离您 {{ dis }} km</view>
        <view class="address uv-line-1"
          >{{ supply.Province || "" }}{{ supply.City || ""
          }}{{ supply.Address || "" }}</view
        >
      </view>
      <view class="handle-box">
        <view class="btn" @click="takePhone">
          <view class="round">
            <uv-image
              src="/static/images/enterpriseDetail/phone.png"
              width="48rpx"
              height="48rpx"
            />
          </view>
          <view>电话</view>
        </view>
        <view class="btn" @click="openMapApp">
          <view class="round">
            <uv-image
              src="/static/images/enterpriseDetail/location.png"
              width="48rpx"
              height="48rpx"
            />
          </view>
          <view>地图</view>
        </view>
      </view>
    </view>
  </view>
  <!-- end -->
  <!-- 联动tabs -->
  <uv-sticky index="cate" :customNavHeight="ctx.$uv.addUnit(customNavHeight)">
    <scroll-view
      class="categorys-list"
      scroll-x
      type="list"
      :show-scrollbar="false"
      enable-flex
      scroll-with-animation
      :scroll-into-view="intoView"
      scroll-into-view-alignment="center"
    >
      <view
        class="category"
        :class="{ active: active === index }"
        v-for="(item, index) in list"
        :id="`category-${index}`"
        @click="chooseCate(item, index)"
        >{{ item.typeName }}</view
      >
    </scroll-view>
    <view
      style="
        font-size: 24rpx;
        color: #f15948;
        height: 72rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff0ee;
      "
      >本页面价格仅供参考，最终价格请以实际签约为准</view
    >
  </uv-sticky>
  <!-- end -->
  <!-- 物料 -->
  <view class="category-wrapper">
    <view class="category-item" v-for="item in list" :key="item.typeId">
      <view class="cate-name">{{ item.typeName }}</view>
      <view class="materials-list">
        <view
          class="material"
          :class="{ 'my-border-bottom': j < item.materialList.length - 1 }"
          v-for="(cate, j) in item.materialList"
          :key="cate.MaterialId"
        >
          <view class="img">
            <uv-image
              width="100%"
              height="100%"
              :duration="0"
              :src="cate.Image"
              mode="aspectFill"
            >
              <template v-slot:error>
                <view
                  style="width: 100%; height: 100%; background-color: #e3e9ef"
                />
              </template>
            </uv-image>
          </view>
          <view class="info">
            <view class="">
              <view class="name">{{ cate.MaterialName }}</view>
              <!-- <view class="desc">这是一个规格特征</view> -->
            </view>
            <view class="price">
              <my-price
                :price="cate.TaxPrice"
                color="var(--red-color)"
                unit="吨"
              />
              <!-- <text class="old-price">{{ cate.TaxPrice }}</text> -->
              <!-- <text class="seek">咨询企业获取价格</text> -->
            </view>
          </view>
          <!-- <view class="dispatch">派车</view> -->
        </view>
      </view>
    </view>
  </view>
  <!-- end -->
  <!-- 公告 -->
  <my-drawer
    ref="noticeDrawer"
    title="生产企业公告"
    closeable
    @change="(e) => (show = e.show)"
  >
    <view class="notice-drawer">{{ supply.Notice }}</view>
  </my-drawer>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  getCurrentInstance,
  nextTick,
  unref,
  watch,
  watchEffect,
} from "vue";
import { onLoad, onReady, onPageScroll } from "@dcloudio/uni-app";
import { GetSupplyMaterialByOwner } from "@/api/index.js";
import { gcj02Distance } from "@/utils/index.js";
import { useLocationStore } from "@/stores/location.js";
import { getLocationInfo } from "@/utils/authorize.js";

const locationStore = useLocationStore();

const { ctx } = getCurrentInstance();
// 距离
const dis = computed(() => {
  // console.log('dis',locationStore.location,props.record)
  if (
    !locationStore.location ||
    !supply.value.Latitude ||
    !supply.value.Logitude
  )
    return null;
  const distance = gcj02Distance({
    lat1: supply.value.Latitude,
    lon1: supply.value.Logitude,
    lat2: locationStore.location.latitude,
    lon2: locationStore.location.longitude,
  });
  // console.log('distance',distance)
  return distance;
});

const supply = ref({});
onLoad((options) => {
  getLocationInfo();

  const instance = getCurrentInstance().proxy;
  const eventChannel = instance.getOpenerEventChannel();
  eventChannel.on("setData", (data) => {
    console.log("setData", data);
    supply.value = data?.supply ?? {};
    if (data.supply) {
      getMaterialList();
    }
  });
});
// 自定义导航
function leftClick() {
  uni.navigateBack();
}
// 公告
const show = ref(false);
const noticeDrawer = ref();
function openNotice() {
  noticeDrawer.value.popup.open();
}
// navbar效果
const cateTop = ref(1);
const customNavHeight = ref(64);
onReady(async () => {
  let info = await ctx.$uv.getRect(".categorys-list");
  // console.log('top',info.top)
  cateTop.value = info.top;
  const statusBarHeight = ctx.$uv.sys().statusBarHeight;
  customNavHeight.value = statusBarHeight + 44;
});
const scrollTop = ref(1);
onPageScroll((e) => {
  // console.log('e1',e.scrollTop)
  scrollTop.value = e.scrollTop;
});
const ratio = computed(() => {
  const r = unref(scrollTop) / unref(cateTop);
  return r >= 1 ? 1 : r;
});
const navbarPad = ref(0);
onMounted(() => {
  let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
  navbarPad.value = menuButtonInfo.width + 20;
});
// tab联动
const active = ref(0);
const intoView = computed(() => `category-${active.value}`);
const list = ref([]);
const listInit = ref(false);
async function getMaterialList() {
  listInit.value = false;
  const res = await GetSupplyMaterialByOwner({
    supplyId: supply.value.Id,
  });
  list.value = res;
  listInit.value = true;
  await nextTick();
  getRect();
}
async function getRect() {
  let info = await ctx.$uv.getRect(".category-item", true);
  info.forEach((m, i) => {
    unref(list)[i].bottom = m.bottom - unref(customNavHeight) - 44;
    unref(list)[i].top = m.top - unref(customNavHeight) - 44;
  });
}
function chooseCate(item, index) {
  uni.pageScrollTo({
    scrollTop: item.top,
  });
}

watchEffect(() => {
  if (!listInit.value) return;
  const index = unref(list).findIndex((m) => unref(scrollTop) < m.bottom);
  active.value = index;
});

// 打电话
function takePhone() {
  if (!supply.value.LinkerMobile) {
    uni.showToast({
      title: "暂无联系人电话",
      icon: "none",
    });
    return;
  }
  uni.makePhoneCall({
    phoneNumber: supply.value.LinkerMobile,
  });
}
// 打开地图
function openMapApp() {
  if (
    !supply.value.Latitude ||
    supply.value.Latitude === 0 ||
    !supply.value.Logitude ||
    supply.value.Logitude === 0
  ) {
    uni.showToast({
      title: "暂无定位",
      icon: "none",
    });
    return;
  }
  uni.openLocation({
    longitude: supply.value.Logitude,
    latitude: supply.value.Latitude,
    name: supply.value.Name,
  });
}
</script>

<style lang="scss">
page {
  padding-bottom: max(var(--safe-area-inset-bottom), var(--safe-bottom));
}
.uv-navbar {
  .uv-navbar__content {
    justify-content: flex-start !important;
    padding-left: 44px;
    .uv-navbar__content__title {
      text-align: left;
    }
  }
}
.mfrs-avatar {
  background-color: var(--page-bg);
}
.info-wrapper {
  padding: 36rpx 24rpx 8rpx;
  background: #ffffff;
  border-radius: 24rpx 24rpx 0rpx 0rpx;

  .title {
    font-weight: 600;
    font-size: 40rpx;
    line-height: 56rpx;
    color: var(--title-color);
    margin-bottom: 24rpx;
  }

  .status-wrapper {
    display: inline-flex;
    height: 44rpx;
    border-radius: 8rpx;
    overflow: hidden;
    margin-bottom: 24rpx;
    border: 1px solid var(--main-color);

    .status,
    .price {
      display: flex;
      align-items: center;
      font-size: 26rpx;
      padding: 0 12rpx;
    }

    .status {
      background-color: var(--page-bg);
      color: var(--main-color);
      &.signed {
        background-color: var(--main-color);
        color: #ffffff;
      }
    }

    .price {
      background-color: var(--page-bg);
      color: var(--main-color);
      border-left: 1px solid var(--main-color);
    }
  }

  .notice {
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: var(--content-color);
    line-height: 40rpx;
    margin-bottom: 24rpx;

    .content {
      flex: 1;
      margin: 0 10rpx 0 16rpx;
    }
  }

  .location {
    display: flex;
    align-items: center;
    background: var(--page-bg);
    border-radius: 24rpx;
    padding: 16rpx 24rpx;
    background-image: url(/static/images/enterpriseDetail/bg.png);
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: right top;

    .address-box {
      flex: none;
      width: 430rpx;
      padding-right: 24rpx;
      border-right: 1px solid #c8d4df;
      line-height: 40rpx;

      .dis {
        font-size: 26rpx;
        color: var(--title-color);
        margin-bottom: 4rpx;
        font-weight: 600;
      }

      .address {
        font-size: 24rpx;
        color: var(--sub-color);
      }
    }

    .handle-box {
      padding-left: 40rpx;
      flex: 1;
      display: flex;
      justify-content: flex-start;
      font-weight: 500;
      font-size: 22rpx;
      color: var(--main-color);
      line-height: 28rpx;

      .btn {
        flex: none;
        text-align: center;
        margin-right: 40rpx;

        .round {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64rpx;
          height: 64rpx;
          background-color: #ffffff;
          border-radius: 50%;
          margin-bottom: 8rpx;
        }
      }
    }
  }
}

.categorys-list {
  background-color: #fff;
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  display: flex;
  flex-direction: row;

  .category {
    position: relative;
    padding: 0 24rpx;
    color: var(--sub-color);
    font-size: 30rpx;
    flex: none;

    &.active {
      font-weight: 600;
      font-size: 30rpx;
      color: var(--title-color);

      &::after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 32rpx;
        height: 8rpx;
        background: var(--main-color);
        border-radius: 6rpx;
      }
    }
  }
}

.category-wrapper {
  padding: 0 24rpx;

  .category-item {
    .cate-name {
      padding: 24rpx 0;
      font-size: 26rpx;
      color: #a0afba;
      line-height: 32rpx;
    }

    .materials-list {
      padding: 0 24rpx;
      background: #ffffff;
      border-radius: 24rpx;

      .material {
        padding: 24rpx 0;
        display: flex;

        .img {
          flex: none;
          width: 176rpx;
          height: 176rpx;
          border-radius: 16rpx;
          overflow: hidden;
          margin-right: 24rpx;
          background-color: #73838e;
        }

        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-right: 24rpx;
          padding-top: 14rpx;
          padding-bottom: 6rpx;
          .name {
            font-weight: 600;
            font-size: 34rpx;
            color: var(--title-color);
            line-height: 36rpx;
            margin-bottom: 8rpx;
          }

          .desc {
            font-size: 24rpx;
            color: var(--sub-color);
            line-height: 32rpx;
          }

          .price {
            display: flex;
            align-items: baseline;

            .old-price {
              font-weight: 600;
              font-size: 26rpx;
              color: #a0afba;
              text-decoration: line-through;
              margin-left: 20rpx;
            }

            .seek {
              font-size: 26rpx;
              color: var(--red-color);
              line-height: 40rpx;
            }
          }
        }

        .dispatch {
          align-self: center;
          display: inline-block;
          width: 120rpx;
          text-align: center;
          height: 60rpx;
          line-height: 60rpx;
          border-radius: 30rpx;
          background: linear-gradient(270deg, #31ce57 0%, #07b130 100%);
          font-weight: 600;
          font-size: 26rpx;
          color: #ffffff;
        }
      }
    }
  }
}

.notice-drawer {
  padding: 32rpx;
  font-size: 28rpx;
  color: var(--title-color);
  line-height: 36rpx;
}
</style>
