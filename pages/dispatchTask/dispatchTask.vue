<template>
  <page-meta
    :page-style="`overflow:${disabledScroll ? 'hidden' : 'visible'}`"
  />
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
      <uv-icon
        name="/static/images/dispatchTask/clock.png"
        width="36rpx"
        height="36rpx"
        :custom-style="{ marginRight: '24rpx' }"
      />
      <view class="time-wrapper">
        <template v-if="showTimeSelect">
          <view
            class="start-time"
            hover-class="time--active"
            hover-start-time="0"
            hover-stay-time="200"
            @click="selectTime('start')"
          >
            <view class="time-box" v-if="startTime">
              <text class="time">{{ formatDateTime(startTime) }}</text
              >准入
              <view class="close-wrapper" @click.stop>
                <view
                  style="flex: 1; display: flex; align-items: center"
                  @click="clearTime('start')"
                >
                  <uv-icon
                    name="/static/images/dispatchTask/close.png"
                    width="32rpx"
                    height="32rpx"
                    :custom-style="{ marginLeft: '14rpx' }"
                  />
                </view>
              </view>
            </view>
            <view class="placeholder" v-else
              >选填车辆准入时间
              <uv-icon
                name="/static/images/arrow.png"
                width="24rpx"
                height="24rpx"
                :custom-style="{ marginLeft: '12rpx' }"
              />
            </view>
          </view>
          <uv-line
            direction="col"
            length="28rpx"
            color="#B0BECC"
            margin="0 24rpx"
          />
          <view
            class="end-time"
            hover-class="time--active"
            hover-start-time="0"
            hover-stay-time="200"
            @click="selectTime('end')"
          >
            <view class="time-box" v-if="endTime">
              <text class="time">{{ formatDateTime(endTime) }}</text
              >结束
              <view class="close-wrapper" @click.stop>
                <view
                  style="flex: 1; display: flex; align-items: center"
                  @click="clearTime('end')"
                >
                  <uv-icon
                    name="/static/images/dispatchTask/close.png"
                    width="32rpx"
                    height="32rpx"
                    :custom-style="{ marginLeft: '14rpx' }"
                  />
                </view>
              </view>
            </view>
            <view class="placeholder" v-else
              >选填结束派车时间
              <uv-icon
                name="/static/images/arrow.png"
                width="24rpx"
                height="24rpx"
                :custom-style="{ marginLeft: '12rpx' }"
              />
            </view>
          </view>
        </template>
        <view v-else class="valid-hour-wrapper">
          <view class="valid-hour"
            >派车<text class="hour">{{ model.validHour }}小时</text
            >后将自动结束</view
          >
          <view
            v-if="supplyIsOffline === '0'"
            class="customize"
            hover-class="time--active"
            @click="handleCustomizeTime"
          >
            自定时间
            <uv-icon
              name="/static/images/arrow.png"
              width="24rpx"
              height="24rpx"
              :custom-style="{ marginLeft: '12rpx' }"
            />
          </view>
        </view>
      </view>
    </view>
    <!-- 通知 -->
    <my-notice-bar
      v-if="supply && supply.OwnerAnnouncement"
      :text="supply.OwnerAnnouncement"
      @tap="handleNotice"
    />
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
            :loading="cargoLoading"
            @disabledClick="cargoDisabledClick"
            @change="cargoChange"
          />
        </view>
      </uv-form-item>
    </view>
    <view class="form-item-wrapper">
      <view class="my-border-bottom">
        <uv-form-item label="车辆类型限制" prop="CarType">
          <view style="display: flex; justify-content: flex-end">
            <SelectCarType v-model="model.CarType" />
          </view>
        </uv-form-item>
      </view>
      <uv-form-item label="车牌限制" prop="Carno">
        <view style="display: flex; justify-content: flex-end">
          <SelectCar ref="selectCarRef" v-model="model.Carno" />
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
              :supplyIsOffline="supplyIsOffline"
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

  <!-- 底部 -->
  <view class="page-footer">
    <view class="left">
      <view class="price-wrapper">
        <text>预估：</text>
        <view class="price price1" @click="handleEstimatePrice">
          <view class="price-box">
            <view
              v-if="['1', '2'].includes(supplyIsOffline)"
              style="float: left; margin-top: 4rpx"
              >-</view
            >
            <text v-else
              >¥
              {{
                Big(totalPrice).eq(0)
                  ? "0.00"
                  : formatNumberToThousand(totalPrice, 2)
              }}
            </text>
            <uv-icon
              v-if="supplyIsOffline === '0'"
              name="/static/images/dispatchTask/footer-arrow2.png"
              width="16rpx"
              height="32rpx"
              :customStyle="{
                marginLeft: '8rpx',
              }"
            />
          </view>
        </view>
      </view>
      <view class="price-wrapper">
        <text>可用：</text>
        <view class="price price2" @click="handleAccountLimit">
          <view class="price-box">
            <text
              v-if="['1', '2'].includes(supplyIsOffline)"
              style="float: left; margin-top: 4rpx"
              >-</text
            >
            <text v-else
              >¥
              {{
                Big(balancePrice).eq(0)
                  ? "0.00"
                  : formatNumberToThousand(balancePrice, 2)
              }}</text
            >
            <uv-icon
              v-if="supplyIsOffline === '0'"
              name="/static/images/dispatchTask/footer-arrow1.png"
              width="16rpx"
              height="32rpx"
              :customStyle="{
                marginLeft: '8rpx',
              }"
            />
          </view>
        </view>
      </view>
    </view>
    <view class="right">
      <uv-button
        :loading="submiting"
        text="确认派车"
        color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
        :customStyle="{ height: '96rpx', borderRadius: '16rpx' }"
        :custom-text-style="{ fontWeight: 'bold' }"
        @click="submit"
      />
    </view>
    <view
      class="warning"
      :style="{
        backgroundColor:
          tipType === FOOTER_TIP_TYPE.NOBALANCE
            ? 'var(--red-color)'
            : '#fc7e2c',
      }"
      v-if="tipContent"
      >{{ tipContent }}</view
    >
  </view>
  <!-- end -->

  <!-- 时间 -->
  <uv-datetime-picker
    ref="datetimePicker"
    v-model="timeValue"
    mode="datetime"
    confirmColor="var(--main-color)"
    :filter="filter"
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

  <!-- 派车结果 -->
  <ResultDrawer ref="resultDrawer" />

  <!-- 通知 -->
  <NoticeModal
    ref="noticeModal"
    :text="supply ? supply.OwnerAnnouncement : ''"
  />

  <!-- 账户限额 -->
  <AccountLimitDrawer ref="accountLimit" :owner="owner" />
  <!-- 预估价格 -->
  <EstimatePriceDrawer ref="estimatePrice" :order="order" />
