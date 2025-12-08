<template>
  <uv-tabs
    v-if="!model.Id"
    :current="current"
    :list="tabs"
    :scrollable="false"
    lineWidth="32rpx"
    lineHeight="8rpx"
    :itemStyle="{
      fontSize: '30rpx',
      height: '88rpx',
    }"
    :activeStyle="{
      color: 'var(--title-color)',
      fontWeight: '600',
    }"
    :inactiveStyle="{
      color: 'var(--sub-color)',
      fontWeight: '400',
    }"
    :customStyle="{
      backgroundColor: '#fff',
    }"
    lineColor="var(--main-color)"
    @change="tabChange"
  />
  <view class="container">
    <template v-if="current === 0">
      <view class="form-wrapper">
        <uv-form
          errorType="toast"
          :model="model"
          :rules="rules"
          ref="form"
          label-width="140rpx"
          :labelStyle="{
            fontSize: '28rpx',
            color: 'var(--content-color)',
          }"
        >
          <view class="my-border-bottom number">
            <uv-form-item labelPosition="top" label="车牌号码" prop="Carno">
              <CarNumber v-model="model.Carno" />
            </uv-form-item>
          </view>
          <uv-form-item label="所属标签" prop="labelList">
            <CarTag v-model="model.labelList" @change="carTagChange" />
          </uv-form-item>
        </uv-form>
      </view>
      <view class="button-group">
        <view class="left" v-if="model.Id">
          <uv-button
            text="删除车辆"
            color="#ffffff"
            :customStyle="{
              height: '96rpx',
              borderRadius: '16rpx',
            }"
            :customTextStyle="{
              fontWeight: '500',
              color: 'var(--red-color)',
            }"
            @click="handleDelete"
          />
        </view>
        <view class="right">
          <uv-button
            :text="model.Id ? '确认修改' : '确认添加'"
            :loading="loading"
            color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
            :customStyle="{
              height: '96rpx',
              borderRadius: '16rpx',
            }"
            :customTextStyle="{
              fontWeight: '500',
            }"
            @click="handleAdd"
          />
        </view>
      </view>
    </template>
    <template v-if="current === 1">
      <view class="identify-wrapper">
        <view class="identify">
          <view style="flex: 1">
            <uv-textarea
              v-model="identify"
              border="none"
              height="218rpx"
              maxlength="-1"
              :textStyle="{
                fontSize: '28rpx',
                color: 'var(--title-color)',
                lineHeight: '44rpx',
              }"
              :customStyle="{
                padding: '8rpx 8rpx 36rpx!important',
              }"
              :placeholderStyle="{
                color: 'var(--intr-color)',
              }"
              placeholder="粘贴带有车牌号的文本，自动进行识别和拆分"
            />
          </view>
          <view class="close" v-if="isShowClear" @click="handleClear">
            <uv-icon
              name="/static/images/ui/clear.png"
              width="60rpx"
              height="60rpx"
            />
          </view>
        </view>
        <view class="identify-button">
          <uv-button
            text="图片识别"
            color="var(--page-bg)"
            :customStyle="{
              height: '72rpx',
              borderRadius: '16rpx',
            }"
            :customTextStyle="{
              fontWeight: '500',
              fontSize: '26rpx',
              color: 'var(--content-color)',
            }"
            @click="handleImage"
          />
          <uv-button
            :text="identify ? '智能识别' : '粘贴并识别'"
            color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
            :customStyle="{
              height: '72rpx',
              borderRadius: '16rpx',
            }"
            :customTextStyle="{
              fontWeight: '500',
              fontSize: '26rpx',
              color: '#ffffff',
            }"
            @click="handleMatch"
          />
        </view>
      </view>
      <view class="form-wrapper">
        <uv-form
          errorType="toast"
          :model="model2"
          :rules="rules2"
          ref="form2"
          label-width="140rpx"
          :labelStyle="{
            fontSize: '28rpx',
            color: 'var(--content-color)',
          }"
        >
          <view class="my-border-bottom">
            <uv-form-item label="车辆" prop="carList">
              <CarList
                v-model="model2.carList"
                :list="matchList"
                ref="carListRef"
              />
            </uv-form-item>
          </view>
          <uv-form-item label="所属标签" prop="labelList">
            <CarTag v-model="model2.labelList" />
          </uv-form-item>
        </uv-form>
      </view>
      <uv-button
        text="确认添加"
        :loading="loading2"
        color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
        :customStyle="{
          height: '96rpx',
          borderRadius: '16rpx',
          marginTop: '40rpx',
        }"
        :customTextStyle="{
          fontWeight: '500',
        }"
        @click="handleBatchAdd"
      />
    </template>
  </view>

  <!-- 确认弹窗 -->
  <my-confirm ref="confirm" />
