<template>
  <my-empty
    v-if="loading"
    img="/static/images/empty/loading.gif"
    text="加载中"
    height="100vh"
  />
  <my-empty
    v-else-if="list.length === 0"
    img="/static/images/empty/file.png"
    text="暂无文件"
    height="100vh"
  />
  <view class="pending-container" v-else>
    <view class="header">
      <text class="title">{{ title }}</text>
      <text class="date">{{ date }}</text>
    </view>
    <view class="pending-list">
      <view
        class="pending-item"
        v-for="item in list"
        :key="item.reportId"
        @click="handleClickItem(item)"
      >
        <uv-icon
          v-if="item.reportType === 'pdf'"
          name="/static/images/settlement/pdf.png"
          width="80rpx"
          height="80rpx"
        />
        <uv-icon
          v-else-if="item.reportType === 'doc' || item.reportType === 'docx'"
          name="/static/images/settlement/doc.png"
          width="80rpx"
          height="80rpx"
        />
        <uv-icon
          v-else-if="item.reportType === 'ppt' || item.reportType === 'pptx'"
          name="/static/images/settlement/ppt.png"
          width="80rpx"
          height="80rpx"
        />
        <uv-icon
          v-else-if="item.reportType === 'xls' || item.reportType === 'xlsx'"
          name="/static/images/settlement/xls.png"
          width="80rpx"
          height="80rpx"
        />
        <uv-icon
          v-else
          name="/static/images/settlement/other.png"
          width="80rpx"
          height="80rpx"
        />
        <view class="info">
          <view class="title uv-line-1">{{ item.reportName }}</view>
          <view class="content uv-line-1">{{ item.cusName }}</view>
        </view>
      </view>
    </view>
    <view class="total-num">
      -&nbsp;共&nbsp;<text class="num">{{ count }}</text
      >&nbsp;文件&nbsp;-
    </view>
  </view>

  <my-confirm ref="confirm" />
</template>

<script setup>
import { ref, unref, getCurrentInstance } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { GetDocListBySetId, DocConfirm } from "@/api/index.js";

const settleId = ref("");
const supplyId = ref("");

let eventChannel = null;
onLoad((options) => {
  settleId.value = options.settleId ?? "";
  supplyId.value = options.supplyId ?? "";
  getList();

  const instance = getCurrentInstance().proxy;
  eventChannel = instance.getOpenerEventChannel();
});

const loading = ref(true);
const list = ref([]);
const title = ref("");
const date = ref("");
const count = ref(0);
async function getList() {
  loading.value = true;
  try {
    const res = await GetDocListBySetId({
      settleId: settleId.value,
      supplyId: supplyId.value,
    });
    list.value = res.docList ?? [];
    title.value = res.setTrancheName ?? "";
    date.value = res.dataRange ?? "";
    count.value = res.docCount ?? 0;
  } catch (error) {
    console.error("获取待确认文件列表失败:", error);
  } finally {
    loading.value = false;
  }
}

const confirm = ref(null);
function handleClickItem(item) {
  console.log(item);
  let filePath = `${wx.env.USER_DATA_PATH}/${item.fileName}`;
  console.log("filePath", filePath);

  uni.showActionSheet({
    itemList: ["确认无误（加盖印鉴）", "预览", "下载"],
    success: function (res) {
      console.log(res, res.tapIndex);
      if (res.tapIndex === 0) {
        unref(confirm).confirm({
          title: "确认文件无误？",
          content:
            "确认文件内容无误后，系统将自动加盖电子印鉴，并同步至生产企业。",
          cancelText: "再想想",
          confirmText: "确认无误",
          confirmBgColor: "var(--main-color)",
          asyncClose: true,
          closeOnClickOverlay: false,
          async confirm() {
            try {
              const params = {
                supplyId: unref(supplyId),
                reportId: item.reportId,
              };
              console.log("params", params);
              await DocConfirm(params);
              eventChannel.emit("success");
              unref(confirm).close();
              await getList();
            } catch (err) {
              console.log("提交失败", err);
              uni.showToast({
                title: err.data,
                icon: "none",
              });
              unref(confirm).closeLoading();
            }
          },
        });
      } else if (res.tapIndex === 1) {
        console.log("预览");
        wx.downloadFile({
          url: item.reportUrl,
          filePath,
          success: function (res) {
            console.log("下载成功", res);
            if (res.statusCode === 200) {
              const filePath = res.filePath;
              console.log("预览文件filePath", filePath);
              wx.openDocument({
                filePath,
                success: function (res) {
                  console.log("打开文档成功", res);
                },
                fail: function (err) {
                  console.log("打开文档失败", err);
                },
              });
            }
          },
          fail: function (err) {
            console.log("下载失败", err);
          },
        });
      } else if (res.tapIndex === 2) {
        console.log("下载");
        wx.downloadFile({
          url: item.reportUrl,
          filePath,
          success: function (res) {
            console.log("下载成功", res);
            if (res.statusCode === 200) {
              const filePath = res.filePath;
              unref(confirm).confirm({
                title: "文件已下载",
                content:
                  "文件已下载至本地，可将文件分享给好友或发送至「文件传输助手」进行保存。",
                cancelText: "暂不保存",
                confirmText: "发送保存",
                confirmBgColor: "var(--main-color)",
                closeOnClickOverlay: false,
                async confirm() {
                  console.log("分享文件filePath", filePath);
                  wx.shareFileMessage({
                    filePath,
                    fail: console.error,
                  });
                },
              });
            }
          },
          fail: function (err) {
            console.log("下载失败", err);
          },
        });
      }
    },
  });
}
</script>

<style lang="scss">
.pending-container {
  padding-bottom: var(--safe-area-bottom);
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 32rpx;
    font-size: 26rpx;
    .title {
      font-weight: misans500;
      color: var(--content-color);
    }
    .date {
      color: var(--intr-color);
    }
  }

  .pending-list {
    padding: 0 28rpx;
    .pending-item {
      display: flex;
      padding: 32rpx;
      background: #ffffff;
      border-radius: 24rpx;
      &:not(:last-child) {
        margin-bottom: 20rpx;
      }
      .info {
        flex: 1;
        margin-left: 24rpx;
        .title {
          font-size: 30rpx;
          color: var(--title-color);
          font-weight: bold;
          margin-bottom: 4rpx;
          line-height: 42rpx;
        }
        .content {
          font-size: 24rpx;
          color: var(--sub-color);
          line-height: 34rpx;
        }
      }
    }
  }

  .total-num {
    padding: 28rpx 0;
    text-align: center;
    font-size: 26rpx;
    line-height: 1;
    color: var(--sub-color);
    .num {
      font-family: misans500;
      color: var(--dark-main);
    }
  }
}
</style>
