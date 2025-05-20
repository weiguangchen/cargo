<template>
  <page-meta
    :page-style="'overflow:' + (disabledScroll ? 'hidden' : 'visible')"
  ></page-meta>
  <view class="page-bg" />

  <view class="top-box">
    <view class="select-location my-border-bottom">
      <view class="from-wrapper">
        <view class="icon">装</view>
        <view class="info" @click="selectAddress(1)">
          <template v-if="supply">
            <view class="name uv-line-1">{{ supply.Name }}</view>
            <view class="person">
              <view class="user">{{ supply.Linker }}</view>
              <view class="phone">{{ supply.LinkerMobile }}</view>
            </view>
          </template>
          <view class="placeholder" v-else>在哪儿装货？</view>
        </view>
        <uv-image
          src="/static/images/arrow.png"
          :duration="0"
          width="24rpx"
          height="24rpx"
        />
      </view>
      <view class="to-wrapper">
        <view class="icon">卸</view>
        <view class="info" @click="selectAddress(2)">
          <template v-if="unload">
            <view class="name uv-line-1">{{ unload.Placename }}</view>
            <view class="person">
              <view class="user">{{ unload.Nickname }}</view>
              <view class="phone">{{ unload.Mobile }}</view>
            </view>
          </template>
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
    <view class="select-time">
      <uv-image
        src="/static/images/dispatchTask/clock.png"
        width="36rpx"
        height="36rpx"
        :duration="0"
        :custom-style="{ marginRight: '24rpx' }"
      />
      <view class="time-wrapper">
        <view v-if="model.validHour" class="valid-hour">
          根据厂家设置，派车
          <text class="hour">{{ model.validHour }}小时</text> 后将自动结束
        </view>
        <template v-else>
          <view
            class="start-time"
            hover-class="time--active"
            hover-start-time="0"
            hover-stay-time="200"
            @click="selectTime('start')"
          >
            <view class="time" v-if="startTime" @click.stop>
              <text style="margin-right: 4rpx; font-weight: bold">{{
                dayjs(startTime).format("MM-DD HH:mm")
              }}</text
              >入场
              <uv-icon
                name="close"
                size="12"
                color="var(--intr-color)"
                :custom-style="{ marginLeft: '18rpx' }"
                @click="clearTime('start')"
              />
            </view>
            <view class="placeholder" v-else>
              选填车辆入厂时间<uv-image
                src="/static/images/arrow.png"
                :duration="0"
                width="24rpx"
                height="24rpx"
                :custom-style="{ marginLeft: '6rpx' }"
              />
            </view>
          </view>
          <uv-line
            direction="col"
            length="24rpx"
            color="#B0BECC"
            margin="0 20rpx"
          ></uv-line>
          <view
            class="end-time"
            hover-class="time--active"
            hover-start-time="0"
            hover-stay-time="200"
            @click="selectTime('end')"
          >
            <view class="time" v-if="endTime" @click.stop>
              <text style="margin-right: 4rpx; font-weight: bold">{{
                dayjs(endTime).format("MM-DD HH:mm")
              }}</text
              >结束
              <uv-icon
                name="close"
                size="12"
                color="var(--intr-color)"
                :custom-style="{ marginLeft: '18rpx' }"
                @click="clearTime('end')"
              />
            </view>
            <view class="placeholder" v-else>
              选填结束派单时间<uv-image
                src="/static/images/arrow.png"
                :duration="0"
                width="24rpx"
                height="24rpx"
                :custom-style="{ marginLeft: '6rpx' }"
              />
            </view>
          </view>
        </template>
      </view>
    </view>
  </view>

  <uv-form
    labelPosition="left"
    :model="model"
    :rules="rules"
    ref="form"
    label-width="200rpx"
  >
    <view class="form-item-wrapper">
      <uv-form-item label="货主公司">
        <view style="display: flex; justify-content: flex-end">
          <SelectCargo
            v-model="model.OwnerId"
            :options="cargoOptions"
            :disabled="cargoDisabled"
            @disabledClick="cargoDisabledClick"
            @change="cargoChange"
          />
        </view>
      </uv-form-item>
    </view>
    <view class="form-item-wrapper">
      <uv-form-item label="车辆类型限制" prop="CarType">
        <view style="display: flex; justify-content: flex-end">
          <SelectCarType v-model="model.CarType" />
        </view>
      </uv-form-item>
      <uv-form-item label="车牌限制" prop="Carno">
        <view style="display: flex; justify-content: flex-end">
          <SelectPlate v-model="model.Carno" />
        </view>
      </uv-form-item>
    </view>
    <view class="form-item-wrapper material">
      <view class="title-wrapper">
        <view class="title">计划装运物料</view>
        <view v-if="order" class="no" @click="openOrder"
          >来自订单 {{ order.SSOrderNo }}
          <uv-image
            v-if="orderList.length > 1"
            src="/static/images/arrow.png"
            :duration="0"
            width="24rpx"
            height="24rpx"
            :custom-style="{ marginLeft: '6rpx' }"
        /></view>
      </view>
      <uv-form-item prop="material" labelPosition="top">
        <view class="select-material">
          <view v-if="!(supply && model.OwnerId)" class="tip"
            >请先确认装货地、货主公司和订单</view
          >
          <view v-else-if="orderList.length === 0" class="tip"
            >未查询到生效中的订单</view
          >
          <view v-else-if="!order" class="tip" @click="openOrder">
            存在多笔订单，<text style="color: var(--main-color)">请选择</text
            ><uv-image
              src="/static/images/dispatchTask/arrow2.png"
              :duration="0"
              width="16rpx"
              height="16rpx"
            />
          </view>
          <view v-else class="materials">
            <Material
              :borderBottom="index < order.MaterialsList.length - 1"
              v-for="(item, index) in order.MaterialsList"
              v-model="order.MaterialsList[index]"
              :order="order"
              :key="item.SSMaterialId"
            />
          </view>
        </view>
      </uv-form-item>
    </view>
    <view class="form-item-wrapper">
      <uv-form-item label="备注" prop="Memo">
        <Remark v-model="model.Memo" />
      </uv-form-item>
    </view>
  </uv-form>

  <view class="page-footer">
    <view class="left">
      <view class="price-wrapper">
        <text>预估：</text>
        <text class="price1">¥ {{ totalPrice }}</text>
      </view>
      <view class="price-wrapper">
        <text>余额：</text>
        <text class="price2"
          >¥ {{ order ? Big(order.Balance || 0).toFixed(2) : "-" }}</text
        >
      </view>
    </view>
    <view class="right">
      <uv-button
        :loading="submiting"
        text="确认派单"
        color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
        :customStyle="{ height: '96rpx', borderRadius: '16rpx' }"
        @click="submit"
      />
    </view>

    <view class="warning" v-if="showTip"
      >余额较低，存在车辆无法装运风险，请及时充值</view
    >
  </view>

  <!-- 时间 -->
  <uv-datetime-picker
    ref="datetimePicker"
    v-model="value"
    mode="datetime"
    confirmColor="var(--main-color)"
    :formatter="formatter"
    :maxDate="maxDate"
    :minDate="minDate"
    @confirm="confirmTime"
  />

  <!-- 订单 -->
  <my-drawer ref="orderDrawer" title="选择订单">
    <view class="my-dropdown-items">
      <view
        class="my-dropdown-item"
        :class="{ active: order && order.SSOrderId === item.SSOrderId }"
        v-for="item in orderList"
        :key="item.SSOrderId"
        @click="selectOrder(item)"
      >
        <view style="flex: 1">订单 {{ item.SSOrderNo }}</view>
        <uv-image
          v-if="order && order.SSOrderId === item.SSOrderId"
          src="/static/images/check.png"
          :duration="0"
          width="32rpx"
          height="32rpx"
        />
      </view>
    </view>
  </my-drawer>

  <!-- 派单结果 -->
  <ResultDrawer ref="resultDrawer" />
