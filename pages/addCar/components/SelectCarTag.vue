<template>
  <my-drawer ref="drawer" title="设置车辆标签" customScrollView>
    <view class="drawer-container">
      <view class="search-box">
        <my-search-box
          v-model="labelName"
          placeholder="搜索标签"
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
      <view class="scroll-view">
        <my-empty
          v-if="loading"
          img="/static/images/empty/loading.gif"
          text="查询中"
        />
        <my-empty
          v-else-if="list.length === 0 && emptyType === '2'"
          :showImg="false"
          text="暂无搜索结果"
        />
        <scroll-view v-else scroll-y style="height: 100%">
          <view class="tag-list">
            <view
              class="tag-box"
              :class="{
                active: isSelected(item) && !isEdit,
              }"
              v-for="item in list"
              :key="item.Id"
              @click="clickTag(item)"
            >
              <view>{{ item.LabelName }}</view>
              <uv-icon
                v-if="isEdit"
                name="/static/images/ui/edit.png"
                width="32rpx"
                height="32rpx"
              />
              <uv-icon
                v-if="isSelected(item) && !isEdit"
                name="/static/images/ui/checkbox-active.png"
                width="32rpx"
                height="32rpx"
              />
            </view>
            <view class="tag-box add" @click="handleAdd"
              >添加标签
              <uv-icon
                name="/static/images/ui/plus.png"
                width="32rpx"
                height="32rpx"
              />
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <template #footer>
      <uv-button
        v-if="isEdit"
        text="点击标签进行修改"
        disabled
        color="#E3E9EF"
        :custom-style="{ borderRadius: '8px', height: '48px' }"
        :customTextStyle="{ fontWeight: '500', color: 'var(--sub-color)' }"
      />
      <uv-button
        v-else-if="list.length === 0"
        text="请选择"
        disabled
        color="#C8D4DF"
        :custom-style="{ borderRadius: '8px', height: '48px' }"
        :customTextStyle="{ fontWeight: '500', color: '#fff' }"
      />
      <uv-button
        v-else
        text="确认"
        color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"
        @click="handleConfirm"
        :custom-style="{ borderRadius: '8px', height: '48px' }"
        :customTextStyle="{ fontWeight: '500' }"
      />
    </template>
  </my-drawer>

  <!-- 添加标签 -->
  <AddCarTag ref="addCar" @success="tagSuccess" @delete="tagDelete" />
  <!-- 确认弹窗 -->
  <my-confirm ref="confirm" />
</template>

<script setup>
import { ref, unref, watch } from "vue";
import { GetOwnerLabel, BatchOwnerUserCarno } from "@/api/index.js";
import AddCarTag from "./AddCarTag.vue";
import { showToast } from "@/utils/index.js";

const emits = defineEmits(["update:modelValue", "change"]);
const props = defineProps({
  modelValue: {
    default: () => [],
    type: Array,
  },
  // 批量设置标签
  carList: {
    type: Array,
    default: () => [],
  },
});

const selectedList = ref([]);
watch(
  () => props.modelValue,
  () => {
    selectedList.value = [...props.modelValue];
  },
  {
    immediate: true,
  }
);

const confirm = ref(null);
const drawer = ref(null);

const list = ref([]);
const loading = ref(false); //加载中
const emptyType = ref(); //1没有搜索条件2有搜索条件
const isEdit = ref(false); //是否管理
async function getList() {
  try {
    loading.value = true;
    const res = await GetOwnerLabel({
      labelName: unref(labelName),
    });
    list.value = res;
    emptyType.value = res.length > 0 ? "" : unref(labelName) ? "2" : "1";
  } finally {
    loading.value = false;
  }
}

// 添加标签
const addCar = ref(null);
function handleAdd() {
  addCar.value.open();
}

function clickTag(item) {
  if (unref(isEdit)) {
    addCar.value.open({
      Id: item.Id,
      LabelName: item.LabelName,
    });
    return;
  }
  if (unref(selectedList).find((m) => m.Id === item.Id)) {
    selectedList.value = unref(selectedList).filter((m) => m.Id !== item.Id);
  } else {
    selectedList.value.push({
      Id: item.Id,
      LabelName: item.LabelName,
    });
  }
}
function isSelected(item) {
  return unref(selectedList).find((m) => m.Id === item.Id);
}

// 添加标签成功
async function tagSuccess(data) {
  await getList();
  // 处理标签被修改的情况
  unref(selectedList).forEach((item) => {
    if (item.Id === data.Id) {
      item.LabelName = data.LabelName;
    }
  });

  emits("update:modelValue", unref(selectedList));
  emits("change", unref(selectedList));
}
async function tagDelete(data) {
  await getList();
  // 处理标签被删除的情况
  selectedList.value = unref(selectedList).filter((item) => {
    return item.Id !== data.Id;
  });
  // 如果删除后没有标签了，则取消管理模式
  if (unref(selectedList).length === 0) {
    isEdit.value = false;
  }

  emits("update:modelValue", unref(selectedList));
  emits("change", unref(selectedList));
}

// 搜索框
const labelName = ref("");
function handleManage() {
  isEdit.value = !isEdit.value;
}
function search() {
  getList();
}
function clear() {
  getList();
}

function handleConfirm() {
  console.log("handleConfirm", unref(selectedList));

  if (props.carList.length > 0) {
    confirm.value.confirm({
      title: "确认标签设置类型",
      content: "车辆的原有标签如何处理?",
      cancelText: "清除并替换",
      cancelColor: "var(--red-color)",
      cancelBgColor: "#FFF0EE",
      confirmText: "保留并新增",
      confirmColor: "var(--dark-main)",
      confirmBgColor: "#E7F9E9",
      asyncClose: true,
      useCancelLoading: true,
      closeOnClickOverlay: false,
      closeable: true,
      async cancel() {
        const params = {
          oprType: "SetLabel",
          setType: "ClearReplace",
          carList: props.carList,
          labelList: unref(selectedList),
        };
        console.log("params", params);
        try {
          await BatchOwnerUserCarno(params);
          showToast("设置成功");
          confirm.value.close();
          drawer.value.popup.close();
          emits("change", unref(selectedList));
        } catch {
          confirm.value.closeLoading();
        }
      },
      async confirm() {
        const params = {
          oprType: "SetLabel",
          setType: "KeepAdd",
          carList: props.carList,
          labelList: unref(selectedList),
        };
        console.log("params", params);
        try {
          await BatchOwnerUserCarno(params);
          showToast("设置成功");
          confirm.value.close();
          drawer.value.popup.close();
          emits("change", unref(selectedList));
        } catch {
          confirm.value.closeLoading();
        }
      },
    });
  } else {
    emits("update:modelValue", unref(selectedList));
    emits("change", unref(selectedList));
    drawer.value.popup.close();
  }
}

// 暴露方法
function open() {
  getList();
  drawer.value.popup.open();
}
defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.drawer-container {
  .search-box {
    padding: 0 24rpx 20rpx;
  }
  .scroll-view {
    height: 648rpx;

    .tag-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 0 24rpx;
      justify-content: space-between;
      .tag-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(50% - 10rpx);
        background-color: #fff;
        padding: 0 32rpx;
        height: 112rpx;
        font-size: 28rpx;
        color: var(--sub-color);
        border-radius: 8rpx;
        margin-bottom: 16rpx;
        &.active {
          font-weight: 600;
          color: var(--title-color);
        }

        &.add {
          font-weight: 500;
          color: var(--dark-main);
        }
      }
    }
  }
}
</style>
