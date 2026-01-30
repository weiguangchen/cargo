<template>
  <my-empty
    v-if="loading"
    img="/static/images/empty/loading.gif"
    text="查询中"
    height="100vh"
  />
  <my-empty
    v-else-if="list.length === 0"
    img="/static/images/empty/address1.png"
    text="您暂未与生产企业签约"
    height="100vh"
  />
  <view class="members-container" v-else>
    <view class="company-item" v-for="item in list" :key="item.cus.CusId">
      <view class="name">{{ item.cus.CusName }}</view>
      <view class="tags">
        <view class="tag">{{ item.cus.CusStaffList.length }}&nbsp;位成员</view>
      </view>
      <scroll-view class="scroll-view" scroll-x>
        <view
          class="member-item"
          v-for="staff in item.cus.CusStaffList"
          :key="staff.StaffId"
          @click="openMemberDrawer(staff, item)"
        >
          <view class="avatar">
            <uv-image
              v-if="staff.headicon === '0' || staff.headicon === null"
              src="/static/images/avatar/default.png"
              width="80rpx"
              height="80rpx"
            />
            <uv-image
              v-else-if="staff.headicon === '1'"
              src="/static/images/avatar/male.png"
              width="80rpx"
              height="80rpx"
            />
            <uv-image
              v-else-if="staff.headicon === '2'"
              src="/static/images/avatar/female.png"
              width="80rpx"
              height="80rpx"
            />
          </view>
          <view class="uv-line-1 username">{{ staff.StaffName }}</view>
        </view>
      </scroll-view>
      <view class="from"
        >来自与&nbsp;<text class="company-name">{{ item.SupplyName }}</text
        >&nbsp;的签约</view
      >
      <view>
        <uv-button
          v-if="item.cus.IsLeader === '0'"
          text="查看成员"
          color="var(--light-main)"
          :custom-style="{ height: '96rpx', borderRadius: '16rpx' }"
          :custom-text-style="{ fontWeight: 'bold', color: 'var(--dark-main)' }"
          @click="toMembers(item)"
        />
        <uv-button
          v-if="item.cus.IsLeader === '1'"
          text="管理成员"
          color="var(--dark-main)"
          :custom-style="{ height: '96rpx', borderRadius: '16rpx' }"
          :custom-text-style="{ fontWeight: 'bold' }"
          @click="toMembers(item)"
        />
      </view>
    </view>
    <uv-load-more status="nomore" />
  </view>

  <!-- 展示信息 -->
  <AddMemberDrawer ref="addMemberDrawer" />
</template>

<script setup>
import { ref, unref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { GetCusStaff } from "@/api/index";
import AddMemberDrawer from "./components/AddMemberDrawer.vue";

const loading = ref(false);
const list = ref([]);

async function getList() {
  loading.value = true;
  try {
    const res = await GetCusStaff();
    list.value = [];
    res.forEach((item) => {
      item.CusList.forEach((cus) => {
        list.value.push({
          ...item,
          cus,
        });
      });
    });
    console.log("list", list.value);
  } catch (err) {
    uni.showToast({ title: err.data, icon: "none" });
  } finally {
    loading.value = false;
  }
}

onLoad(() => {
  getList();
});

function toMembers(item) {
  uni.navigateTo({
    url: "/mine/members/membersList",
    success: function (res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit("acceptDataFromOpenerPage", {
        item,
        supplyId: item.SupplyId,
        cus: item.cus,
      });
    },
    events: {
      success: function () {
        getList();
      },
    },
  });
}

const addMemberDrawer = ref(null);
function openMemberDrawer(staff, item) {
  unref(addMemberDrawer).open({
    staff,
    cus: item.cus,
    supplyId: item.SupplyId,
    formMode: "read",
  });
}
</script>

<style lang="scss">
.members-container {
  padding: 24rpx;
  .company-item {
    background: #ffffff;
    border-radius: 24rpx;
    padding: 30rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    .name {
      padding: 0 12rpx;
      font-weight: 600;
      font-size: 34rpx;
      color: var(--title-color);
      line-height: 48rpx;
      margin-bottom: 16rpx;
    }
    .tags {
      margin-bottom: 24rpx;
      padding: 0 12rpx;
      .tag {
        font-family: misans500;
        display: inline-flex;
        align-items: center;
        width: fit-content;
        height: 48rpx;
        padding: 0 16rpx;
        border-radius: 8rpx;
        color: #fff;
        background-color: var(--main-color);
        font-size: 26rpx;
      }
    }
    .scroll-view {
      margin-bottom: 20rpx;
      white-space: nowrap;
      .member-item {
        &:not(:last-child) {
          margin-right: 20rpx;
        }
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 160rpx;
        height: 180rpx;
        background: var(--page-bg);
        border-radius: 12rpx;
        padding: 24rpx 24rpx 20rpx;

        .avatar {
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
          overflow: hidden;
        }
        .username {
          text-align: center;
          white-space: initial;
          width: 100%;
          flex: none;
          font-size: 26rpx;
          color: var(--title-color);
          line-height: 36rpx;
          font-weight: bold;
        }
      }
    }
    .from {
      padding: 0 12rpx;
      line-height: 40rpx;
      font-size: 24rpx;
      color: var(--intr-color);
      margin-bottom: 20rpx;
      .company-name {
        font-weight: bold;
        color: var(--sub-color);
      }
    }
  }
}
</style>
