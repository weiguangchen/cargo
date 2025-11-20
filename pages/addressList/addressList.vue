<template>
  <view class="addresslist-page" v-if="list.length > 0">
    <view class="address-wrapper" v-for="item in list" :key="item.Id">
      <view class="content my-border-bottom">
        <view class="name">
          <view class="location">
            <uv-image
              src="/static/images/location.png"
              width="32rpx"
              height="32rpx"
              :duration="0"
            />
          </view>
          {{ item.Placename }}
        </view>
        <view class="address"
          >{{ item.City }}{{ item.Distinct }}{{ item.Address }}</view
        >
        <view class="person">
          <text class="user">{{ item.Nickname }}</text>
          <text class="phone">{{ item.Mobile }}</text>
        </view>
      </view>
      <view class="footer">
        <view class="btn" @click="remove(item)">
          <uv-image
            src="/static/images/remove.png"
            width="32rpx"
            height="32rpx"
            :custom-style="{ marginRight: '8rpx' }"
            :duration="0"
          />
          删除
        </view>
        <view class="btn" @click="edit(item)">
          <uv-image
            src="/static/images/edit.png"
            width="32rpx"
            height="32rpx"
            :custom-style="{ marginRight: '8rpx' }"
            :duration="0"
          />
          修改
        </view>
      </view>
    </view>
    <uv-load-more
      status="nomore"
      color="#B0BECC"
      :customStyle="{ marginTop: '14px' }"
    />
  </view>
  <my-empty
    v-else
    height="calc(100vh - 112rpx)"
    img="/static/images/empty/address2.png"
    text="暂无地址"
  />

  <view class="page-footer">
    <uv-button
      text="+ 添加卸货地址"
      :custom-style="{ height: '96rpx', borderRadius: '16rpx' }"
      color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
      @click="add"
    />
  </view>

  <my-confirm ref="confirm" />
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { sleep } from "@/utils/index.js";
import { onLoad, onUnload, onPullDownRefresh } from "@dcloudio/uni-app";
import { GetOwnerUnloadPlace, DeleteUnloadPlace } from "@/api/index.js";
onLoad(() => {
  getList();
});

const list = ref([]);
async function getList() {
  try {
    uni.showLoading();
    const res = await GetOwnerUnloadPlace({
      useStatus: 1,
    });
    list.value = res.filter((m) => m.EnabledMark === "1");
  } finally {
    uni.hideLoading();
  }
}
onPullDownRefresh(async () => {
  await getList();
  uni.stopPullDownRefresh();
});

const confirm = ref();
function remove(record) {
  confirm.value.confirm({
    title: "确定删除卸货地址？",
    content: "您的货单和运单记录不会被影响",
    // cancelText: '取消',
    confirmText: "删除",
    asyncClose: true,
    async confirm() {
      try {
        await DeleteUnloadPlace({
          unloadId: record.Id,
        });
        uni.showToast({
          title: "卸货地删除成功",
          icon: "none",
        });
        confirm.value.close();
        getList();
      } catch {
        confirm.value.closeLoading();
      }
    },
  });
}
function edit(record) {
  uni.navigateTo({
    url: `/pages/addAddress/addAddress?unloadId=${record.Id}`,
    events: {
      handleAddUnload: async () => {
        console.log("编辑成功");
        await sleep(500); // 等待页面刷新dat
        getList();
      },
    },
  });
}

function add() {
  uni.navigateTo({
    url: "/pages/addAddress/addAddress",
    events: {
      handleAddUnload: async () => {
        console.log("添加成功");
        await sleep(500); // 等待页面刷新dat
        getList();
      },
    },
  });
}
</script>

<style lang="scss">
.addresslist-page {
  padding: 24rpx 24rpx 112rpx;
}

.address-wrapper {
  padding: 0 24rpx;
  background: #ffffff;
  border-radius: 24rpx;
  margin-bottom: 20rpx;

  .content {
    padding: 32rpx 0;

    .name,
    .address,
    .person {
      padding-left: 44rpx;
    }

    .name {
      position: relative;
      display: flex;
      font-weight: 600;
      font-size: 32rpx;
      color: var(--title-color);
      line-height: 40rpx;
      margin-bottom: 16rpx;

      .location {
        position: absolute;
        top: 4rpx;
        left: 0;
      }
    }

    .address {
      font-weight: 400;
      font-size: 26rpx;
      color: var(--sub-color);
      line-height: 32rpx;
      margin-bottom: 16rpx;
    }

    .person {
      font-size: 26rpx;
      color: var(--title-color);
      line-height: 32rpx;

      .user {
        margin-right: 24rpx;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 32rpx 0;
    font-size: 28rpx;
    color: var(--content-color);
    line-height: 48rpx;

    .btn {
      display: flex;
      align-items: center;
      margin-left: 40rpx;
    }
  }
}
</style>
