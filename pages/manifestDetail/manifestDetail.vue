<template>
  <uv-navbar
    placeholder
    bgColor="var(--page-bg)"
    @leftClick="leftClick"
  ></uv-navbar>
  <!-- 状态 -->
  <view class="status-wrapper">
    <view class="status-text">
      <template v-if="info.Status === '1'">货单进行中</template>
      <template v-if="info.Status === '2'">等待货单暂停</template>
      <template v-if="info.Status === '3'">货单已暂停</template>
      <template v-if="info.Status === '4'">等待货单完结</template>
      <template v-if="info.Status === '5'">货单已完结</template>
      <!-- <uv-icon name="arrow-right" size="28rpx" color="var(--title-color)"
				:custom-style="{ marginLeft: '4rpx' }" bold /> -->
    </view>
    <view class="tip" v-if="['2', '3', '4'].includes(info.Status)">
      <template v-if="info.Status === '2'"
        >已停止派单，等待进行中运单任务的结束</template
      >
      <template v-if="info.Status === '3'">可点击下方按钮继续派单</template>
      <template v-if="info.Status === '4'"
        >已停止派单，等待进行中运单任务的结束</template
      >
    </view>
  </view>
  <!-- end -->
  <!-- 地址 -->
  <view class="location-wrapper">
    <view class="from-wrapper" @click="openMapModal(1)" v-if="info.SupEnt">
      <view class="icon">装</view>
      <view class="content-box my-border-bottom">
        <view class="info" @click="selectAddress">
          <view class="name uv-line-1">{{
            info.SupEnt ? info.SupEnt.SupplierName : ""
          }}</view>
          <view class="person">
            <text class="user">{{ info.SupEnt ? info.SupEnt.Linker : "" }}</text
            ><text class="phone">{{
              info.SupEnt ? info.SupEnt.LinkerMobile : ""
            }}</text>
          </view>
        </view>
        <uv-image
          src="/static/images/arrow.png"
          :duration="0"
          width="24rpx"
          height="24rpx"
        />
      </view>
    </view>
    <view class="to-wrapper" @click="openMapModal(2)" v-if="info.UnloadEnt">
      <view class="icon">卸</view>
      <view class="content-box">
        <view class="info" @click="selectAddress">
          <view class="name uv-line-1">{{
            info.UnloadEnt ? info.UnloadEnt.PlaceName : ""
          }}</view>
          <view class="person">
            <text class="user">{{
              info.UnloadEnt ? info.UnloadEnt.NickName : ""
            }}</text
            ><text class="phone">{{
              info.UnloadEnt ? info.UnloadEnt.Mobile : ""
            }}</text>
          </view>
        </view>
        <uv-image
          src="/static/images/arrow.png"
          :duration="0"
          width="24rpx"
          height="24rpx"
        />
      </view>
    </view>
  </view>
  <!-- end -->
  <!-- 物料列表 -->
  <view class="material-wrapper">
    <view class="list">
      <view
        class="material"
        :class="{ 'my-border-bottom': index < info.MatList.length - 1 }"
        v-for="(mat, index) in info.MatList"
        :key="mat.Id"
      >
        <view class="name">{{ mat.MaterialName }}</view>
        <view class="info">
          <view class="weight">
            <template v-if="mat.Limittype === '0'">
              已装运 {{ mat.Realweight }} / 不限制
            </template>
            <template v-if="mat.Limittype === '1'">
              已装运 {{ mat.Realweight }} / {{ mat.EstimateWeight }} 吨
            </template>
            <template v-if="mat.Limittype === '2'">
              已装运 {{ mat.Realtimes }} / {{ mat.EstimateTimes }} 车次
            </template>
          </view>
          <uv-line
            direction="col"
            color="#B0BECC"
            length="24rpx"
            margin="0 24rpx"
          />
          <view class="payed">已支付 ¥ {{ mat.Realamount || 0 }}</view>
        </view>
      </view>
    </view>
    <!-- 分割线 -->
    <view class="divider">
      <view class="dots">
        <view class="dot" v-for="item in 100" />
      </view>
    </view>
    <view class="total-payed item">
      <view class="label">合计已支付</view>
      <view class="value">
        <my-price color="var(--red-color)" :price="info.RealCarAmount" />
      </view>
    </view>
    <view class="expect-price item">
      <view class="label">预估总价</view>
      <view class="value"> ¥ {{ info.EstimateCarAmount }}</view>
    </view>
  </view>
  <!-- end -->
  <view class="info-wrapper">
    <view class="item my-border-bottom">
      <view class="label">货主公司</view>
      <view class="value">{{
        info.OwnerEnt ? info.OwnerEnt.OwnerName : ""
      }}</view>
    </view>
    <view class="item">
      <view class="label">货单号</view>
      <view class="value">{{ info.AssignCode }}</view>
    </view>
    <view class="item">
      <view class="label">创建时间</view>
      <view class="value">{{
        info.CreatorTime
          ? dayjs(info.CreatorTime).format("YYYY-MM-DD HH:mm:ss")
          : ""
      }}</view>
    </view>
    <view
      class="item"
      :class="{ 'my-border-bottom': !info.EndTime }"
      v-if="info.StartTime"
    >
      <view class="label">车辆入场时间</view>
      <view class="value">{{ info.StartTime }}</view>
    </view>
    <view class="item my-border-bottom" v-if="info.EndTime">
      <view class="label">结束派单时间</view>
      <view class="value">{{ info.EndTime }}</view>
    </view>
    <view class="item">
      <view class="label">车辆类型限制</view>
      <view class="value">{{ carTypeText }}</view>
    </view>
    <view class="item my-border-bottom" v-if="info.Carno">
      <view class="label">车牌限制</view>
      <view class="value" @click="showAllCarno">
        {{ carLimitText }}
        <uv-image
          v-if="carnoList.length > 1"
          src="/static/images/arrow.png"
          width="18rpx"
          height="18rpx"
          :duration="0"
          :customStyle="{ marginLeft: '2rpx' }"
        />
      </view>
    </view>
    <view class="item" v-if="!!info.Memo">
      <view class="label">派单备注</view>
      <view class="value" @click="openMemo">
        查看
        <uv-image
          src="/static/images/arrow.png"
          width="18rpx"
          height="18rpx"
          :duration="0"
          :customStyle="{ marginLeft: '2rpx' }"
        />
      </view>
    </view>
    <view class="item" v-if="info.Orderno">
      <view class="label">所属订单</view>
      <view class="value">
        {{ info.Orderno }}
        <!-- <uv-image src="/static/images/arrow.png" width="18rpx" height="18rpx" :duration="0":customStyle="{ marginLeft: '2rpx' }"/> -->
      </view>
    </view>
    <view class="item" style="margin-bottom: 0" v-if="!!info.RelOnwayCount">
      <view class="label">关联运单</view>
      <view class="value">
        {{ info.RelOnwayCount }} 单
        <uv-image
          src="/static/images/arrow.png"
          width="18rpx"
          height="18rpx"
          :duration="0"
          :customStyle="{ marginLeft: '2rpx' }"
        />
      </view>
    </view>
  </view>

  <view class="page-footer" v-if="['1', '2', '3', '4'].includes(info.Status)">
    <view class="btns" v-if="['1'].includes(info.Status)">
      <view class="left">
        <uv-button
          text="完结货单"
          color="var(--page-bg)"
          :custom-style="{
            height: '96rpx',
            borderRadius: '16rpx',
            fontSize: '30rpx',
            color: 'var(--sub-color)',
          }"
          @click="finishHandle"
        />
      </view>
      <view class="right">
        <uv-button
          text="暂停货单"
          color="var(--page-bg)"
          :custom-style="{
            height: '96rpx',
            borderRadius: '16rpx',
            fontSize: '30rpx',
            color: 'var(--sub-color)',
          }"
          @click="pauseHandle"
        />
      </view>
    </view>
    <view class="btns" v-if="['2', '3'].includes(info.Status)">
      <view class="left">
        <uv-button
          text="完结货单"
          color="var(--page-bg)"
          :custom-style="{
            height: '96rpx',
            borderRadius: '16rpx',
            fontSize: '30rpx',
            color: 'var(--sub-color)',
          }"
          @click="finishHandle"
        />
      </view>
      <view class="right">
        <uv-button
          text="继续派单"
          color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
          :custom-style="{
            height: '96rpx',
            borderRadius: '16rpx',
            fontSize: '30rpx',
          }"
          @click="goOnHandle"
        />
      </view>
    </view>
    <view class="btns" v-if="['5'].includes(info.Status)">
      <uv-button
        text="继续派单"
        color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
        :custom-style="{
          height: '96rpx',
          width: '100%',
          borderRadius: '16rpx',
          fontSize: '30rpx',
        }"
        @click="goOnHandle"
      />
    </view>
  </view>
  <!-- 地图 -->
  <MapDrawer ref="mapModal" />
  <RemarkDrawer ref="remarkModal" />
  <my-confirm ref="confirm" />
  <CarnoDrawer ref="carnoModal" />
