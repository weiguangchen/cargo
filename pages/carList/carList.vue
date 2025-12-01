<template>
  <view class="scroll-wrapper" catchtouchmove="true">
    <view class="search-box">
      <my-search-box
        v-model="carno"
        placeholder="搜索车辆、标签"
        :rightBtnIcon="
          isEdit
            ? '/static/images/ui/checkmark.png'
            : '/static/images/ui/manage.png'
        "
        :rightBtnText="isEdit ? '完成' : '管理'"
        :rightBtnColor="isEdit ? 'var(--dark-main)' : 'var(--sub-color)'"
        @rightClick="handleManage"
        @search="search"
        @clear="clear"
      />
    </view>
    <view class="content-wrapper">
      <my-empty
        v-if="loading"
        img="/static/images/empty/loading.gif"
        text="查询中"
      />
      <my-empty
        v-else-if="list.length === 0 && searchTemp"
        img="/static/images/empty/car.png"
        text="暂无搜索结果"
      />
      <my-empty
        v-else-if="list.length === 0"
        img="/static/images/empty/car.png"
        text="暂无车辆"
      />
      <scroll-view v-else scroll-y class="scroll-view">
        <view class="scroll-content">
          <view class="car-list">
            <view
              class="car-item"
              :class="{
                'my-border-bottom': index < list.length - 1,
              }"
              v-for="(item, index) in list"
              @click="clickCar(item)"
            >
              <view class="checkbox" v-if="isEdit">
                <uv-icon
                  v-if="item.checked"
                  name="/static/images/ui/checkbox-active.png"
                  width="32rpx"
                  height="32rpx"
                />
                <uv-icon
                  v-else
                  name="/static/images/ui/checkbox.png"
                  width="32rpx"
                  height="32rpx"
                />
              </view>
              <view class="info">
                <view class="plate">{{ item.Carno }}</view>
                <view v-if="item.labelList.length === 0" class="tag no-tag"
                  >无标签</view
                >
                <view v-else class="tag uv-line-1">
                  <template v-for="(tag, tagIndex) in item.labelList">
                    {{ tag.LabelName }}
                    <text
                      class="line"
                      v-if="tagIndex < item.labelList.length - 1"
                      >丨</text
                    >
                  </template>
                </view>
              </view>
              <uv-icon
                v-if="!isEdit"
                name="/static/images/arrow.png"
                width="24rpx"
                height="24rpx"
              />
            </view>
          </view>
          <view v-if="searchTemp" class="total"
            >- 已绑定 <text class="num">{{ list.length }}</text> 辆车 -</view
          >
          <view v-else class="total"
            >- 搜索到 <text class="num">{{ list.length }}</text> 辆车 -</view
          >
        </view>
      </scroll-view>
    </view>
    <view class="footer">
      <template v-if="isEdit">
        <view class="checkall">
          <view style="display: flex; align-items: center" @click="checkAll">
            <uv-icon
              v-if="isCheckAll"
              name="/static/images/ui/checkbox-active.png"
              width="32rpx"
              height="32rpx"
              :customStyle="{
                marginRight: '16rpx',
              }"
            />
            <uv-icon
              v-else
              name="/static/images/ui/checkbox.png"
              width="32rpx"
              height="32rpx"
              :customStyle="{
                marginRight: '16rpx',
              }"
            />
            全选
          </view>
          <text class="line">丨</text>
          已选 <text class="num">{{ totalChecked }}</text> 车
        </view>
        <view class="button-group">
          <view class="left">
            <uv-button
              text="删除"
              color="#FFF0EE"
              :custom-style="{ height: '96rpx', borderRadius: '16rpx' }"
              :customTextStyle="{
                fontWeight: '500',
                color: 'var(--red-color)',
              }"
              @click="handleDelete"
            />
          </view>
          <view class="right">
            <uv-button
              text="设置标签"
              color="#E7F9E9"
              :custom-style="{ height: '96rpx', borderRadius: '16rpx' }"
              :customTextStyle="{
                fontWeight: '500',
                color: 'var(--dark-main)',
              }"
              @click="handleSetTag"
            />
          </view>
        </view>
      </template>
      <view v-else>
        <uv-button
          text="+ 添加车辆"
          color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
          :custom-style="{ height: '96rpx', borderRadius: '16rpx' }"
          :customTextStyle="{ fontSize: '28rpx', fontWeight: '500' }"
          @click="addCar"
        />
      </view>
    </view>
  </view>

  <!-- 确认弹窗 -->
  <my-confirm ref="confirm" />
  <!-- 选择标签 -->
  <SelectCarTag
    ref="selectCarTag"
    v-model="selectedCarTagList"
    :carList="carList"
    @change="tagChange"
    batch
  />
</template>

<script setup>
import { ref, unref, reactive, computed } from "vue";
import { GetOwnerCarMgr, DelteUserCarno } from "@/api/index.js";
import { onLoad } from "@dcloudio/uni-app";
import { showToast } from "@/utils/index.js";
import SelectCarTag from "@/pages/addCar/components/SelectCarTag.vue";