</template>

<script setup>
import { ref, reactive, unref, getCurrentInstance, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import SelectCarType from "./components/SelectCarType.vue";
import SelectPlate from "./components/SelectPlate.vue";
import SelectCar from "./components/SelectCar/index.vue";
import SelectCargo from "./components/SelectCargo.vue";
import Remark from "./components/Remark.vue";
// import SelectOrder from "./components/SelectOrder.vue";
import Material from "./components/Material.vue";
import NoticeModal from "./components/NoticeModal.vue";
import AccountLimitDrawer from "./components/AccountLimitDrawer.vue";
import EstimatePriceDrawer from "./components/EstimatePriceDrawer.vue";
import dayjs from "dayjs";
import Big from "big.js";
import {
  GetOwnerBySupply,
  GetOwnerOrderList,
  SetAssignTicket,
} from "@/api/index.js";
import { getToken } from "@/utils/token.js";
import ResultDrawer from "./components/ResultDrawer.vue";
import { formatDateTime, formatNumberToThousand } from "@/utils";
const eventChannel = ref();
onLoad(() => {
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

      if (res.supply && res.supply.OwnerAnnouncement) {
        noticeModal.value.open();
      }
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
          if (supply.value && supply.value.OwnerAnnouncement) {
            noticeModal.value.open();
          }
          model.OwnerId = "";
          owner.value = null;
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
const timeValue = ref("");
const startTime = ref("");
const endTime = ref("");
const min = roundTimeToNextTenMinute().valueOf();
const max = roundTimeToNextTenMinute().add(1, "year").valueOf();
const minDate = ref();
const maxDate = ref();
const showTimeSelect = ref(true); // 是否显示时间选择器
function handleCustomizeTime() {
  showTimeSelect.value = true;
}
function filter(type, options) {
  if (type === "minute") {
    return options.filter((option) => option % 10 === 0);
  }
  return options;
}
function formatter(type, value) {
  if (type === "year") return `${value}年`;
  if (type === "month") return `${value}月`;
  if (type === "day") return `${value}日`;
  if (type === "hour") return `${value}时`;
  if (type === "minute") return `${value}分`;
  return value;
}
// 获取时间picker最小值，为了处理当前时间为51-59分时，显示的时间为下一个被10整除的整点
function roundTimeToNextTenMinute() {
  const dayjsObj = dayjs();
  const minute = dayjsObj.minute();

  if (minute === 0) {
    // 分钟为0，保持不变
    return dayjsObj;
  } else if (minute >= 1 && minute <= 49) {
    // 分钟在1-49之间，向上取整到10的倍数
    const roundedMinute = Math.ceil(minute / 10) * 10;
    return dayjsObj.minute(roundedMinute).second(0).millisecond(0);
  } else if (minute >= 51 && minute <= 59) {
    // 分钟在51-59之间，增加1小时，并将分钟、秒、毫秒归零（即下一个整点）
    return dayjsObj.add(1, "hour").startOf("hour");
  } else {
    // 其他情况（例如50分钟），保持不变
    return dayjsObj;
  }
}
function selectTime(type) {
  timeMode.value = type;
  if (type === "start") {
    minDate.value = min;
    maxDate.value = endTime.value
      ? dayjs(endTime.value).valueOf()
      : model.validHour
      ? roundTimeToNextTenMinute().add(model.validHour, "hour").valueOf()
      : max;
    timeValue.value = startTime.value ? dayjs(startTime.value).valueOf() : min;
  }
  if (type === "end") {
    minDate.value = startTime.value ? dayjs(startTime.value).valueOf() : min;
    maxDate.value = model.validHour
      ? roundTimeToNextTenMinute().add(model.validHour, "hour").valueOf()
      : max;
    timeValue.value = endTime.value ? dayjs(endTime.value).valueOf() : max;
  }
  datetimePicker.value.open();
}
function clearTime(type) {
  if (type === "start") startTime.value = "";
  if (type === "end") {
    if (model.validHour) {
      showTimeSelect.value = false; // 显示时间选择器
    } else {
      endTime.value = "";
    }
  }
}
function confirmTime({ value }) {
  console.log("value", value, dayjs(value).format("YYYY-MM-DD HH:mm"));
  if (timeMode.value === "start") startTime.value = value;
  if (timeMode.value === "end") endTime.value = value;
}

// 通知
const noticeModal = ref();
function handleNotice() {
  console.log("handleNotice");
  noticeModal.value.open();
}
// 表单
const model = reactive({
  OwnerId: "",
  CarType: [],
  Carno: [],
  Memo: "",
  validHour: "",
});
const owner = ref(); //当前所选的货主信息
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
const cargoLoading = ref(false);
const cargoOptions = ref([]);
const supplyIsOffline = ref("0"); //2：离线-不可派车，1：离线-可派车，0:正常
const supplyPromptContent = ref("");
const supplyPromptType = ref("0"); // 1 展示 0 不展示
async function getCargpOptions() {
  if (!supply.value.Id) {
    return;
  }

  try {
    cargoLoading.value = true;
    const res = await GetOwnerBySupply({
      supplyId: supply.value.Id,
      qType: 1,
    });
    cargoOptions.value =
      res?.list?.map((m) => ({
        value: m.Id,
        label: m.Ownername,
        ...m,
      })) ?? [];
    // 设置结束时间范围
    model.validHour = res?.validHour ?? "";
    showTimeSelect.value = !res.validHour;
    supplyIsOffline.value = res?.IsOffline ?? "0";
    supplyPromptType.value = res?.PromptType ?? "0";
    supplyPromptContent.value = res?.PromptContent ?? "";
    if (model.validHour) {
      endTime.value = roundTimeToNextTenMinute()
        .add(model.validHour, "hour")
        .valueOf();
    }

    if (res?.list?.length === 1) {
      model.OwnerId = res?.list?.[0]?.Id ?? "";
      owner.value = res?.list?.[0] ?? null;
      getOrder();
    }
  } finally {
    cargoLoading.value = false;
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
function cargoChange(val, item) {
  console.log("cargoCHange", val, item);
  order.value = null;
  orderList.value = [];
  const { value, label, ...rest } = item;
  owner.value = rest;
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
    IsOffline: supplyIsOffline.value,
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
// 选择车牌组件
const selectCarRef = ref();
function selectOrder(item) {
  order.value = item;
  orderDrawer.value.popup.close();
}

// 预估
const totalPrice = computed(() => {
  let price = Big(0).toFixed(2);
  if (
    !order.value ||
    !order.value.MaterialsList ||
    (order.value.MaterialsList && order.value.MaterialsList.length === 0)
  )
    return Big(0).toFixed(2);
  const total = order.value.MaterialsList.map((m) => {
    const { TaxPrice, Limittype, EstimiteWeight, EstimiteTimes } = m;
    const SingleWeight = order.value.SingleWeight;
    if (Limittype === "0") return 0;
    if (Limittype === "1") {
      return Big(EstimiteWeight || 0)
        .times(TaxPrice || 0)
        .toNumber();
    }
    if (Limittype === "2") {
      return Big(EstimiteTimes || 0)
        .times(SingleWeight || 0)
        .times(TaxPrice || 0)
        .toNumber();
    }
    return price;
  }).reduce((p, n) => Big(p).plus(n).toNumber(), 0);
  console.log("total", total, order.value.MaterialsList);
  return total;
});
// 可用
const balancePrice = computed(() => {
  let price = Big(0).toFixed(2);
  if (unref(owner)) {
    return unref(owner).Balance || 0;
  } else {
    return price;
  }
});
// 底部警告横幅
const FOOTER_TIP_TYPE = {
  NORMAL: "0", // 正常
  OFFLINE: "1", // 离线
  NOBALANCE: "2", // 余额不足
  WARNING: "3", // 警告
};
const tipType = ref(FOOTER_TIP_TYPE.NORMAL);
const tipContent = computed(() => {
  // 离线派车
  if (unref(supply) && supplyPromptType.value === "1") {
    tipType.value = FOOTER_TIP_TYPE.OFFLINE;
    return unref(supplyPromptContent);
  }

  if (unref(owner) && unref(order)) {
    // 判断用户是否已经选择了物料
    const existMat =
      unref(order)?.MaterialsList.some(
        (m) => m.Limittype === "1" || m.Limittype === "2"
      ) ?? false;

    // 「预估」小于「可用」时，可用额度不足
    if (existMat && Big(unref(totalPrice)).gt(unref(balancePrice))) {
      tipType.value = FOOTER_TIP_TYPE.NOBALANCE;
      return "可用额度不足，无法派车，请及时充值";
    }
    // 「预估」-「可用」小于「订单中的AlertBalance」
    console.log(
      "tipContent",
      Big(unref(totalPrice)).minus(unref(balancePrice)).toNumber()
    );
    if (
      existMat &&
      Big(unref(balancePrice))
        .minus(unref(totalPrice))
        .lt(unref(owner).AlertBalance)
    ) {
      tipType.value = FOOTER_TIP_TYPE.WARNING;
      return "可用额度较低，后续存在车辆无法装运风险，建议及时充值";
    }
  }

  tipType.value = FOOTER_TIP_TYPE.NORMAL;
  return "";
});

const accountLimit = ref(null);
function handleAccountLimit() {
  if (["1", "2"].includes(supplyIsOffline.value)) {
    return;
  }

  if (!model.OwnerId) {
    uni.showToast({
      title: "请先确定货主公司",
      icon: "none",
    });
    return;
  }
  accountLimit.value.open();
}
const estimatePrice = ref(null);
function handleEstimatePrice() {
  if (["1", "2"].includes(supplyIsOffline.value)) {
    return;
  }
  console.log("order", order.value);

  if (!unref(order)) {
    uni.showToast({
      title: "请选择订单",
      icon: "none",
    });
    return;
  }

  const noMaterial = unref(order)?.MaterialsList.every(
    (m) => m.Limittype === "0" || m.Limittype === "3"
  );
  if (unref(order)?.MaterialsList?.length === 0 || noMaterial) {
    uni.showToast({
      title: "请先选择派车物料",
      icon: "none",
    });
    return;
  }
  estimatePrice.value.open();
}

// 提交
const submiting = ref(false);
const resultDrawer = ref();
const disabledScroll = ref(false);
async function submit() {
  // console.log("order", order.value);
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
  // 如果用户没维护过车辆，则提示用户维护车辆
  if (unref(selectCarRef).carList.length === 0) {
    uni.showToast({
      title: "请添加派车车辆",
      icon: "none",
    });
    unref(selectCarRef).open();
    return;
  }

  const hasMaterial = order.value.MaterialsList.some((m) => {
    return ["1", "2", "3"].includes(m.Limittype);
  });
  if (!hasMaterial) {
    uni.showToast({
      title: "请选择物料",
      icon: "none",
    });
    return;
  }

  if (unref(tipType) === FOOTER_TIP_TYPE.NOBALANCE) {
    uni.showToast({
      title: "可用额度不足",
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
    Carno: model.Carno.map((m) => m.Id).join(","), // 限制车牌，多个‘,’分隔
    CarType: model.CarType.join(","),
    MatList: order.value.MaterialsList.map((m) => {
      const item = {
        Material: m.SSMaterialId,
        Materialname: m.SSMaterialName,
        Limittype: m.Limittype,
        LeftWeight: m.WeightLeft,
        EstimatePrice: m.TaxPrice,
        Unit: m.Unit,
        SSMaterialInternalName: m.SSMaterialInternalName,
      };
      if (m.Limittype === "1") item.EstimiteWeight = m.EstimiteWeight;
      if (m.Limittype === "2") item.EstimiteTimes = m.EstimiteTimes;
      return item;
    }),
    Memo: model.Memo,
    OwnerUserId: getToken()?.userInfo?.Id ?? "",
  };

  if (model.validHour) {
    // 当存在截止时间，并且用户选择了自定时间时
    if (unref(showTimeSelect)) {
      params.StartTime = startTime.value
        ? dayjs(startTime.value).format("YYYY-MM-DD HH:mm")
        : ""; //开始进厂时间
      params.EndTime = endTime.value
        ? dayjs(endTime.value).format("YYYY-MM-DD HH:mm")
        : ""; // 截止接单时间
    } else {
      params.StartTime = ""; //开始进厂时间
      params.EndTime = roundTimeToNextTenMinute()
        .add(model.validHour, "hour")
        .format("YYYY-MM-DD HH:mm"); // 截止接单时间
    }
  } else {
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
  // padding: 36rpx 24rpx 32rpx;
  margin-bottom: 20rpx;
  border: 4rpx solid #ffffff;

  .select-location {
    padding: 36rpx 0 32rpx;
    margin: 0 24rpx;

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
    background: #ffffff;
    position: relative;
    z-index: 100;
    display: flex;
    align-items: center;
    height: 112rpx;
    padding: 0 24rpx;
    border-radius: 0 0 24rpx 24rpx;
    overflow: hidden;

    .time-wrapper {
      flex: 1;
      display: flex;
      align-items: center;

      .valid-hour-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .valid-hour {
          font-weight: 400;
          font-size: 26rpx;
          color: #73838e;
          line-height: 48rpx;
          .hour {
            margin: 0 10rpx;
            font-weight: bold;
            color: var(--dark-main);
          }
        }
        .customize {
          display: flex;
          align-items: center;
          font-size: 26rpx;
          color: var(--intr-color);
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
          color: var(--intr-color);
          line-height: 48rpx;
        }

        .time-box {
          display: flex;
          align-items: center;
          .time {
            margin-right: 10rpx;
            font-weight: bold;
            color: var(--dark-main);
          }
          .close-wrapper {
            flex: 1;
            align-self: stretch;
            display: flex;
          }
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
    width: 338rpx;
    margin-left: 28rpx;
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

    .price {
      text-align: right;
      flex: 1;
      display: flex;
      justify-content: flex-end;
      margin-left: 12rpx;
      font-size: 28rpx;
      font-family: misans500;
      .price-box {
        display: flex;
        align-items: center;
      }
    }

    .price1 {
      color: var(--red-color);
    }

    .price2 {
      color: var(--sub-color);
    }
  }
}
</style>