</template>

<script setup>
import { computed, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import {
  GetAssignDetail,
  SetAssignStatusChg,
  ResetAssignStatusChg,
} from "@/api/index.js";
import dayjs from "dayjs";
import RemarkDrawer from "@/pages/billDetail/components/RemarkDrawer.vue";
import MapDrawer from "@/pages/billDetail/components/MapDrawer.vue";
import CarnoDrawer from "./components/CarnoDrawer.vue";

function leftClick() {
  uni.navigateBack();
}

const assignId = ref();
const supplyId = ref();
onLoad((options) => {
  assignId.value = options?.assignId ?? "";
  supplyId.value = options?.supplyId ?? "";
  getDetail();
});

const info = ref({});
async function getDetail() {
  try {
    const res = await GetAssignDetail({
      assignId: assignId.value,
      supplyId: supplyId.value,
    });
    info.value = res || {};
  } catch {}
}

// 车辆类型
const carTypeText = computed(() => {
  if (!info.value.CarType) return "";
  const arr = info.value?.CarType?.split(",") ?? [];
  return arr.join(" + ");
});
// 车牌限制
const carnoList = computed(() => {
  if (!info.value.Carno) return [];
  return info.value?.Carno?.split(",") ?? [];
});
const carLimitText = computed(() => {
  if (carnoList.value.length === 0) return "";
  if (carnoList.value.length === 1) return carnoList.value[0];
  if (carnoList.value.length > 1) {
    return `${carnoList.value[0]} 等 ${carnoList.value.length} 车`;
  }
});
const carnoModal = ref();
function showAllCarno() {
  if (carnoList.value.length <= 1) return;
  carnoModal.value.open(carnoList.value);
}

// 地图
const mapModal = ref();
function openMapModal(type) {
  const data = {
    type,
    name:
      type === 1
        ? info.value?.SupEnt?.SupplierName ?? ""
        : info.value?.UnloadEnt?.PlaceName ?? "",
    address:
      type === 1
        ? `${info.value?.SupEnt?.Province ?? ""}${
            info.value?.SupEnt?.City ?? ""
          }${info.value?.SupEnt?.District ?? ""}${
            info.value?.SupEnt?.Address ?? ""
          }`
        : `${info.value?.UnloadEnt?.Province ?? ""}${
            info.value?.UnloadEnt?.City ?? ""
          }${info.value?.UnloadEnt?.District ?? ""}${
            info.value?.UnloadEnt?.Address ?? ""
          }`,
    user:
      type === 1
        ? info.value?.SupEnt?.Linker ?? ""
        : info.value?.UnloadEnt?.NickName ?? "",
    phone:
      type === 1
        ? info.value?.SupEnt?.LinkerMobile ?? ""
        : info.value?.UnloadEnt?.Mobile ?? "",
    longitude:
      type === 1
        ? info.value?.SupEnt?.Logitude
        : info.value?.UnloadEnt?.Logitude,
    latitude:
      type === 1
        ? info.value?.SupEnt?.Latitude
        : info.value?.UnloadEnt?.Latitude,
  };
  mapModal.value.open(data);
}

const remarkModal = ref();
function openMemo() {
  remarkModal.value.open({
    title: "派单备注",
    memo: info.value.Memo,
  });
}

const confirm = ref();
function finishHandle() {
  confirm.value.confirm({
    title: "确定完结货单？",
    content: "完结后将不再派发新的运单任务，当前进行中的运单任务不受影响",
    cancelText: "再想想",
    confirmText: "完结货单",
    asyncClose: true,
    async confirm() {
      try {
        await SetAssignStatusChg({
          optType: "end",
          assignId: assignId.value,
          supplyId: supplyId.value,
        });
        uni.showToast({
          title: "操作成功",
          icon: "none",
        });
        confirm.value.close();
        uni.$emit(`taskManifest:finish`, props.record);
        uni.$emit(`manifest:finish`, info.value);
        getDetail();
      } catch (err) {
        uni.showToast({
          icon: "none",
          title: err.data,
        });
        confirm.value.closeLoading();
      }
    },
  });
}
function pauseHandle() {
  confirm.value.confirm({
    title: "确定暂停货单？",
    content:
      "暂停后将不再派发新的运单任务，后续可随时继续派单，当前进行中的运单任务不受影响",
    cancelText: "再想想",
    confirmText: "暂停货单",
    confirmBgColor: "var(--main-color)",
    asyncClose: true,
    async confirm() {
      try {
        await SetAssignStatusChg({
          optType: "pause",
          assignId: assignId.value,
          supplyId: supplyId.value,
        });
        uni.showToast({
          title: "操作成功",
          icon: "none",
        });
        confirm.value.close();
        uni.$emit(`taskManifest:pause`, props.record);
        uni.$emit(`manifest:pause`, info.value);
        getDetail();
      } catch (err) {
        uni.showToast({
          icon: "none",
          title: err.data,
        });
        confirm.value.closeLoading();
      }
    },
  });
}
function goOnHandle() {
  confirm.value.confirm({
    title: "确定继续派单？",
    content: "将继续派发运单任务",
    cancelText: "再想想",
    confirmText: "继续派单",
    confirmBgColor: "var(--main-color)",
    asyncClose: true,
    async confirm() {
      try {
        await ResetAssignStatusChg({
          assignId: assignId.value,
          supplyId: supplyId.value,
        });
        uni.showToast({
          title: "操作成功",
          icon: "none",
        });
        confirm.value.close();
        uni.$emit(`manifest:goOn`, info.value);
        getDetail();
      } catch (err) {
        uni.showToast({
          icon: "none",
          title: err.data,
        });
        confirm.value.closeLoading();
      }
    },
  });
}
</script>

<style lang="scss">
page {
  padding: 24rpx 24rpx calc(var(--safe-area-inset-bottom) + 180rpx);
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 40rpx;
  font-size: 26rpx;

  .label {
    color: var(--sub-color);
  }

  .value {
    display: flex;
    align-items: center;
    color: var(--title-color);
  }
}

.status-wrapper {
  margin-bottom: 32rpx;

  .status-text {
    color: var(--title-color);
    display: flex;
    align-items: center;
    font-size: 48rpx;
    line-height: 64rpx;
    font-weight: bold;
  }

  .tip {
    color: var(--content-color);
    font-size: 28rpx;
  }
}

.location-wrapper {
  padding: 0 24rpx;
  margin: 0 0 20rpx;
  background: #ffffff;
  border-radius: 24rpx;

  .from-wrapper,
  .to-wrapper {
    display: flex;
    align-items: center;

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
      margin-right: 24rpx;
    }

    .content-box {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 24rpx 0;

      .info {
        flex: 1;
        line-height: 48rpx;
        margin-right: 20rpx;

        .name {
          font-weight: 500;
          font-size: 30rpx;
          color: var(--title-color);
        }

        .person {
          display: flex;
          align-items: center;
          font-size: 26rpx;
          color: var(--sub-color);

          .user {
            margin-right: 24rpx;
          }
        }
      }
    }
  }

  .from-wrapper {
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

.material-wrapper {
  background: #ffffff;
  border-radius: 24rpx;
  padding: 0 24rpx 32rpx;
  margin-bottom: 20rpx;

  .list {
    .material {
      padding: 28rpx 4rpx;
      line-height: 48rpx;

      .name {
        font-weight: bold;
        font-size: 30rpx;
        color: var(--title-color);
      }

      .info {
        display: flex;
        align-items: center;
        font-size: 26rpx;
        color: var(--sub-color);
      }
    }
  }

  .divider {
    position: relative;
    margin-bottom: 30rpx;

    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      z-index: 200;
      width: 24rpx;
      height: 24rpx;
      background-color: var(--page-bg);
      border-radius: 50%;
    }

    &::before {
      left: -36rpx;
      top: 0;
    }

    &::after {
      right: -36rpx;
      bottom: 0;
    }

    .dots {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 24rpx;
      width: 100%;
      overflow: hidden;
      .dot {
        flex: none;
        width: 8rpx;
        height: 8rpx;
        margin: 0 6rpx;
        border-radius: 50%;
        background-color: var(--page-bg);
      }
    }
  }

  .total-payed.item {
    margin-bottom: 22rpx;
    .label {
      color: var(--red-color);
    }
  }
  .expect-price.item {
    .value {
      font-weight: bold;
      color: var(--sub-color);
    }
  }
  view:last-child {
    margin-bottom: 0 !important;
  }
}

.info-wrapper {
  padding: 32rpx 24rpx;
  background: #ffffff;
  border-radius: 24rpx;

  .item {
    &.my-border-bottom {
      padding: 0 4rpx 32rpx;
      margin-bottom: 32rpx;
    }
    margin-bottom: 28rpx;
  }
}
</style>