</template>

<script setup>
import {
  ref,
  unref,
  reactive,
  getCurrentInstance,
  computed,
  nextTick,
} from "vue";
import CarNumber from "./components/CarNumber.vue";
import CarTag from "./components/CarTag.vue";
import CarList from "./components/CarList.vue";
import {
  CreateOwnerUserCarno,
  DelteUserCarno,
  BatchOwnerUserCarno,
} from "@/api/index.js";
import { onLoad } from "@dcloudio/uni-app";
import { showToast } from "@/utils/index.js";

const confirm = ref();
let eventChannel = null;
onLoad(() => {
  console.log("onLoad");
  const instance = getCurrentInstance().proxy;
  eventChannel = instance.getOpenerEventChannel();

  // 修改车辆
  eventChannel.on("setData", (data) => {
    console.log("data", data);
    model.Id = data.Id || "";
    model.Carno = data.Carno || "";
    model.labelList = data.labelList || [];
    originModel.Id = data.Id || "";
    originModel.Carno = data.Carno || "";
    originModel.labelList = data.labelList || [];
    current.value = 0;
    uni.setNavigationBarTitle({
      title: "修改车辆",
    });
  });
});

const current = ref(0);
const tabs = ref([
  {
    name: "车牌号录入",
  },
  {
    name: "文本导入",
  },
]);
function tabChange({ index }) {
  console.log("tabChange", index);
  current.value = index;
}

// 车牌号录入
const form = ref(null);
const model = reactive({
  Id: "",
  Carno: "",
  labelList: [],
});
// 编辑时缓存原有数据
const originModel = reactive({
  Id: "",
  Carno: "",
  labelList: [],
});
const rules = ref({
  Carno: {
    // type: 'string',
    validator: (rule, value, callback) => {
      if (!value) return false;
      const arr = value.split("");
      const isOk1 = arr.slice(0, 7).every((m) => m !== " ");
      const isOk2 = arr.slice(0, 8).every((m) => m !== " ");
      return isOk1 || isOk2;
    },
    message: "请填写正确的车牌号",
  },
});
const loading = ref(false);
async function handleAdd() {
  try {
    await form.value.validate();
  } catch {
    return;
  }

  const params = {
    Id: model.Id,
    Carno: model.Carno.trim(),
    labelList: model.labelList,
  };
  console.log("params", params);

  // 当修改时，如果不选标签，弹窗提示
  if (
    model.Id &&
    model.labelList.length === 0 &&
    originModel.labelList.length !== 0
  ) {
    confirm.value.confirm({
      title: "移除车辆标签?",
      content: "您未选择标签，车辆的原有标签会被移除",
      cancelText: "再想想",
      confirmText: "确认移除",
      asyncClose: true,
      closeOnClickOverlay: false,
      async confirm() {
        try {
          await CreateOwnerUserCarno(params);
          confirm.value.close();
          await showToast("车辆修改成功");
          eventChannel.emit("success");
          uni.navigateBack();
        } catch (err) {
          uni.showToast({
            title: err.data,
            icon: "none",
          });
          confirm.value.closeLoading();
        }
      },
    });
    return;
  }

  try {
    loading.value = true;
    await CreateOwnerUserCarno(params);
    loading.value = false;
    await showToast(model.Id ? "车辆修改成功" : "车辆添加成功");
    eventChannel.emit("success");
    uni.navigateBack();
  } catch (err) {
    uni.showToast({
      title: err.data,
      icon: "none",
    });
    loading.value = false;
  }
}
function handleDelete() {
  if (unref(loading)) return;
  confirm.value.confirm({
    title: "确定删除车辆？",
    content: "相关的派车单和运单不会被影响",
    cancelText: "再想想",
    confirmText: "删除",
    asyncClose: true,
    closeOnClickOverlay: false,
    async confirm() {
      try {
        await DelteUserCarno({
          Id: model.Id,
        });
        confirm.value.close();
        await showToast("删除成功");
        eventChannel.emit("success");
        uni.navigateBack();
      } catch (err) {
        uni.showToast({
          title: err.data,
          icon: "none",
        });
        confirm.value.closeLoading();
      }
    },
  });
}
function carTagChange() {
  eventChannel.emit("success");
}

