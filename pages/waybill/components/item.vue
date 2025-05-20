<template>
  <view class="bill" @click="toDetail" v-if="record.Id">
    <view class="tag" :class="className">{{ billStatusName }}</view>
    <view class="material-name">{{ record.Materialname || "" }}</view>
    <view class="weight">
      <template
        v-if="
          ['0', '1', '2', '3', '4', '5', '9'].includes(record.Weightedstatus)
        "
      >
        预装 {{ record.EstimiteWeight }} 吨
      </template>
      <template v-if="['6', '7', '8'].includes(record.Weightedstatus)">
        实装 {{ record.WeightEnt ? record.WeightEnt.Suttle : "" }} 吨
      </template>
    </view>
    <view class="location-wrapper">
      <view class="from">
        <view class="line">
          <view class="dot" v-for="dot in 11" />
        </view>
        <uv-image
          src="/static/images/dot1.png"
          width="16rpx"
          height="16rpx"
          :duration="0"
          :custom-style="{ marginRight: '16rpx' }"
        />
        <view class="city" v-if="record.SupEnt && record.SupEnt.City">
          {{ record.SupEnt.City }}
        </view>
        <view class="name" v-if="record.SupEnt && record.SupEnt.Name">
          {{ record.SupEnt.Name }}
        </view>
      </view>
      <view class="plate">
        <my-plate :plate="record.Carno" :color="record.CarColor" />
      </view>
      <view class="to">
        <uv-image
          src="/static/images/dot2.png"
          width="16rpx"
          height="16rpx"
          :duration="0"
          :custom-style="{ marginRight: '16rpx' }"
        />
        <view class="city" v-if="record.UnloadEnt && record.UnloadEnt.City">
          {{ record.UnloadEnt.City }}
        </view>
        <view
          class="name"
          v-if="record.UnloadEnt && record.UnloadEnt.PlaceName"
        >
          {{ record.UnloadEnt.PlaceName }}
        </view>
      </view>
    </view>
    <view class="price-wrapper" v-if="record.TaxPrice">
      <view
        class="price"
        v-if="
          ['0', '1', '2', '3', '4', '5', '9'].includes(record.Weightedstatus)
        "
      >
        预估总价
        <text style="font-weight: bold">¥ {{ record.EstimateAmount }}</text>
      </view>
      <view class="price" v-if="['6'].includes(record.Weightedstatus)">
        待结算 <text style="font-weight: bold">¥ {{ record.RealAmount }}</text>
      </view>
      <view class="price" v-if="['7', '8'].includes(record.Weightedstatus)">
        已支付 <my-price color="var(--red-color)" :price="record.RealAmount" />
      </view>
    </view>
    <template
      v-if="
        ['0', '1', '2', '3', '4', '5', '6', '7'].includes(record.Weightedstatus)
      "
    >
      <uv-line color="var(--divider)" margin="24rpx 0" />
      <view class="footer">
        <view
          class="btn"
          @click.stop
          v-if="['0', '1'].includes(record.Weightedstatus)"
        >
          <uv-button
            shape="circle"
            text="取消运单"
            color="var(--page-bg)"
            :customTextStyle="{
              color: 'var(--content-color)',
              fontSize: '26rpx',
            }"
            :customStyle="{ height: '32px' }"
            @click="cancel"
          />
        </view>
        <view
          class="btn"
          @click.stop
          v-if="
            ['0', '1', '2', '3', '4', '5', '6', '7'].includes(
              record.Weightedstatus
            )
          "
        >
          <uv-button
            shape="circle"
            text="呼叫司机"
            color="var(--page-bg)"
            :customTextStyle="{
              color: 'var(--content-color)',
              fontSize: '26rpx',
            }"
            :customStyle="{ height: '32px' }"
            @click="takePhone"
          />
        </view>
        <view
          class="btn"
          @click.stop
          v-if="['7'].includes(record.Weightedstatus)"
        >
          <uv-button
            shape="circle"
            text="确认卸货"
            color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"
            :customTextStyle="{ fontSize: '26rpx' }"
            :customStyle="{ height: '32px' }"
            @click="confirmUnload"
          />
        </view>
      </view>
    </template>
  </view>

  <my-confirm ref="confirm" />
</template>

<script setup>
import { BillStatus } from "@/utils/dict.js";
import { ref, computed, watch } from "vue";
import { DisableOnwayEnt, UnloadConfirm } from "@/api/index.js";
import { getToken } from "@/utils/token.js";
const props = defineProps({
  record: {
    type: Object,
  },
});
const emits = defineEmits(["toDetail", "success"]);

