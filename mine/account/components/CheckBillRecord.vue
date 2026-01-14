<template>
  <my-drawer
    ref="drawer"
    title="对账记录查询"
    customScrollView
    @change="drawerChange"
  >
    <view class="scroll-wrapper">
      <scroll-view scroll-y class="scroll-view" @scrolltolower="getList(false)">
        <my-empty
          v-if="loading"
          img="/static/images/empty/loading.gif"
          text="查询中"
        />
        <my-empty
          v-else-if="list.length === 0"
          img="/static/images/empty/stat.png"
          text="暂无对账记录"
        />
        <view v-else class="record-list">
          <view
            class="record-item"
            v-for="record in list"
            :key="record.Id"
            @click="handleClick(record)"
          >
            <view class="record-inner">
              <view class="record-title">{{ record.ReconName }}</view>
              <view class="record-date">{{ record.DateRemark }}</view>
            </view>
          </view>
          <uv-load-more
            :status="!HasNextPage ? 'nomore' : loading ? 'loading' : 'loadmore'"
          />
        </view>
      </scroll-view>
    </view>
  </my-drawer>
</template>

<script setup>
import { ref, unref } from "vue";
import { ReconciliationList } from "@/api/index.js";

const props = defineProps({
  supplyId: {
    type: String,
    default: "",
  },
  cusId: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["change"]);

const list = ref([]);
const loading = ref(false);
// 分页相关
const lastCursor = ref("");
const HasNextPage = ref(true);
const pageSize = 10;

async function getList(refresh = false) {
  if (!refresh && !unref(HasNextPage)) return;
  if (unref(loading)) return;

  if (refresh) {
    list.value = [];
  }
  loading.value = true;
  try {
    const res = await ReconciliationList({
      lastCursor: refresh ? "" : unref(lastCursor),
      pageSize,
      cusId: props.cusId,
      supplyId: props.supplyId,
    });
    list.value = refresh ? res.list : [...list.value, ...res.list];
    HasNextPage.value = res.HasNextPage;
    lastCursor.value = res.NextCursor;
  } catch (err) {
    console.log("getList error:", err);
  } finally {
    loading.value = false;
  }
}

// 侧滑按钮
function handleClick(record) {
  console.log("handleClick:", record);

  uni.navigateTo({
    url: `/mine/account/recordDetail?cusId=${props.cusId}&supplyId=${
      props.supplyId
    }&reconId=${record.Id || ""}`,
    success(res) {
      res.eventChannel.emit("acceptDataFromOpenerPage", {
        data: record,
        supplyId: props.supplyId,
      });
    },
  });
}

async function drawerChange(e) {
  emits("change", e.show);
}

const drawer = ref();
function open() {
  unref(drawer).popup.open();
  getList(true);
}

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  height: 976rpx;
  .scroll-view {
    height: 100%;

    .record-list {
      padding: 0 24rpx;
      .record-item {
        margin-bottom: 20rpx;
        background-color: #fff;
        border-radius: 24rpx;
        overflow: hidden;
        .record-inner {
          padding: 28rpx;
          .record-title {
            font-size: 30rpx;
            color: var(--title-color);
            line-height: 42rpx;
            margin-bottom: 4rpx;
            font-weight: 500;
          }
          .record-date {
            font-family: misans400;
            font-size: 24rpx;
            color: var(--intr-color);
            line-height: 36rpx;
          }
        }
      }
    }
  }
}
</style>