const confirm = ref();
const carno = ref("");
const list = ref([]);
const loading = ref(false);
const searchTemp = ref(""); //搜索内容
const isEdit = ref(false);
async function getList() {
  try {
    loading.value = true;
    searchTemp.value = unref(carno);
    const res = await GetOwnerCarMgr({
      carno: unref(carno),
    });
    console.log("res", res);
    list.value = res.map((m) => ({
      ...m,
      checked: false,
    }));
  } finally {
    loading.value = false;
  }
}

onLoad(() => {
  getList();
});

function clickCar(car) {
  if (!unref(isEdit)) {
    uni.navigateTo({
      url: "/pages/addCar/addCar",
      success(res) {
        res.eventChannel.emit("setData", car);
      },
      events: {
        // 监听addCar页面返回的事件
        success: () => {
          carno.value = "";
          getList();
        },
      },
    });
    return;
  } else {
    car.checked = !car.checked;
  }
}
const totalChecked = computed(() => {
  return unref(list).filter((m) => m.checked).length;
});
// 是否已经全选
const isCheckAll = computed(() => {
  if (unref(list).length === 0) return false;
  return unref(list).every((m) => m.checked);
});
function checkAll() {
  if (unref(list).length === 0) {
    uni.showToast({
      title: "请选择车辆",
      icon: "none",
    });
    return;
  }
  list.value = unref(list).map((m) => ({
    ...m,
    checked: true,
  }));
}

// 批量删除
function handleDelete() {
  if (unref(list).filter((m) => m.checked).length === 0) {
    uni.showToast({
      title: "请选择车辆",
      icon: "none",
    });
    return;
  }
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
          Id: unref(list)
            .filter((m) => m.checked)
            .map((m) => m.Id)
            .join(","),
        });
        confirm.value.close();
        showToast("删除成功");
        getList();
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
// 批量设置标签
const selectCarTag = ref();
const carList = ref();
const selectedCarTagList = ref([]);
function handleSetTag() {
  if (unref(list).filter((m) => m.checked).length === 0) {
    uni.showToast({
      title: "请选择车辆",
      icon: "none",
    });
    return;
  }
  selectedCarTagList.value = [];
  carList.value = unref(list)
    .filter((m) => m.checked)
    .map((m) => ({
      Id: m.Id,
      Carno: m.Carno,
      labelList: m.labelList,
    }));
  selectCarTag.value.open();
}
function tagChange() {
  getList();
}

function addCar() {
  uni.navigateTo({
    url: "/pages/addCar/addCar",
    events: {
      // 监听addCar页面返回的事件
      success: () => {
        carno.value = "";
        getList();
      },
    },
  });
}

function handleManage() {
  if (unref(isEdit)) {
    list.value = unref(list).map((m) => ({
      ...m,
      checked: false,
    }));
  }

  isEdit.value = !isEdit.value;
}

function search() {
  getList();
}
function clear() {
  getList();
}
</script>

<style lang="scss">
.scroll-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .search-box {
    flex: none;
    padding: 20rpx 24rpx;
  }

  .content-wrapper {
    display: flex;
    flex: 1;
    min-height: 0;
    .scroll-view {
      height: 100%;
      .scroll-content {
        padding: 0 24rpx 24rpx;

        .car-list {
          background-color: #fff;
          border-radius: 24rpx;
          padding: 0 24rpx;
        }
        .car-item {
          display: flex;
          align-items: center;
          padding: 0 4rpx;

          .checkbox {
            margin-right: 28rpx;
          }
          .info {
            flex: 1;
            padding: 28rpx 22rpx 32rpx 0;
            .plate {
              // font-weight: 600;
              font-family: misans500;
              font-size: 34rpx;
              color: var(--title-color);
              margin-bottom: 4rpx;
              line-height: 48rpx;
            }
            .tag {
              font-weight: 400;
              font-size: 26rpx;
              color: var(--content-color);
              line-height: 36rpx;
              .line {
                color: var(--divider);
              }
              &.no-tag {
                color: var(--intr-color);
              }
            }
          }
        }
        .total {
          text-align: center;
          font-family: misans400;
          margin-top: 28rpx;
          font-size: 26rpx;
          color: #73838e;
          line-height: 26rpx;
          .num {
            color: var(--dark-main);
            margin: 0 6rpx;
          }
        }
      }
    }
  }
  .footer {
    background-color: #fff;
    padding: 16rpx 24rpx max(var(--safe-area-inset-bottom), var(--safe-bottom));

    .checkall {
      padding: 2rpx 0 0 8rpx;
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: 26rpx;
      color: var(--content-color);
      margin-bottom: 34rpx;
      .line {
        margin: 0 14rpx;
        color: var(--divider);
      }
      .num {
        margin: 0 10rpx;
        font-family: misans500;
      }
    }

    .button-group {
      display: flex;
      .left {
        flex: none;
        width: 262rpx;
        margin-right: 20rpx;
      }
      .right {
        flex: 1;
      }
    }
  }
}
</style>