// 运单状态
const billStatusName = computed(() => {
  if (["0", "1"].includes(props.record?.Weightedstatus)) {
    return "待入厂";
  } else if (["2", "3", "4"].includes(props.record?.Weightedstatus)) {
    return "已入厂";
  } else if (["2", "3", "4"].includes(props.record?.Weightedstatus)) {
    return "已入厂";
  } else if (["5"].includes(props.record?.Weightedstatus)) {
    return "装车中";
  } else if (["6"].includes(props.record?.Weightedstatus)) {
    return "已装车";
  } else if (["7"].includes(props.record?.Weightedstatus)) {
    return "已出厂";
  } else if (["8"].includes(props.record?.Weightedstatus)) {
    return "已完成";
  } else if (["9"].includes(props.record?.Weightedstatus)) {
    return "已取消";
  }
});
const className = computed(() => {
  return {
    process: ["0", "1", "2", "3", "4", "5", "6", "7"].includes(
      props.record?.Weightedstatus
    ),
    finish: ["8", "9"].includes(props.record?.Weightedstatus),
  };
});

function toDetail() {
  if (!props.record.OnwayId || !props.record.Supplier) return;
  uni.navigateTo({
    url: `/pages/billDetail/billDetail?onwayId=${props.record.OnwayId}&supplyId=${props.record.Supplier.Id}`,
  });
}

// 取消运单
const confirm = ref();
function cancel() {
  confirm.value.confirm({
    title: "确定取消该笔运单？",
    content: "取消前，建议您联系司机说明原因",
    cancelText: "再想想",
    confirmText: "取消运单",
    asyncClose: true,
    async confirm() {
      try {
        await DisableOnwayEnt({
          onwayId: props.record.Id,
          supplyId: props.record.SupplyId,
          userId: getToken().userInfo.Id,
          userType: "owner",
        });
        await uni.showToast({
          title: "操作成功",
          icon: "none",
          complete() {
            uni.$emit(`taskWaybill:cancel`, props.record);
            uni.$emit(`waybill:cancel`, props.record);
          },
        });
        confirm.value.close();
      } catch (err) {
        confirm.value.closeLoading();
        uni.showToast({
          title: err.data,
          icon: "none",
        });
      }
    },
  });
}

// 呼叫司机
function takePhone() {
  if (!props.record?.DriverEnt?.Mobile) {
    return;
  }
  uni.makePhoneCall({
    phoneNumber: props.record?.DriverEnt?.Mobile,
  });
}

// 确认卸货
function confirmUnload() {
  confirm.value.confirm({
    title: "确认完成卸货？",
    content: "确认前，建议您联系司机了解情况",
    cancelText: "再想想",
    confirmText: "确认卸货",
    confirmBgColor: "var(--main-color)",
    asyncClose: true,
    async confirm() {
      try {
        await UnloadConfirm({
          onwayId: props.record.Id,
          supplyId: props.record.SupplyId,
          userId: getToken().userInfo.Id,
          uType: "owner",
        });
        await uni.showToast({
          title: "操作成功",
          icon: "none",
          complete() {
            uni.$emit(`taskWaybill:confirmUnload`, props.record);
            uni.$emit(`waybill:confirmUnload`, props.record);
          },
        });
        confirm.value.close();
      } catch (err) {
        console.log("err", err);
        confirm.value.closeLoading();
        uni.showToast({
          title: err.data,
          icon: "none",
        });
      }
    },
  });
}
</script>

<style lang="scss" scoped>
.bill {
  position: relative;
  margin-bottom: 20rpx;
  background: #ffffff;
  border-radius: 24rpx;
  padding: 32rpx 24rpx 24rpx;
  overflow: hidden;

  .tag {
    padding: 8rpx 24rpx;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0rpx 0 0rpx 24rpx;
    font-weight: 500;
    font-size: 26rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 40rpx;

    &.process {
      background: rgba(49, 206, 87, 0.18);
      color: var(--main-color);
    }

    &.pause {
      background: rgba(252, 126, 44, 0.18);
      color: #fc7e2c;
    }

    &.finish {
      background: #c8d4df;
      color: #ffffff;
    }
  }

  .material-name {
    font-weight: 500;
    font-size: 32rpx;
    color: var(--title-color);
    line-height: 48rpx;
  }

  .weight {
    display: flex;
    font-size: 26rpx;
    color: var(--intr-color);
    line-height: 48rpx;
    margin-bottom: 24rpx;

    .mfrs {
      flex: 1;
      color: var(--content-color);
    }
  }

  .location-wrapper {
    padding: 24rpx 20rpx;
    background: var(--page-bg);
    border-radius: 16rpx;
    margin-bottom: 28rpx;

    .line {
      position: absolute;
      height: 24rpx;
      top: 34rpx;
      left: 6rpx;

      .dot {
        width: 4rpx;
        height: 4rpx;
        border-radius: 50%;
        background-color: #c8d4df;

        &:not(:last-child) {
          margin-bottom: 6rpx;
        }
      }
    }

    .from,
    .to {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 26rpx;
      line-height: 36rpx;

      .city {
        color: var(--title-color);
        margin-right: 16rpx;
      }

      .name {
        flex: 1;
        color: var(--content-color);
      }
    }

    .plate {
      padding-left: 28rpx;
      margin: 20rpx 0;
    }

    .from {
      position: relative;
    }
  }

  .price-wrapper {
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: var(--sub-color);
    line-height: 40rpx;
  }

  .footer {
    margin-top: 24rpx;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .btn {
      margin-left: 20rpx;
    }
  }
}
</style>
