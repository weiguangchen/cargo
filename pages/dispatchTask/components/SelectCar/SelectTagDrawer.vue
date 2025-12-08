<template>
  <my-drawer ref="drawer" title="根据标签快速选择车辆" customScrollView>
    <view class="select-tag-drawer-container">
      <view class="search-box">
        <my-search-box
          v-model="carno"
          placeholder="搜索标签"
          :showBtn="false"
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
          v-else-if="list.length === 0 && searchTemp"
          :showImg="false"
          text="暂无搜索结果"
        />
        <my-empty
          v-else-if="list.length === 0"
          :showImg="false"
          text="暂无标签，可前往「我的」-「车辆管理」进行设置"
        />
        <scroll-view v-else scroll-y style="height: 100%">
          <view class="tag-list">
            <view
              class="tag-box"
              :class="{
                active: isSelected(item),
              }"
              v-for="item in list"
              :key="item.Id"
              @click="clickTag(item)"
            >
              <view>{{ item.LabelName }}</view>
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
        text="确认"
        color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"
        @click="handleConfirm"
        :custom-style="{ borderRadius: '8px', height: '48px' }"
        :customTextStyle="{ fontWeight: '500' }"
      />
    </template>
  </my-drawer>
</template>

<script setup>
import { ref, unref, onMounted } from "vue";
import { GetOwnerCarByLabel } from "@/api/index.js";

const emits = defineEmits(["success"]);

const drawer = ref(null);
const searchTemp = ref(""); //搜索内容
const carno = ref("");
const list = ref([]);
const loading = ref(false);
const selectedList = ref([]);

async function getList() {
  try {
    loading.value = true;
    const res = await GetOwnerCarByLabel({
      carno: unref(carno),
    });
    list.value = res || [];
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
      ...item,
    });
  }
}
function isSelected(item) {
  return unref(selectedList).find((m) => m.Id === item.Id);
}

function search() {
  getList();
  searchTemp.value = carno.value.trim();
}
function clear() {
  getList();
  searchTemp.value = "";
}

function handleConfirm() {
  const carList = [];
  unref(selectedList).forEach((m) => {
    m.carList.forEach((c) => {
      carList.push({
        Id: c.Id,
        Carno: c.Carno,
      });
    });
  });

  emits("success", carList);

  unref(drawer).popup.close();
}

function open() {
  selectedList.value = [];
  carno.value = "";
  searchTemp.value = "";
  getList();
  unref(drawer).popup.open();
}
defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.select-tag-drawer-container {
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
      }
    }
  }
}
</style>