// 文本导入
const identify = ref("");
const form2 = ref(null);
const matchList = ref([]);
const loading2 = ref(false);
const model2 = reactive({
  carList: [],
  labelList: [],
});
const rules2 = ref({
  carList: {
    type: "array",
    required: true,
    message: "暂无可添加车辆",
  },
});

const carListRef = ref(null);
const isShowClear = computed(() => {
  return unref(identify) !== "";
});
function handleClear() {
  identify.value = "";
}

function handleImage() {
  uni.showToast({
    title: "暂未开放",
    icon: "none",
  });
}
async function handleMatch() {
  model2.carList = [];

  if (unref(identify)) {
    const list = matchText(unref(identify));
    matchList.value = list;
    await nextTick();
    if (list.length > 0) {
      unref(carListRef).open(list);
    }
    return;
  }

  const res = await wx.getClipboardData();
  if (!res.data) {
    uni.showToast({
      title: "暂无可粘贴内容",
      icon: "none",
    });
    return;
  }
  identify.value = strIsEmpty(res.data) ? "" : res.data;
  const list = matchText(res.data);
  matchList.value = list;
  await nextTick();
  if (list.length > 0) {
    unref(carListRef).open(list);
  }
}

function matchText(text) {
  const pattern =
    /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}([A-Z0-9挂学警港澳]{1})?/g;
  const matches = text.match(pattern);

  if (matches) {
    const uniquePlates = [
      ...new Set(matches.map((plate) => plate.toUpperCase())),
    ].map((m) => ({
      Carno: m,
    }));
    return uniquePlates;
  } else {
    uni.showToast({
      title: "未识别到车牌号",
      icon: "none",
    });
    return [];
  }
}

function strIsEmpty(str) {
  return !str || str.trim().length === 0;
}

async function handleBatchAdd() {
  try {
    await form2.value.validate();
  } catch {
    return;
  }

  const params = {
    oprType: "TextImport",
    carList: model2.carList,
    labelList: model2.labelList,
  };
  console.log("handleBatchAdd", params);
  try {
    loading2.value = true;
    const res = await BatchOwnerUserCarno(params);
    await showToast(res);
    eventChannel.emit("success");
    uni.navigateBack();
  } catch (err) {
    uni.showToast({
      title: err.data,
      icon: "none",
    });
  } finally {
    loading2.value = false;
  }
}
</script>

<style lang="scss">
.uv-tabs__wrapper__nav__line {
  bottom: 0 !important;
}

.container {
  padding: 24rpx;

  .form-wrapper {
    background-color: #fff;
    border-radius: 24rpx;
    padding: 0 24rpx;

    .uv-form-item__body {
      padding: 32rpx 0 !important;
    }
    .number {
      .uv-form-item__body {
        &__left {
          margin-bottom: 24rpx !important;
        }
      }
    }
  }

  .button-group {
    display: flex;
    margin-top: 40rpx;
    .left {
      flex: none;
      width: 262rpx;
      margin-right: 20rpx;
    }
    .right {
      flex: 1;
    }
  }

  .identify-wrapper {
    background-color: #fff;
    border-radius: 24rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;

    .identify {
      display: flex;

      .close {
        // width: 20px;
        // height: 20px;
        // border-radius: 100px;
        // background-color: #c6c7cb;
        align-self: flex-start;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .identify-button {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