</template>

<script setup>
import { ref, reactive, unref, getCurrentInstance, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import SelectCarType from "./components/SelectCarType.vue";
import SelectPlate from "./components/SelectPlate.vue";
import SelectCargo from "./components/SelectCargo.vue";
import Remark from "./components/Remark.vue";
import SelectOrder from "./components/SelectOrder.vue";
import Material from "./components/Material.vue";
import dayjs from "dayjs";
import Big from "big.js";
import {
  GetOwnerBySupply,
  GetOwnerOrderList,
  SetAssignTicket,
} from "@/api/index.js";
import { getToken } from "@/utils/token.js";
import ResultDrawer from "./components/ResultDrawer.vue";

const eventChannel = ref();
onLoad((options) => {
  const instance = getCurrentInstance().proxy;
  const channel = instance.getOpenerEventChannel();
  eventChannel.value = channel;
  channel.on("setData", (res) => {
    console.log("setData", res);
    supply.value = res.supply;
    unload.value = res.unload;
    model.CarType = res.carType;

    if (res.supply) {
      getCargpOptions();
    }
  });
});
// 选择装卸地址
const supply = ref(null);
const unload = ref(null);

function selectAddress(type) {
  uni.navigateTo({
    url: `/pages/selectAddress/selectAddress`,
    success(res) {
      res.eventChannel.emit("setData", {
        type,
        data: type === 1 ? supply.value : unload.value,
      });
    },
    events: {
      confirm(res) {
        console.log("confirm", res);
        if (res.type === 1) {
          supply.value = res.data;
          model.OwnerId = "";
          order.value = null;
          orderList.value = [];
          getCargpOptions();
        }
        if (res.type === 2) unload.value = res.data;
      },
    },
  });
}
// 选择时间
const datetimePicker = ref();
const timeMode = ref("start");
const startTime = ref("");
const endTime = ref("");
const min = dayjs().valueOf();
const max = dayjs().add(1, "year").valueOf();
const minDate = ref();
const maxDate = ref();
function formatter(type, value) {
  if (type === "year") return `${value}年`;
  if (type === "month") return `${value}月`;
  if (type === "day") return `${value}日`;
  if (type === "hour") return `${value}时`;
  if (type === "minute") return `${value}分`;
  return value;
}
function selectTime(type) {
  timeMode.value = type;
  if (type === "start") {
    minDate.value = min;
    maxDate.value = endTime.value ? dayjs(endTime.value).valueOf() : max;
  }
  if (type === "end") {
    minDate.value = startTime.value ? dayjs(startTime.value).valueOf() : min;
    maxDate.value = max;
  }
  datetimePicker.value.open();
}

function clearTime(type) {
  if (type === "start") startTime.value = "";
  if (type === "end") endTime.value = "";
}

function confirmTime({ value }) {
  console.log("value", value, dayjs(value).format("YYYY-MM-DD HH:mm"));
  if (timeMode.value === "start") startTime.value = value;
  if (timeMode.value === "end") endTime.value = value;
}
// 表单
const model = reactive({
  OwnerId: "",
  CarType: [],
  Carno: [],
  Memo: "",
  validHour: "",
});
const rules = ref({
  OwnerId: [
    {
      type: "string",
      required: true,
      message: "请选择货主公司",
      trigger: ["blur", "change"],
    },
  ],
});
// 选择货主公司
const cargoOptions = ref([]);
async function getCargpOptions() {
  if (!supply.value.Id) {
    return;
  }
  const res = await GetOwnerBySupply({
    supplyId: supply.value.Id,
    qType: 1,
  });
  cargoOptions.value =
    res?.list?.map((m) => ({
      value: m.Id,
      label: m.Ownername,
    })) ?? [];
  model.validHour = res?.validHour ?? "";
  if (res?.list?.length === 1) {
    model.OwnerId = res?.list?.[0]?.Id ?? "";
    getOrder();
  }
}
const cargoDisabled = computed(() => {
  return !supply.value?.Id;
});

function cargoDisabledClick() {
  uni.showToast({
    title: "请先选择装货地",
    icon: "none",
  });
}
function cargoChange(val) {
  order.value = null;
  orderList.value = [];
  getOrder();
}
// 选择订单
const orderDrawer = ref();
const order = ref();
const orderList = ref([]);
async function getOrder() {
  const res = await GetOwnerOrderList({
    supplyId: supply.value.Id,
    ownerId: model.OwnerId,
  });
  const temp = res.map((m) => ({
    ...m,
    MaterialsList:
      m.MaterialsList?.map((n) => ({
        ...n,
        Limittype: "0",
        EstimiteWeight: n.minWgtLeft,
      })) ?? [],
  }));
  orderList.value = temp;
  if (temp.length === 1) {
    order.value = temp?.[0] ?? null;
  }
}
function openOrder() {
  if (orderList.value.length <= 1) {
    return;
  }
  orderDrawer.value.popup.open();
}

function selectOrder(item) {
  order.value = item;
  orderDrawer.value.popup.close();
}

// 预估
const totalPrice = computed(() => {
  let price = Big(0).toFixed(2);
  if (!order.value) return price;
  if (
    !order.value.MaterialsList ||
    (order.value.MaterialsList && order.value.MaterialsList.length === 0)
  )
    return price;
  const total = order.value.MaterialsList.map((m) => {
    const { TaxPrice, Limittype, EstimiteWeight, EstimiteTimes } = m;
    const SingleWeight = order.value.SingleWeight;
    if (Limittype === "0") price = Big(0).toFixed(2);
    if (Limittype === "1")
      price = Big(EstimiteWeight || 0)
        .times(TaxPrice || 0)
        .toFixed(2);
    if (Limittype === "2")
      price = Big(EstimiteTimes || 0)
        .times(SingleWeight || 0)
        .times(TaxPrice || 0)
        .toFixed(2);
    console.log("price", price);
    return price;
  }).reduce((p, n) => Big(p).plus(n).toFixed(2), 0);
  console.log("total", total, order.value.MaterialsList);
  return total;
});
// 是否展示横幅
const showTip = computed(() => {
  if (!order.value) return false;
  const limit = Big(order.value.AlertBalance || 0);
  const total = Big(order.value.Balance || 0)
    .plus(order.value.CreditBalance || 0)
    .minus(totalPrice.value);
  return total.lt(limit);
});
// 提交
const submiting = ref(false);
const resultDrawer = ref();
const disabledScroll = ref(false);
async function submit() {
  console.log("order", order.value);
  if (!supply.value) {
    uni.showToast({
      title: "请选择装货地",
      icon: "none",
    });
    return;
  }
  if (!unload.value) {
    uni.showToast({
      title: "请选择卸货地",
      icon: "none",
    });
    return;
  }
  if (!model.OwnerId) {
    uni.showToast({
      title: "请选择货主公司",
      icon: "none",
    });
    return;
  }
  if (!order.value) {
    uni.showToast({
      title: "请选择订单",
      icon: "none",
    });
    return;
  }
  const hasMaterial = order.value.MaterialsList.some((m) => {
    return ["1", "2"].includes(m.Limittype);
  });
  if (!hasMaterial) {
    uni.showToast({
      title: "请选择物料",
      icon: "none",
    });
    return;
  }
  const params = {
    Supply: supply.value.Id, //生产企业主键
    OwnerId: model.OwnerId, //货主主键
    UnloadPlaceId: unload.value.Id, // 卸货地址主键
    Orderid: order.value.SSOrderId, //订单主键
    Orderno: order.value.SSOrderNo, // 订单编码
    Carno: model.Carno.join(","), // 限制车牌，多个‘,’分隔
    CarType: model.CarType.join(","),
    MatList: order.value.MaterialsList.map((m) => {
      const item = {
        Material: m.SSMaterialId,
        Materialname: m.SSMaterialName,
        Limittype: m.Limittype,
        LeftWeight: m.WeightLeft,
        EstimatePrice: m.TaxPrice,
      };
      if (m.Limittype === "1") item.EstimiteWeight = m.EstimiteWeight;
      if (m.Limittype === "2") item.EstimiteTimes = m.EstimiteTimes;
      return item;
    }),
    Memo: model.Memo,
    OwnerUserId: getToken()?.userInfo?.Id ?? "",
  };

  if (!model.validHour) {
    params.StartTime = startTime.value
      ? dayjs(startTime.value).format("YYYY-MM-DD HH:mm")
      : ""; //开始进厂时间
    params.EndTime = endTime.value
      ? dayjs(endTime.value).format("YYYY-MM-DD HH:mm")
      : ""; // 截止接单时间
  }
  console.log("params", params);
  try {
    submiting.value = true;
    await SetAssignTicket(params);
    uni.$emit("task:reload");
    uni.showToast({
      title: "派单成功！",
      icon: "none",
    });
    disabledScroll.value = true;
    resultDrawer.value.open();
  } catch (err) {
    uni.showToast({
      title: err.data,
      icon: "none",
    });
  } finally {
    submiting.value = false;
  }
}
</script>

<style lang="scss">
.page-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: -1;
  height: 280rpx;
  background: linear-gradient(to bottom, #07b130 0%, #f2f4f7);
}

page {
  padding: 28rpx 24rpx 300rpx;
}

.top-box {
  background: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  padding: 36rpx 24rpx 32rpx;
  margin-bottom: 20rpx;

  .select-location {
    padding-bottom: 32rpx;
    margin-bottom: 32rpx;

    .from-wrapper,
    .to-wrapper {
      display: flex;
      align-items: center;
      height: 88rpx;

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

        .placeholder {
          font-weight: 500;
          font-size: 30rpx;
          color: var(--intr-color);
          line-height: 48rpx;
        }

        .name {
          font-weight: 500;
          font-size: 30rpx;
          color: var(--title-color);
          line-height: 48rpx;
        }

        .person {
          display: flex;
          align-items: center;
          font-size: 26rpx;
          color: var(--sub-color);
          line-height: 36rpx;

          .user {
            margin-right: 24rpx;
          }
        }
      }
    }

    .from-wrapper {
      margin-bottom: 40rpx;

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

  .select-time {
    display: flex;
    align-items: center;
    height: 48rpx;

    .time-wrapper {
      flex: 1;
      display: flex;
      align-items: center;

      .valid-hour {
        font-weight: 400;
        font-size: 26rpx;
        color: #73838e;
        line-height: 48rpx;
        .hour {
          font-weight: 600;
          color: var(--main-color);
        }
      }

      .start-time,
      .end-time {
        flex: 1;
        font-size: 26rpx;
        color: var(--title-color);
        line-height: 48rpx;

        .placeholder {
          display: flex;
          align-items: center;
          font-size: 26rpx;
          color: var(--intr-color);
          line-height: 48rpx;
        }

        .time {
          display: flex;
          align-items: center;
        }
      }

      .time--active {
        opacity: 0.45;
      }
    }
  }
}

.form-item-wrapper {
  background: #ffffff;
  border-radius: 24rpx;
  padding: 0 28rpx;
  margin-bottom: 20rpx;

  .uv-form-item__body {
    padding: 32rpx 0 !important;

    &__left {
      &__content {
        &__label {
          font-size: 28rpx !important;
          color: var(--content-color) !important;
          line-height: 48rpx;
        }
      }
    }
  }

  &.material {
    .title-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 32rpx;

      .title {
        font-weight: bold;
        font-size: 30rpx;
        color: var(--title-color);
        line-height: 40rpx;
      }

      .no {
        display: flex;
        align-items: center;
        font-size: 24rpx;
        color: var(--intr-color);
        line-height: 40rpx;
      }
    }

    .select-material {
      padding: 0 24rpx;
      background: var(--page-bg);
      border-radius: 16rpx;

      .tip {
        padding: 36rpx 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24rpx;
        color: var(--sub-color);
        line-height: 40rpx;
      }
    }
  }
}

.page-footer {
  display: flex;
  justify-content: space-between;

  .warning {
    position: absolute;
    left: 0;
    width: 100%;
    top: 0;
    font-weight: 500;
    font-size: 24rpx;
    transform: translateY(-100%);
    height: 72rpx;
    line-height: 72rpx;
    text-align: center;
    background-color: #fc7e2c;
    color: #ffffff;
  }

  .right {
    flex: none;
    width: 362rpx;
    margin-left: 32rpx;
  }

  .left {
    flex: 1;
    font-size: 26rpx;
    color: var(--sub-color);
    line-height: 48rpx;

    .price-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .price1,
    .price2 {
      margin-left: 12rpx;
      font-size: 28rpx;
    }

    .price1 {
      font-weight: 600;
      color: var(--red-color);
    }

    .price2 {
      font-weight: 400;
      color: var(--sub-color);
    }
  }
}
</style>
