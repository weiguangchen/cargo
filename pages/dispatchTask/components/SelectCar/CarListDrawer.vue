<template>
  <my-drawer ref="drawer" title="确认派车车辆" customScrollView>
    <view class="drawer-container">
      <view class="search-box">
        <my-search-box
          v-model="carno"
          placeholder="搜索车辆"
          rightBtnText="快速选车"
          rightBtnIcon="/static/images/ui/quickSelectCar.png"
          rightBtnColor="var(--dark-main)"
          @search="search"
          @clear="clear"
          @rightClick="rightClick"
        />
      </view>
      <view class="scroll-view">
        <my-empty
          v-if="loading"
          img="/static/images/empty/loading.gif"
          text="查询中"
        />
        <my-empty
          v-else-if="list.length === 0 && searchTemp"
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
              v-for="item in list"
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
            <view class="tag-box add" @click="handleAdd"
              >添加车辆
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
      <view class="button-group">
        <view class="left">
          <uv-button
            text="重置为全部"
            color="#ffffff"
            :custom-style="{ borderRadius: '8px', height: '48px' }"
            :customTextStyle="{ fontWeight: '500', color: 'var(--sub-color)' }"
            @click="handleReset"
          />
        </view>
        <view class="right">
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
        </view>
      </view>
    </template>
  </my-drawer>

  <!-- 添加车辆 -->
  <AddCarDrawer ref="addCarDrawer" @success="addSuccess" />
  <!-- 快速选车 -->
  <SelectTagDrawer ref="selectTag" @success="tagSuccess" />
</template>

<script setup>
import { ref, unref, watch, onMounted } from "vue";
import { GetOwnerCarMgr } from "@/api/index.js";
import AddCarDrawer from "./AddCarDrawer.vue";
import SelectTagDrawer from "./SelectTagDrawer.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});
const emits = defineEmits(["update:modelValue", "change", "changeList"]);

const drawer = ref(null);

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

const carno = ref("");
const searchTemp = ref(""); //搜索内容
const list = ref([]);
const loading = ref(false);
async function getList() {
  try {
    loading.value = true;
    const res = await GetOwnerCarMgr({
      carno: unref(carno),
    });
    list.value = res || [];
    emits("changeList", unref(list));
  } catch {
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getList();
});

function clickTag(item) {
  if (unref(selectedList).find((m) => m.Id === item.Id)) {
    selectedList.value = unref(selectedList).filter((m) => m.Id !== item.Id);
  } else {
    selectedList.value.push({
      Carno: item.Carno,
      Id: item.Id,
    });
  }
}
function isSelected(item) {
  return unref(selectedList).find((m) => m.Id === item.Id);
}

const addCarDrawer = ref(null);
function handleAdd() {
  unref(addCarDrawer).open();
}

function strIsEmpty(str) {
  return !str || str.trim().length === 0;
}

function search() {
  getList();
  searchTemp.value = carno.value.trim();
}
function clear() {
  getList();
  searchTemp.value = "";
}

async function addSuccess(car) {
  searchTemp.value = "";
  carno.value = "";
  await getList();

  //   添加成功后，默认选中刚添加的车辆
  if (list.value.length > 0) {
    const addItem = unref(list).find((m) => m.Carno === car.Carno);
    if (addItem) {
      selectedList.value.push({
        Carno: addItem.Carno,
        Id: addItem.Id,
      });
    }
  }
}

async function tagSuccess(res) {
  console.log("tagSuccess", res);

  res.forEach((m) => {
    const find = unref(selectedList).find((n) => n.Id === m.Id);
    if (!find) {
      selectedList.value.push({
        Carno: m.Carno,
        Id: m.Id,
      });
    }
  });
}

// 快速选车
const selectTag = ref(null);
function rightClick() {
  unref(selectTag).open();
}

function handleReset() {
  searchTemp.value = "";
  carno.value = "";
  getList();
  emits("update:modelValue", []);
  emits("change", []);
  unref(drawer).popup.close();
}
function handleConfirm() {
  console.log("handleConfirm", unref(selectedList));

  emits("update:modelValue", unref(selectedList));
  emits("change", unref(selectedList));
  drawer.value.popup.close();
}

function open() {
  selectedList.value = [...props.modelValue];
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
        &.add {
          font-weight: 500;
          color: var(--dark-main);
        }
      }
    }
  }
}

.button-group {
  display: flex;
  justify-content: space-between;
  .left {
    width: 262rpx;
    flex: none;
    margin-right: 20rpx;
  }
  .right {
    flex: 1;
  }
}
</style>
