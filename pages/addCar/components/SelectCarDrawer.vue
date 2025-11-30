<template>
  <my-drawer ref="drawer" title="确认车辆" customScrollView>
    <view class="drawer-container">
      <view class="search-box">
        <my-search-box
          v-model="carno"
          placeholder="搜索车辆"
          :showBtn="false"
          @search="search"
          @clear="clear"
        />
      </view>
      <view class="scroll-view">
        <my-empty
          v-if="list.length === 0"
          :showImg="false"
          text="请先识别车辆"
        />
        <my-empty
          v-else-if="innerList.length === 0"
          :showImg="false"
          text="暂无搜索结果"
        />
        <scroll-view v-else scroll-y style="height: 100%">
          <view class="tag-list">
            <view
              class="tag-box"
              :class="{
                active: isSelected(item),
              }"
              v-for="item in innerList"
              :key="item.Carno"
              @click="clickTag(item)"
            >
              <view>{{ item.Carno }}</view>
              <uv-icon
                v-if="isSelected(item)"
                name="/static/images/ui/checkbox-active.png"
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
        v-if="selectedList.length === 0"
        text="请选择"
        disabled
        color="#C8D4DF"
        :custom-style="{ borderRadius: '8px', height: '48px' }"
        :customTextStyle="{ fontWeight: '500', color: '#fff' }"
      />
      <uv-button
        v-else
        :text="`确认所选的 ${selectedList.length} 车`"
        color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"
        @click="handleConfirm"
        :custom-style="{ borderRadius: '8px', height: '48px' }"
        :customTextStyle="{ fontWeight: '500' }"
      />
    </template>
  </my-drawer>
</template>

<script setup>
import { ref, unref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  list: {
    type: Array,
    default: () => [],
  },
});
const emits = defineEmits(["update:modelValue", "change"]);

const selectedList = ref([]);
watch(
  () => props.modelValue,
  (val) => {
    selectedList.value = [...val];
  },
  {
    immediate: true,
  }
);

const drawer = ref(null);
const carno = ref("");

function clickTag(item) {
  if (unref(selectedList).find((m) => m.Carno === item.Carno)) {
    selectedList.value = unref(selectedList).filter(
      (m) => m.Carno !== item.Carno
    );
  } else {
    selectedList.value.push({
      Carno: item.Carno,
    });
  }
}
function isSelected(item) {
  return unref(selectedList).find((m) => m.Carno === item.Carno);
}

function strIsEmpty(str) {
  return !str || str.trim().length === 0;
}
// 搜索列表
function searchList(searchStr) {
  // 如果搜索字符串为空，返回空数组
  if (strIsEmpty(searchStr)) {
    return [...props.list];
  }

  // 将搜索字符串转换为大写，以便不区分大小写匹配
  const searchUpper = searchStr.toUpperCase().trim();

  // 使用filter方法筛选匹配的车牌号
  const matchedPlates = props.list.filter((plate) => {
    // 将车牌号也转换为大写进行比较
    const plateUpper = plate.Carno.toUpperCase();

    // 检查搜索字符串是否是车牌号的一部分
    return plateUpper.includes(searchUpper);
  });

  return matchedPlates;
}

const searchTemp = ref(""); //搜索内容
const innerList = ref([]); //搜索结果
watch(
  () => props.list,
  (val) => {
    innerList.value = [...val];
  },
  {
    immediate: true,
  }
);
function search() {
  innerList.value = searchList(unref(carno));
  searchTemp.value = unref(carno);
}
function clear() {
  innerList.value = [...props.list];
  searchTemp.value = "";
}

function handleConfirm() {
  console.log("handleConfirm", unref(selectedList));

  emits("update:modelValue", unref(selectedList));
  emits("change", unref(selectedList));
  drawer.value.popup.close();
}

function open() {
  unref(drawer).popup.open();
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
    height: 900rpx;

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
      }
    }
  }
}
</style>
